'use strict';
var fs = require('fs');
const redis = require('redis');
const client = redis.createClient();

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


//Hello Message
bot.respondTo('hello', (message, channel, user) => {
  bot.send(`Hi, ${user.name}! What can I do for you today?`, channel)
  bot.send('You can start by asking me to \`create a docker\` file', channel)
}, true);

//Hello Message
bot.respondTo('', (message, channel, user) => {
  if(message.text.toLowerCase() != "hello" && message.text.toLowerCase() != "create a docker" && message.text.toLowerCase()!= "yes deploy" && message.text.toLowerCase()!= "commands"){
  console.log(message.text.toLowerCase());
  bot.send('I donot understand this. Try `commands` ', channel)
}
}, true);

bot.respondTo('commands', (message, channel, user) => {

  client.get(user.name, (err, reply) => {
    if (err) {
      console.log(err);
      return;
    }
    //console.log(JSON.stringify(message) +"MESSAGE")
    bot.send("I respond to \n`hello` , `create a docker` or `yes deploy` ", channel);
  });

});
//HTML message
bot.respondTo('Create a Docker', (path, channel, user) => {
    bot.send('Please fill this form to create a dockerfile\n http://localhost:8081#uid='+user.id, channel);
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


bot.respondTo('yes deploy', (message, channel, user) => {
  client.get(user.name, (err, reply) => {
    if (err) {
      console.log(err);
      return;
    }
     bot.deployImage(function(data){
     bot.send("Your app has been deployed at " + data, channel);
  });
  });
}, true);

//Retrieve from Redis
bot.respondTo('retrieve', (message, channel, user) => {
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
