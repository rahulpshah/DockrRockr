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


class Serve {

  constructor() 
  {
    var self = this;
    self.bot = new Bot({
      token: process.env.SLACK_TOKEN,
      autoReconnect: true,
      autoMark: true
    });
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
        self.bot.send("Docker Build Passed", self.bot.slack.dataStore.getChannelByName("general"));
      }
      else
      {
        self.bot.send("Docker Build Failed", self.bot.slack.dataStore.getChannelByName("general"));
      }
    });
    app.use("/track", express.static(path.join(__dirname, 'public')));
    app.get('/track/',function(req,res) {
      res.render('index1.html');

    });

    app.post('/track/', function(req, res){
        var obj = {}
        obj = req.body;
        console.log(obj.gitUsername.concat('/',obj.repo));

        var key = obj.gitUsername.concat('/',obj.repo);

        client.exists(key, function(err, reply) {
          if (reply === 1) {
            res.end(key + "is already being tracked!");
          } else {
            console.log('doesn\'t exist');
            //client.set(obj.gitUsername.concat('/',obj.repo),`{${obj.app},${obj.gitUsername},${obj.repo},${obj.gitToken},${obj.awsToken},${obj.awsIP},${obj.awsUsername},${obj.awsPassword}, ${obj.framework}, ${obj.db}, ${obj.port}}`);
        
            client.rpush([key,obj.gitUsername,obj.repo,obj.gitToken,obj.awsIP,obj.awsUsername,obj.awsPassword,obj.framework, obj.db, obj.port],function(err,reply){
                console.log('pushed to redis');
            });
    
        var json1 = {
          //maintainer: obj.maintainer,
          app: obj.app,
          gitUsername: obj.gitUsername,
          repo: obj.repo,
          gitToken: obj.gitToken,
          awsIP: obj.awsIP,
          awsUsername: obj.awsUsername,
          awsPassword: obj.awsPassword,
          //dhtoken: obj.dhToken,
          framework: obj.framework,
          db: obj.db,
          port: obj.port ,
          channel: self.bot.slack.dataStore.getChannelByName("general"),

        }
        // console.log(jsondata);
        self.bot.createGitHook(json1.gitUsername, json1.repo, json1.gitToken,function(err, res) {
            self.send('Git Hook Created for ' + json1.repo, json1.channel);
        });
          res.end("Your request is being processed. We'll ping you on slack when it is done!");
        
          }
        }); // checking if client

    });    
    app.get('/',function(req,res) {
      res.render('index.html');
    });

    app.post('/', function(req, res){
        var obj = {}
        obj = req.body;
        console.log(obj.gitUsername.concat('/',obj.repo));

        var key = obj.gitUsername.concat('/',obj.repo);

        client.exists(key, function(err, reply) {
          if (reply === 1) {
            res.end('Docker file alredy exists for repo '+key);
          } else {
            console.log('doesn\'t exist');
            //client.set(obj.gitUsername.concat('/',obj.repo),`{${obj.app},${obj.gitUsername},${obj.repo},${obj.gitToken},${obj.awsToken},${obj.awsIP},${obj.awsUsername},${obj.awsPassword}, ${obj.framework}, ${obj.db}, ${obj.port}}`);
        
            client.rpush([key,obj.gitUsername,obj.repo,obj.gitToken,obj.awsIP,obj.awsUsername,obj.awsPassword,obj.framework, obj.db, obj.port],function(err,reply){
                console.log('pushed to redis');
            });
    
        var jsondata = {
          //maintainer: obj.maintainer,
          app: obj.app,
          gitUsername: obj.gitUsername,
          repo: obj.repo,
          gitToken: obj.gitToken,
          awsIP: obj.awsIP,
          awsUsername: obj.awsUsername,
          awsPassword: obj.awsPassword,
          //dhtoken: obj.dhToken,
          framework: obj.framework,
          db: obj.db,
          port: obj.port ,
          channel: self.bot.slack.dataStore.getChannelByName("general"),

        }
        // console.log(jsondata);
        self.bot.createDockerFile(jsondata);
        res.end("Your request for new docker file is being processed. Bot will respond with the file soon.")

        }
        }); // checking if client

    });

    app.post('/gitHook',function(req,res){
      var obj = req.body;
      var repoName = obj.repository.full_name;

      client.exists(repoName, function(err, reply) {
        if (reply === 1) {
          client.lrange(repoName,0,-1,function(err,reply){
              var awsUsername = reply[4];
              var awspswd = reply[5];
              var awsIP = reply[3];
              var owner = reply[0];
              var repo = reply[1];
              console.log(awsUsername);
              console.log(repoName);

              ///// Call createImage here with relevant parameters
              self.bot.createImage(awsIP, awsUsername, awspswd, owner, repo);
		self.bot.send("Your image is being created. I will ping you when its done. ", self.bot.slack.dataStore.getChannelByName("general"));
            });
        
        } else {
          res.end('No docker file found');
        }
    });
    });
    var server = app.listen(8081, function(){
            var host = 'localhost';
            var port = server.address().port;
            console.log("Listening on http://" + host + ":" + port);
       });
  }
}
module.exports = Serve;
