require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);




function concert() {
    var artist = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.venue.name);
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Event Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));



        }
    )};

    function spotifySearch() {

        var song = process.argv[3];
    
        spotify.search({ type: 'track', query: song, }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
    
            console.log();
            console.log("////////////////////////////");
            console.log();
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log();
            console.log("////////////////////////////");
            console.log();
    
    
        });
    }

    function movie() {
        // put code to run omdb api
        var movieName = process.argv[3];
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    
        // console.log(queryUrl);
    
        axios.get(queryUrl).then(
            function (response) {
    
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB: " + response.data.imdbRating);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
    
    
            }
        );
        
        }
if (process.argv[2] === "concert-this") {
    // put code to run the band is in town api
    concert()   
}




else if (process.argv[2] === "spotify-this-song") {
    // put code to run spotify api
    // artist 
    // song
    // preview link
    // album 
    // if no song is provided, will default to "The Sign" by Ace of Base.

spotifySearch()


}


else if (process.argv[2] === "movie-this") {
movie()
}
else if (process.argv[2] === "do-what-it-says") {
    // put code to run spotify-this-song api and search "I want it that way" in random.txt
    
    fs.readFile('random.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var array = data.toString().split(",");
        console.log(array[0]);
        console.log(array[1]);

        var searchParameter = array[0];
        var searchVar = array[1];
        if (searchParameter === "concert-this") {
            concert(searchParameter + searchVar)
        } else if (searchParameter === "spotify-this-song") {
            spotify(searchParameter + searchVar)
        } else if (searchParameter === "movie-this") 
        {
            movie(searchParameter + searchVar)
        }

    });

    

}

