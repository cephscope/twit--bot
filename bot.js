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

function postTweet() {/*
    const b64content = fs.readFileSync('./brew.png', { encoding: 'base64' })
    // first we must post the media to Twitter 
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and 
      // other text-based presentations and interpreters 
      var mediaIdStr = data.media_id_string
      var altText = "bleep bloop"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
     
      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet) 
          var params = { status: '', media_ids: [mediaIdStr] }
     
          T.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })   
*/
T.post('statuses/update', { status: "https://i.imgur.com/DzTVuk5.jpg" }, function(err, data, response) {
    console.log(data)
  });
}

postTweet()
setInterval(postTweet, 3600000);