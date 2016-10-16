'use strict';

let Bot = require('./bot.js');

const bot = new Bot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});

bot.respondTo('hello', (message, channel, user) => {
  bot.send(`Hello to you too, ${user.name}!`, channel)
}, true);

bot.respondTo('create', (path, channel, user) => {
  bot.fileUpload(`package.json`, channel,function(err,res){
  	bot.send('file uploaded',channel);
  })
}, true);