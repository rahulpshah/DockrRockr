
var express = require('express');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"))

var getRepoList = function(username){
    var data = {}
    var deferred = Promise.defer();
    var options = 
    {
        url: urlRoot + "/users/" + username + "/repos",
        method: 'GET',
        headers: {
            "User-Agent": "ListRepo",
            "content-type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    };
    request(options).then(function(data){
        deferred.resolve(data);
    });
    return deferred.promise;
}

var getStars = function(user, repo){
    var deferred = Promise.defer();
    var data = {}
    var options = 
    {
        url: urlRoot + "/repos/" + user + "/" + repo,
        method: 'GET',
        headers: {
            "User-Agent": "Stargazers",
            "content-type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    };
    request(options).then(function(data){
        var obj = JSON.parse(data.body);
        deferred.resolve(obj.stargazers_count);
    });
    return deferred.promise;
}
var hIndex = function(stars){
    var sorted = stars.sort(function(a, b) {return (b - a);});
    var max = 0
    for(var i = 1; i <= sorted.length; i++)
    {
        max = Math.max(max, Math.min(sorted[i-1], i));
    }
    return max;
}

var fs = require("fs");
var obj = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var token = "token " + obj["tokens"][1]["token"];
var urlRoot = obj["tokens"][1]["url_root"];
var querystring = require('querystring');
var url = require('url');
var app = express();
app.get('/', function (req, res) {
    var query = querystring.parse(url.parse(req.url).query || "");
    var username = query.username;
    getRepoList(username).then(function(data){
        var lst = [];
        var obj = JSON.parse(data.body);
        for( var i = 0; i < obj.length; i++ )
        {
            var name = obj[i].name;
            lst.push(getStars(username, name))
        }
        Promise.all(lst).then(function(stars) 
        {
            var h = hIndex(stars);
            var json = {hindex: h};
            res.end(JSON.stringify(JSON.stringify(json)));
        });
    });
});
var server = app.listen(8081, function () {
    var host = "127.0.0.1";
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

