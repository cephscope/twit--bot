const telePics = require('./telepics.js');
const config = require('./config.js');
const twit = require('twit');
const fs = require('fs');
const T = new twit(config);

function random(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
//const newStatus = telePics[random(telePics.length)].src;

/*function postTweet() {
    T.post('statuses/update', { status: telePics[random(telePics.length)].src }, function(err, data, response) {
        console.log(data)
      });
}*/

function postTweet() {
    T.post('statuses/update', { status: "h​ttp://jpg.party/" + telePics[random(telePics.length)].src }, function(err, data, response) {
        console.log(data)
      });
}

postTweet()
setInterval(postTweet, 3600000);