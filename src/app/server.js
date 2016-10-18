'use strict'
var express = require("express");
var app = express();
var path = require('path');
var querystring = require('querystring');
var url = require('url');
var bodyParser = require('body-parser');
//TODO: replace filename to Bot
var bot = require("../../bot.js");

const bot1 = new bot({
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

    app.get('/',function(req,res) {
      res.render('index.html');
    });

    app.post('/', function(req, res){
        var obj = {}
        obj = req.body;
        console.log(obj); 
        
        bot1.slack.sendMessage('message', 'C2PSNF0D6');
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