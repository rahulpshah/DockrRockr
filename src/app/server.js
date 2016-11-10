'use strict'
var express = require("express");
var app = express();
var path = require('path');
var querystring = require('querystring');
var url = require('url');
const redis = require('redis');
const client = redis.createClient();
var bodyParser = require('body-parser');
//TODO: replace filename to Bot
var Bot = require("../../bot.js");
const bot = new Bot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});
class Serve {

  constructor() {
    app.use("/", express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
        extended: true
        }));

    app.get('/build', function(req, res){
      var query = querystring.parse(url.parse(req.url).query || "");
      var status = query.status;
      console.log(status);
      if(status == "pass")
      {
        bot.send("Docker Build Passed", bot.slack.dataStore.getChannelByName("testing"));
      }
      else
      {
        bot.send("Docker Build Failed", bot.slack.dataStore.getChannelByName("testing"));
      }
    });
    app.get('/',function(req,res) {
      res.render('index.html');
    });

    app.post('/', function(req, res){
        var obj = {}
        obj = req.body;
        console.log("Form data");
        console.log(obj.uid);
        client.set(obj.uid,`{${obj.maintainer},${obj.app},${obj.gitUsername},${obj.repo},${obj.gitToken},${obj.awsToken},${obj.awsIP},${obj.awsUsername},${obj.awsPassword},${obj.dhToken}, ${obj.framework}, ${obj.db}, ${obj.port}}`);

      //TODO: replace this by mock json file - FIXED 11/9
        var jsondata = {
          maintainer: obj.maintainer,
          app: obj.app,
          gitUsername: obj.gitUsername,
          repo: obj.repo,
          gitToken: obj.gitToken,
          awsToken: obj.awsToken,
          awsIP: obj.awsIP,
          awsUsername: obj.awsUsername,
          awsPassword: obj.awsPassword,
          dhtoken: obj.dhToken,
          framework: obj.framework,
          db: obj.db,
          port: obj.port ,
          channel: bot.slack.dataStore.getChannelByName("testing"),

        }
        // console.log(jsondata);
        bot.createDockerFile(jsondata);
        res.end("Your request for new docker file is being processed. Bot will respond with the file soon.")
    });
    var server = app.listen(8081, function(){
            var host = 'localhost';
            var port = server.address().port;
            console.log("Listening on http://" + host + ":" + port);
       });
  }
}
module.exports = Serve;
