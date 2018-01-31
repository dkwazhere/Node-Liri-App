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
        // console.log(data.tracks.items[0])
        console.log("Artist Name: "+ data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("URL for song: " + data.tracks.items[0].external_urls.spotify);
    });
} else if (input === "movie-this") {
    console.log("movies");
} else if (input === "do-what-it-says") {
    console.log("I-want-it-that-way");
} else {
    console.log("Please use the correct command. ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')")
}


[ { external_urls:
    { spotify: 'https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of' },
    href: 'https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of',
    id: '0LyfQWJT6nXafLPZqxe9Of',
    name: 'Various Artists',
    type: 'artist',
    uri: 'spotify:artist:0LyfQWJT6nXafLPZqxe9Of' } ]
