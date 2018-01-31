// Liri BOT
// Require / Global variables.
require("dotenv").config();
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var input = process.argv[2];

// Twitter access.
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
// Spotify access.

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

// User commands conditionals.
if (input === "my-tweets") {
    var params = {screen_name: 'TheNotoriousMMA'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        for (var i=0; i<20; i++) {
            console.log(tweets[i].text)
        }
      }
    });
} else if (input === "spotify-this-song") {
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(data.tracks.items[0]);
        for (var j=0; j<20; j++) {
            console.log("Artist Name: "+ data.tracks.items[j].album.artists[j].name);
            console.log("Song Name: " + data.tracks.items[j].name);
        }
    });
} else if (input === "movie-this") {
    console.log("movies");
} else if (input === "do-what-it-says") {
    console.log("I-want-it-that-way");
} else {
    console.log("Please use the correct command. ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')")
}
