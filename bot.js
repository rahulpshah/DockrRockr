'use strict';

const RtmClient = require('@slack/client').RtmClient;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var request = require('request');
var Regex = require('regex');
var FSlack = require('node-slack-upload');
var fs = require('fs-extra');
var http = require('http');
var Client = require('ssh2').Client;
var conn = new Client();
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
    respondTo(keywords, callback, start) {
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
    send(message, channel, cb) {
        this.slack.sendMessage(message, channel.id, () => {
            if (cb) {
                cb();
            }
        });
    }
    fileUpload(path, channel, cb) {
        this.fslack.uploadFile({
            file: fs.createReadStream(path),
            filetype: 'post',
            title: 'Docker File',
            initialComment: 'Here is your docker file!',
            channels: channel.id
        }, function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log('done');
            }
            if (cb) {
                cb();
            }
        });
    }

    pushToGit(path, owner, repo, cb) {
        var token = "token lololol";
        var owner = 'jsharda';
        var repo = 'dummy';

        var urlRoot = "https://github.ncsu.edu/api/v3";

        var options = {
            url: urlRoot + '/repos/' + owner + "/" + repo + "/contents/dockerfile11",
            method: 'PUT',
            headers: {
                //"User-Agent": "EnableIssues",
                //"content-type": "application/json",
                "Authorization": token
            },
            json: {
                "message": "docker file created by DockrRockr",
                "content": new Buffer(fs.readFileSync(path, 'utf8')).toString('base64')
            }
        };

        request(options, function(error, response, body) {
            //var obj = JSON.parse(body);
            if (!error) {
                //console.log(body);
                //console.log(fs.readFileSync(path, 'utf8').toString('base64'));
                var regex = new Regex("^2*");

                if (regex.test(response.statusCode)) {
                    if (cb) {
                        cb();
                    }
                }
            }
        });
    }

    createGitHook(owner, repo, cb) {
        var token = "token lolol";
        var owner = 'jsharda';
        var repo = 'dummy';

        var urlRoot = "https://github.ncsu.edu/api/v3";

        var options = {
            url: urlRoot + '/repos/' + owner + "/" + repo + "/hooks",
            method: 'POST',
            headers: {
                //"User-Agent": "EnableIssues",
                "content-type": "json",
                "Authorization": token
            },
            json: {
                "name": "web",
                "active": true,
                "events": ["push"],
                "config": {
                    "url": "https://hooks.slack.com/services/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",
                    "content_type": "json"
                }
            }
        };

        request(options, function(error, response, body) {
            //var obj = JSON.parse(body);
            if (!error) {

                //console.log(body);
                console.log(response);
                if (cb) {
                    cb();
                }
            }
        });
    }



    createDockerFile(json, cb) {
        //Create Dockerfile from template and replace with user credentials
        var source = 'Files/DockerFileTemplate';
        var target = 'DockerFile';
        var self = this;
        fs.copy(source, target, function() {
            var mapObj = { FullName: json.maintainer, Email: "test@ncsu.edu", AppName: json.app };
            var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
            fs.readFile("DockerFile", 'utf8', function(err, data) {
                if (err) {
                    return console.log(err);
                }
                var result = data.replace(re, function(matched) {
                    return mapObj[matched];
                });

                fs.writeFile("DockerFile", result, 'utf8', function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        self.fileUpload(`DockerFile`, json.channel, function(err, res) {
                            self.send('File uploaded', json.channel);
                            self.createGitHook(json.gitUName, json.repo, function(err, res) {
                                //self.send('Git Hook Created', json.channel);
                            });
                            self.pushToGit(`DockerFile`, json.gitUName, json.repo, function(err, res) {
                                self.send('File Pushed on your Git Repository!', json.channel);

                            });
                            self.createImage(function() {
                                self.send("Your DockerImage is ready.", json.channel);
                                self.send("Do you want to deploy your image to AWS?.", json.channel);
                            });
                        });

                    }
                });
            });
            if (cb) {
                cb();
            }
        });
    }
    deployImage(cb) {
            var url = "http://amazonaws.com/mock-url";
            setTimeout(function() { cb(url); }, 5000);
        }
    createImage(cb) {
        var remote_server = 'ec2-35-160-249-120.us-west-2.compute.amazonaws.com';
        var username = 'rshah';
        var password = 'Pass4Rahul!';
        conn.on('ready', function() 
        {
          console.log('Client :: ready');
          conn.exec('sh script.sh &', function(err, stream) {
            if (err) throw err;
            stream.on('close', function(code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);      
                conn.end();
                conn.destroy();

            }).on('data', function(data) {
              console.log('STDOUT: ' + data);
              conn.end();
              conn.destroy();
            }).stderr.on('data', function(data) {
              console.log('STDERR: ' + data);
            });
          });
        }).connect({
          host: remote_server,
          port: 22,
          username: username, 
          password: password
        });
        self.send("Your Docker Image is being created. I will ping you when its done");
    }
}


// Export the Bot class, which will be imported when 'require' is 
// used
module.exports = Bot;
