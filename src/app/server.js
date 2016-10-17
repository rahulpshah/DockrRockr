var express = require("express");
var app = express();
var path = require('path');
var querystring = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
var bot = require("../../bot.js")
app.use("/", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());       
    app.use(bodyParser.urlencoded({
    extended: true
    })); 
app.get('/',function(req,res)
{

    res.render('index.html');
});

app.post('/', function(req, res){
    var obj = {}
    obj = req.body;
    console.log(obj);


    res.end("Your request for new docker file is being processed. Bot will respond with the file soon.")
});
var server = app.listen(8081, function(){
        var host = 'localhost';
        var port = server.address().port;
        console.log("Listening on http://" + host + ":" + port);
   });

