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
var hostname = process.env.HOST;
var port = process.env.PORT;
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
        this.s_keywords = new Map();
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
        if(!(this.s_keywords.has(keywords)))
        {
             this.keywords.set(regex, callback);
             this.s_keywords.set(keywords, callback);
        }
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

    pushToGit(path,owner, repo,token1, cb) {
        var token = "token ".concat(token1);
        
       // var urlRoot = "https://github.ncsu.edu/api/v3";
        var urlRoot = "https://api.github.com";

        var options = {
            url: urlRoot + '/repos/' + owner + "/" + repo + "/contents/Dockerfile",
            method: 'PUT',
            headers: {
                "User-Agent": "pushToGit",
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
		console.log("-------------------------------------------------------------------");
		console.log(response);
                console.log(response.statusCode);
                //console.log(fs.readFileSync(path, 'utf8').toString('base64'));
                
                
                if (response.statusCode.toString().startsWith("2")) {
                    console.log("regex passed");
                    if (cb) {
                        console.log("cb called");
                        cb();
                    }
                }
            }
	    else
	    {
                self.send("Error occured while pushing to git. Please check credentials", self.slack.dataStore.getChannelByName("general"));
	    }
        });
    }

    createGitHook(owner, repo, token1,cb) {
        var token = "token ".concat(token1);

        //var urlRoot = "https://github.ncsu.edu/api/v3";
        var urlRoot = "https://api.github.com";
        var options = {
            url: urlRoot + '/repos/' + owner + "/" + repo + "/hooks",
            method: 'POST',
            headers: {
               "User-Agent": "CreateGitHook",
                "content-type": "json",
                "Authorization": token
            },
            json: {
                "name": "web",
                "active": true,
                "events": ["push"],
                "config": {
                    "url": "http://" + hostname + ":" + port + "/gitHook",
                    "content_type": "json"
                }
            }
        };

        request(options, function(error, response, body) {
            //var obj = JSON.parse(body);
            if (!error) {
			console.log(response.body.errors);
			console.log(response.statusCode);
                if (cb) {
                    cb();
                }
            }
            else
            { 
		self.send("Error occured while creating git hook. Hook already created", self.slack.getChannelByName("general"));
            }
        });
    }



    createDockerFile(json, cb) {
        //Create Dockerfile from template and replace with user credentials
        var source = 'DockerfileTemplate';
        var target = 'Dockerfile';
        var self = this;
        fs.copy(source, target, function() {
            var mapObj = { FullName: json.gitUsername, Port: json.port };
            var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
            fs.readFile("Dockerfile", 'utf8', function(err, data) {
                if (err) {
                    self.send("Error in creating dockerfile", json.channel);
                    return console.log(err);
                }
                var result = data.replace(re, function(matched) {
                    return mapObj[matched];
                });
                fs.writeFile("Dockerfile", result, 'utf8', function(err) {
                    if (err) 
                    {
                        self.send("Error in creating dockerfile", json.channel);
                        console.log(err);
                    } 
                    else 
                    {
                        self.fileUpload(`Dockerfile`, json.channel, function(err, res) 
                        {
                            if(err)
                            {
                                self.send("Error in pushing dockerfile. Please fill the form with proper credentials", json.channel);
                            }
                            else
                            {
                                self.send('File uploaded', json.channel);
                                self.pushToGit(`Dockerfile`, json.gitUsername, json.repo,json.gitToken, function(err, res)
                                {
                                    self.send('File Pushed on your Git Repository!', json.channel);
                                    self.createGitHook(json.gitUsername, json.repo, json.gitToken,function(err, res) 
                                    {
                                         if(err)
                                         {
                                            self.send("Error while creating githook. Git Hook should not be present");
                                         }
                                         else
                                         {
                                            self.send('Git Hook Created', json.channel);
                                         }
                                         
                                    });
                                });
                            }
                        });
                    }
                });
            });
            if (cb) {
                cb();
            }
        });
    }
    
    /*createImage(cb) {
	    var self = this;
        var remote_server = 'ec2-35-160-249-120.us-west-2.compute.amazonaws.com';
        var username = 'kgala';
        var password = 'Pass4Krunal!';
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
        self.send("Your Docker Image is being created. I will ping you when its done", this.slack.dataStore.getChannelByName("general"));
    }*/

    createImage(hostname, v_username, v_password, v_owner, v_repoName, v_port, app_name, cb) { 
        var self = this;
        var gitRepo = v_owner + "/" + v_repoName;
        var host = {
            server:        {     
                host:         hostname,
                userName:     v_username,
                password:     v_password
            },
            passwordPrompt: ":",
            commands: ["sudo su", "service docker restart", "git clone https://github.com/" + gitRepo, "cd " + v_repoName, "git pull origin master","docker stop $(docker ps -a -q)","docker rm $(docker ps -a -q)", "docker build --no-cache=true -t "+app_name+" ."],
            onError: function(err, type){
                if(err)
                {
                    self.send("Build Failed. Check your code at given instance", self.slack.dataStore.getChannelByName("general"));    
                }
                
            }
        };

        var SSH2Shell = require ('ssh2shell'),
        //Create a new instance passing in the host object 
        SSH = new SSH2Shell(host),
        //Use a callback function to process the full session text 
        callback = function(sessionText){
            console.log(sessionText);
            self.send("Docker image is ready. Do you want to deploy it?", self.slack.dataStore.getChannelByName("general"));
            self.respondTo("<@u2pr6rru3> Yes deploy", function()
            {
                SSH2Shell = require ('ssh2shell'),
                //Create a new instance passing in the host object 
                host = {
                    server:        {     
                        host:         hostname,
                        userName:     v_username,
                        password:     v_password,
                    },
                    passwordPrompt: ":",
                    commands: ["docker run -p "+v_port+":80 "+" "+app_name]
                };
                var SSH1 = new SSH2Shell(host),

                //Use a callback function to process the full session text 
                callback1 = function(sessionText){
                   console.log(sessionText);
	               self.send("Your image is deployed here: http://"+ hostname + ":" + v_port, self.slack.dataStore.getChannelByName("general"));
                }
                //Start the process 
                SSH1.connect(callback1);
   
            });
        }

        //Start the process 
        SSH.connect(callback);
    }

    
}


// Export the Bot class, which will be imported when 'require' is 
// used
module.exports = Bot;
