'use strict';

const RtmClient = require('@slack/client').RtmClient;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var FSlack = require('node-slack-upload');
var fs = require('fs-extra');
class Bot {
  constructor(opts) {
    let slackToken = opts.token;
    let autoReconnect = opts.autoReconnect || true;
    let autoMark = opts.autoMark || true;

    this.fslack = new FSlack(opts.token);

    this.slack = new RtmClient(slackToken, { 
      // Sets the level of logging we require
      logLevel: 'error', 
      // Initialize a data store for our client, 
      // this will load additional helper
      // functions for the storing and retrieval of data
      dataStore: new MemoryDataStore(),
      // Boolean indicating whether Slack should automatically 
      // reconnect after an error response
      autoReconnect: autoReconnect,
      // Boolean indicating whether each message should be marked
      // as read or not after it is processed
      autoMark: autoMark
    });

    this.slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
      let user = this.slack.dataStore.getUserById(this.slack.activeUserId)
      let team = this.slack.dataStore.getTeamById(this.slack.activeTeamId);

      this.name = user.name;

      console.log(`Connected to ${team.name} as ${user.name}`);      
    });
    
    // Create an ES6 Map to store our regular expressions
    this.keywords = new Map();

    this.slack.on(RTM_EVENTS.MESSAGE, (message) => {
      // Only process text messages
      if (!message.text) {
        return;
      }

      let channel = this.slack.dataStore.getChannelGroupOrDMById(message.channel);
      let user = this.slack.dataStore.getUserById(message.user);

      // Loop over the keys of the keywords Map object and test each
      // regular expression against the message's text property
      for (let regex of this.keywords.keys()) {    
        if (regex.test(message.text)) {
          let callback = this.keywords.get(regex);
          callback(message, channel, user);
        }
      }
    });

    this.slack.start();
  }
    respondTo(keywords, callback, start) 
    {
      // If 'start' is truthy, prepend the '^' anchor to instruct the
      // expression to look for matches at the beginning of the string
      if (start) {
        keywords = '^' + keywords;
      }

      // Create a new regular expression, setting the case 
      // insensitive (i) flag
      let regex = new RegExp(keywords, 'i');

      // Set the regular expression to be the key, with the callback
      // function as the value
      this.keywords.set(regex, callback);
    }

    // Send a message to a channel, with an optional callback
    send(message, channel, cb) 
    {
      this.slack.sendMessage(message, channel.id, () => {
        if (cb) {
          cb();
        }
      });
    }
    fileUpload(path, channel, cb) 
    {
      this.fslack.uploadFile({
      file: fs.createReadStream( path),
      filetype: 'post',
      title: 'Docker File',
      initialComment: 'Here is your docker file!',
      channels: channel.id
      }, function(err) {
          if (err) {  
            console.error(err);
          }
          else {
            console.log('done');
          }
          if (cb) {
            cb();
          }
        });
    }

    createDockerFile(json, cb) {
      //Create Dockerfile from template and replace with user credentials
      var source = 'Files/DockerFileTemplate';
      var target = 'DockerFile'; 
      var self = this;
        fs.copy(source, target, function(){
          var mapObj = {FullName:json.maintainer,Email:"test@ncsu.edu",AppName:json.app};
          var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
          fs.readFile("DockerFile", 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          var result = data.replace(re, function(matched){
          return mapObj[matched];
          });

          fs.writeFile("DockerFile", result, 'utf8', function (err) {
             if (err) {
                console.log(err);
             }
             else
                {
                  self.fileUpload(`DockerFile`, json.channel, function(err,res) {
                  self.send('file uploaded',json.channel);
                });
              }
            });
          });
          if(cb)
          {
            cb();
          }
        }); 
    }
}

// Export the Bot class, which will be imported when 'require' is 
// used
module.exports = Bot;