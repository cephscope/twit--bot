const telePics = require('./telepics.js');
const download = require('image-downloader');
const config = require('./config.js');
//const cache = require('/Users/modestmusashi/modestmusashi/twitimg/checkCache.js')
const twit = require('twit');
const fs = require('fs');
const T = new twit(config);

let cacheArr = [];
console.log(cacheArr.push('hello'));

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


 function downloadImage() {
    options = {
        url: telePics[random(telePics.length)].src,
        dest: '/Users/modestmusashi/modestmusashi/twitimg/image.jpg'
      }
    download.image(options)
    .then(({ filename, image }) => {
      console.log('File saved to', filename)
      /*do {
        checkCache();
      } while (cache.length != telePics.length);*/
    }).catch((err) => {
      throw err
    })
 }

 /*function checkCache() {
    if (cache.includes(telePics[random(telePics.length)].src)) {
        console.log("image already tweeted, fetching new one");
        downloadImage();
    } else {
        cache.push("hello");
        postTweet();
    }
}*/


downloadImage();
//setInterval(downloadImage, 3600000);