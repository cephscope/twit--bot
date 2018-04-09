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
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  var mediaIdStr = data.media_id_string
  var altText = "bleep bloop"
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) { 
      var params = { status: '', media_ids: [mediaIdStr] }
 
      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})
}

options = {
    url: telePics[random(telePics.length)].src,
    dest: '/Users/modestmusashi/modestmusashi/twitimg/image.jpg'
  }
 function downloadImage() {
    download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename)
      postTweet();
    }).catch((err) => {
      throw err
    })
 }

downloadImage();
setInterval(downloadImage, 3600000);