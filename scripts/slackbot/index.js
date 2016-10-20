'use strict';

let Bot = require('./Bot');
let request = require('request')
const bot = new Bot({
  token: process.env.SLACK_TOKEN,
  autoReconnect: true,
  autoMark: true
});

bot.respondTo('hello', (message, channel, user) => {
  bot.send(`Hello to you too, ${user.name}!`, channel)
}, true);

bot.respondTo('star', (message, channel, user) => {
    var lst = message.text.split(" ");
    var username = "rahulpshah";
    if(lst.length != 0)
        username = lst[lst.length - 1];
    var options = 
    {    
        url: "http://localhost:8081/?username="+username, 
        method: 'GET',
        headers: {
            "User-Agent": "Stargazers",
            "content-type": "application/json",
            "Authorization": '1aff16fff47766417b3f255164dc0373a8b68c42'
        }
    }
    request(options, function(error, response, body){

        var obj = JSON.parse(JSON.parse(body));
        console.log(obj);
        bot.send(`star index is ${obj.hindex}!`, channel)
    });
}, true);