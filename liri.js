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

// Functions
function tweets() {
    var params = {screen_name: 'TheNotoriousMMA'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        for (var i=0; i<20; i++) {
            console.log(tweets[i].text)
        }
      }
    });
}
function spotify() {
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist Name: "+ data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("URL for song: " + data.tracks.items[0].external_urls.spotify);
    });
}

function omdb() {
var request = require("request");
var movie = process.argv[3];
request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The movie's release date: " + JSON.parse(body).Released);
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("The movie's country of production is: " + JSON.parse(body).Country);
        console.log("Languages: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Plot: " + JSON.parse(body).Actors);
    }
// console.log(JSON.parse(body).Released);
// console.log(JSON.parse(body).Ratings[1].Source[0].Value);


});
}

// User commands conditionals.
if (input === "my-tweets") {
    tweets();
} else if (input === "spotify-this-song") {
    spotify();
} else if (input === "movie-this") {
    omdb();
} else if (input === "do-what-it-says") {
    console.log("I-want-it-that-way");
} else {
    console.log("Please use the correct command. ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')")
}
