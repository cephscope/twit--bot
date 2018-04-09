const telePics = require('./telepics.js');
const download = require('image-downloader');
const config = require('./config.js');
const twit = require('twit');
const fs = require('fs');
const T = new twit(config);

function random(max) {
   return Math.floor(Math.random() * Math.floor(max));
}

function postTweet() {
    var b64content = fs.readFileSync('/Users/modestmusashi/modestmusashi/twitimg/image.jpg', { encoding: 'base64' })
 
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
}

options = {
    url: 'https://cdn.spacetelescope.org/archives/images/thumb700x/Black_hole04.jpg',
    dest: '/Users/modestmusashi/modestmusashi/twitimg/image.jpg'        // Save to /path/to/dest/photo.jpg
  }
   
  download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename)
      postTweet();
    }).catch((err) => {
      throw err
    })
//const newStatus = telePics[random(telePics.length)].src;

/*function postTweet() {
    T.post('statuses/update', { status: telePics[random(telePics.length)].src }, function(err, data, response) {
        console.log(data)
      });
}*/



//setInterval(download, 3600000);