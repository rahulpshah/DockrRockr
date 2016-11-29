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
  /*
  const bot = new Bot({
    token: process.env.SLACK_TOKEN,
    autoReconnect: true,
    autoMark: true
  });
  */
  const server = new Serve();

  var bot = server.bot; 
  // var botId = bot.slack.dataStore.getUserByName("dockr_rockr").id
  // console.log(botId)
  //Hello Messag
  bot.respondTo('<@u2pr6rru3> hello', (message, channel, user) => {
    bot.send(`Hi, ${user.name}! What can I do for you today?`, channel)
    bot.send('You can start by asking me to \`create a docker\` file', channel)
  }, true);
  bot.respondTo('hello', (message, channel, user) => {
    if (channel._modelName == "DM"){
    bot.send(`Hi, ${user.name}! What can I do for you today?`, channel)
    bot.send('You can start by asking me to \`create a docker\` file', channel)
  }
  }, true);

  //Hello Message
  /*bot.respondTo('', (message, channel, user) => {
    if(message.text.toLowerCase() != "hello" && message.text.toLowerCase() != "create a docker" && message.text.toLowerCase()!= "yes deploy" && message.text.toLowerCase()!= "commands"){
    console.log(message.text.toLowerCase());
    bot.send('I donot understand this. Try `commands` ', channel)
  }
  }, true);
  */

  // New Message
  bot.respondTo('', (message, channel, user) => {
    console.log(bot.slack.dataStore.getUserByName("dockr_rockr").id)
    var check = ["hello", "create a docker", "yes deploy", "commands", "help", "track repo"]
    if(channel._modelName == "DM"){

     var message = message.text.toLowerCase();
     if(message.indexOf("<@u2pr6rru3>") > -1){
      message = message.split(" ")[1]
     }
     if(user.name!="dockr_rockr" && !(check.indexOf(message) > -1)){
        //console.log(message.text.toLowerCase());
        bot.send('I donot understand this. Try `commands` ', channel)
      }
  }
    else{
    if (message.text.split(" ")[1]) {
     if(message.text.split(" ")[1].toLowerCase() != "hello" && message.text.split(" ")[1].toLowerCase() != "create a docker" && message.text.split(" ")[1].toLowerCase()!= "yes deploy" && message.text.split(" ")[1].toLowerCase()!= "commands" && message.text.split(" ")[1].toLowerCase()!= "help" && message.text.split(" ")[1].toLowerCase()!= "track repo" && user.name!="dockr_rockr"){
   console.log(message.text.toLowerCase());
   bot.send('I donot understand this. Try `commands` ', channel)
  }
  }
  }
  }, true);

  //TODO fix this function

  bot.respondTo('<@u2pr6rru3> help', (message, channel, user) => {

    client.get(user.name, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      bot.send("The only rule here is : 不要撒謊 \nI respond to \n`hello` , `create a docker` or `yes deploy` ", channel);
    });
  }, true);

    bot.respondTo('help', (message, channel, user) => {
    if (channel._modelName == "DM"){
    client.get(user.name, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      bot.send("The only rule here is : 不要撒謊 \nI respond to \n`hello` , `create a docker` or `yes deploy` ", channel);
    });
  }
}, true);

bot.respondTo('<@u2pr6rru3> Track repo', (path, channel, user) => {
    bot.send('Please fill this form to track your repo\n http://35.160.249.120:8081/track', channel);
  }, true);

bot.respondTo('Track repo', (path, channel, user) => {
        if (channel._modelName == "DM"){
      bot.send('Please fill this form to track your repo\n http://35.160.249.120:8081/track', channel);
    }
    }, true);

//Redis connection
client.on('error', (err) => {
    console.log('Error ' + err);
});

bot.respondTo('<@u2pr6rru3> commands', (message, channel, user) => {

    client.get(user.name, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      bot.send("I respond to \n`hello` , `create a docker`, `yes deploy` or `track repo`", channel);
    });
  }, true);
  bot.respondTo('commands', (message, channel, user) => {
    if (channel._modelName == "DM"){
    client.get(user.name, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      bot.send("I respond to \n`hello` , `create a docker`, `yes deploy` or `track repo`", channel);
    });
  }
}, true);
  //HTML message
  bot.respondTo('<@u2pr6rru3> Create a Docker', (path, channel, user) => {
      bot.send('Please fill this form to create a dockerfile\n http://35.160.249.120:8081', channel);
    }, true);
   bot.respondTo('Create a Docker', (path, channel, user) => {
        if (channel._modelName == "DM"){
      bot.send('Please fill this form to create a dockerfile\n http://35.160.249.120:8081', channel);
    }
    }, true);

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
    bot.respondTo('store', (message, channel, user) => {
    if (channel._modelName == "DM"){
    let msg = getArgs(message.text);
    console.log(msg);
    client.set(user.name, msg, (err) => {
      if (err) {
        bot.send('Oops! I tried to store that but something went wrong :(', channel);
      } else {
        bot.send(`Okay ${user.name}, I will remember that for you.`, channel);
      }
    });
  }
  }, true);


  bot.respondTo('<@u2pr6rru3> deploy', (message, channel, user) => {
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

  bot.respondTo('deploy', (message, channel, user) => {
    if (channel._modelName == "DM"){
    client.get(user.name, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }

       bot.deployImage(function(data){
       bot.send("Your app has been deployed at " + data, channel);
    });
    });
  }
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
   bot.respondTo('retrieve', (message, channel, user) => {
    if (channel._modelName == "DM"){
    client.get(user.name, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      bot.send('Here\'s what I remember: ' + reply, channel);
      console.log(`Retrieved: ${reply}`);
    });
  }
});

  // Take the message text and return the arguments
  function getArgs(msg) {
    return msg.split(' ').slice(1);
  }
