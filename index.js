'use strict';
var fs = require('fs');
const redis = require('redis');
const client = redis.createClient();

//Import bot
let Bot = require('./bot.js');

//Bot construction
const bot = new Bot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});


//Hello Message
bot.respondTo('hello', (message, channel, user) => {
  bot.send(`Hello to you too, ${user.name}!`, channel)
}, true);


//HTML message
bot.respondTo('docker', (path, channel, user) => {
    bot.send('Please fill this form to create a dockerfile\n http://localhost:8081/', channel);
  }, true);


//Message to uploadFile
bot.respondTo('create', (path, channel, user) => {
  bot.fileUpload(`package.json`, channel, function(err,res) {
  	bot.send('file uploaded',channel);
  })
}, true);

//Redis connection
client.on('error', (err) => {
    console.log('Error ' + err);
});

client.on('connect', () => {
  console.log('Connected to Redis!');
});

//Storing in Redis
bot.respondTo('store', (message, channel, user) => {
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

//Retrieve from Redis
bot.respondTo('retrieve', (message, channel, user) => {
  console.log(user.name)  
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


//Create Dockerfile from template and replace with user credentials
fs.createReadStream('Files/DockerFileTemplate').pipe(fs.createWriteStream('DockerFile'));
var mapObj = {FullName:"Krunal Gala",Email:"krunal3103@gmail.com",AppName:"DockerRocker"};

var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
fs.readFile("DockerFile", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(re, function(matched){
  return mapObj[matched];
});

  fs.writeFile("DockerFile", result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
