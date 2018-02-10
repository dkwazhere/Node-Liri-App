// Liri BOT
// Require / Global variables.
require("dotenv").config();
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var input = process.argv[2];

// Functions
function tweets() {
    var params = {screen_name: process.argv[3]};
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var i=0; i<20; i++) {
              console.log(tweets[i].text);
          }
     }
    });
};

function tweetsNull() {
    var params = {screen_name: "thenotoriousMMA"};
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var i=0; i<20; i++) {
            console.log(tweets[i].text);
        }
     }
    });
};

function spotify() {
    var spotify = new Spotify({
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
      });
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Artist Name: "+ data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album name: " + data.tracks.items[0].album.name);
            console.log("URL for song: " + data.tracks.items[0].external_urls.spotify);
        }
    });
};

function spotifyNull() {
    var spotify = new Spotify({
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
      });
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Artist Name: "+ data.tracks.items[5].artists[0].name);
            console.log("Song Name: " + data.tracks.items[5].name);
            console.log("Album name: " + data.tracks.items[5].album.name);
            console.log("URL for song: " + data.tracks.items[5].external_urls.spotify);
        }
    });
};

function omdb() {
var request = require("request");
var movie = process.argv[3];
request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release date: " + JSON.parse(body).Released);
        console.log("imdb Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of production is: " + JSON.parse(body).Country);
        console.log("Languages: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
});
};

function omdbNull() {
var request = require("request");
var movie = process.argv[3];
request("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release date: " + JSON.parse(body).Released);
        console.log("imdb Rating: " + JSON.parse(body).imdbRating);
        console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of production is: " + JSON.parse(body).Country);
        console.log("Languages: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
});
};

function doWhatItSays() {
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            } else {
                console.log(data);
                var spotify = new Spotify({
                  id: process.env.SPOTIFY_ID,
                  secret: process.env.SPOTIFY_SECRET
                  });
                spotify.search({ type: 'track', query: 'I want it that way' }, function(err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    } else {
                        console.log("Artist Name: "+ data.tracks.items[0].artists[0].name);
                        console.log("Song Name: " + data.tracks.items[0].name);
                        console.log("Album name: " + data.tracks.items[0].album.name);
                        console.log("URL for song: " + data.tracks.items[0].external_urls.spotify);
                    }
                });
            }
        })
};

// User commands conditionals.
if (input === "my-tweets") {
    if (process.argv[3] === undefined) {
        tweetsNull();
    } else {
        tweets();
    }
} else if (input === "spotify-this-song") {
    if (process.argv[3] === undefined) {
        spotifyNull();
    } else {
        spotify();
    }
} else if (input === "movie-this") {
    if (process.argv[3] === undefined) {
        omdbNull();
    } else {
        omdb();
    }
} else if (input === "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("Please use the correct command. ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')")
}
