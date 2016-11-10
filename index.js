'use strict';
var fs = require('fs');
const redis = require('redis');
const client = redis.createClient();
var Botkit = require('botkit');

//Import bot
let Bot = require('./bot.js');
//Import server
let Serve = require('./src/app/server.js')

//Mock JSON

//Bot construction
const bot = new Bot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});

const server = new Serve();
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

//Hello Message
bot.respondTo('<@u2pr6rru3> hello', (message, channel, user) => {
  if(user.name != "dockr_rockr" && message.text.toLowerCase().indexOf("<@u2pr6rru3>")>=0){
  bot.send(`Hi, ${user.name}! What can I do for you today?`, channel)
  bot.send('You can start by asking me to \`create a docker\` file', channel)
  console.log("hello called");
  console.log(message.text);
}
}, true);

// New Message

bot.respondTo('', (message, channel, user) => {
  if(user.name != "dockr_rockr" && message.text.toLowerCase().indexOf("<@u2pr6rru3>")>=0){
  if(message.text.toLowerCase() != "<@u2pr6rru3> hello" && message.text.toLowerCase() != "<@u2pr6rru3> create a docker" && message.text.toLowerCase()!= "<@u2pr6rru3> yes deploy" && message.text.toLowerCase()!= "<@u2pr6rru3> commands"){
 console.log(message.text.toLowerCase());
 console.log(user.name);
 bot.send('I donot understand this. Try `commands` ', channel)
}}
}, true);

//TODO fix this function

bot.respondTo('<@u2pr6rru3> commands', (message, channel, user) => {
  if(user.name != "dockr_rockr" && message.text.toLowerCase().indexOf("<@u2pr6rru3>")>=0){
  client.get(user.name, (err, reply) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("commands cqalled");
    console.log(message.text);
    //console.log(JSON.stringify(message) +"MESSAGE")
    bot.send("I respond to \n`hello` , `create a docker` or `yes deploy` ", channel);

  });
}
});
//HTML message
bot.respondTo('<@u2pr6rru3> Create a Docker', (path, channel, user) => {
  if(user.name != "dockr_rockr" && message.text.toLowerCase().indexOf("<@u2pr6rru3>")>=0){
    bot.send('Please fill this form to create a dockerfile\n http://localhost:8081#uid='+user.id, channel);
    console.log("create a docker called");
    console.log(message.text);
  }}, true);

//Redis connection
client.on('error', (err) => {
    console.log('Error ' + err);
});

client.on('connect', () => {
  console.log('Connected to Redis!');
});

//Storing in Redis
bot.respondTo('<@u2pr6rru3> store', (message, channel, user) => {
  let msg = getArgs(message.text);
  console.log(msg);
  client.set(user.name, msg, (err) => {
    if (err) {
      bot.send('Oops! I tried to store that but something went wrong :(', channel);
    } else {
      bot.send(`Okay ${user.name}, I will remember that for you.`, channel);
    }
  });
}, true);


<<<<<<< HEAD
bot.respondTo('<@u2pr6rru3> yes deploy', (message, channel, user) => {
  client.get(user.name, (err, reply) => {
    if (err) {
      console.log(err);
      return;
    }
     bot.deployImage(function(data){
     bot.send("Your app has been deployed at " + data, channel);
     console.log("dep called");
     console.log(message.text);
  });
  });
}, true);

//Retrieve from Redis
bot.respondTo('<@u2pr6rru3> retrieve', (message, channel, user) => {
  client.get(user.name, (err, reply) => {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  bot.send('Here\'s what I remember: ' + reply, channel);
	  console.log(`Retrieved: ${reply}`);
	});
});

// Take the message text and return the arguments
function getArgs(msg) {
  return msg.split(' ').slice(1);
}
