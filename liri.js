//set any environment variables with the dotenv package
require("dotenv").config();

//require the keys.js file 
var keys = require("./keys.js");
//require the all modules
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

//access key info of spotify and save it in a variable
var spotify = new Spotify(keys.spotify);





//set global variables to keep track of arguments
var action = process.argv[2]
var search = process.argv[3]

// create variables to save log
var logAction = ""
var logData = {}





const run = function (action, search) {

    // 1. concert-this (node liri.js concert-this <artist/band name here>)
    //if action is concert-this
    if (action === "concert-this") {
        if (search !== undefined) {
            // set queryUrl for OMDb
            var artist = search.split("-").join('+');
            var artistDisplay = search.split("-").join(' ');
            var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

            // Run a request with axios to the OMDB API with the movie specified
            axios.get(queryUrl).then(
                function (response) {
                    // The artist's or band's name 
                    console.log("For '" + artistDisplay + "'. Information is as below:");
                    // Name of the venue + Venue location
                    console.log("* Venue: " + response.data[0].venue.name + " at " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                    // Date of the Event (use moment to format this as "MM/DD/YYYY")
                    var dateDisplay = moment(response.data[0].datetime).format("MM/DD/YYYY");
                    console.log("* Date: " + dateDisplay);
                })

        } else {

        }
    }




    // 2. spotify-this-song(node liri.js spotify-this-song '<song name here>')
    //if action is spotify-this-song
    else if (action === "spotify-this-song") {
        // If the user give a song then return the info
        if (search !== undefined) {
            //Then search on spotify using with promises
            spotify
                .search({ type: 'track', query: search })
                .then(function (response) {

                    // This will show the following information about the song in your terminal/bash window
                    // The song's name and Artist(s)
                    console.log("For '" + response.tracks.items[0].name + "'. Information is as below:");
                    // Artist(s)
                    console.log("* Artist(s): " + response.tracks.items[0].artists[0].name);
                    // The album that the song is from
                    console.log("* Album:     " + response.tracks.items[0].album.name);
                    // A preview link of the song from Spotify
                    console.log("* Link:      " + response.tracks.items[0].external_urls.spotify);
                    //save arguments and return data in logAction and logData
                    logAction = action + `,"` + search + `"`
                    logData = {
                        "Artist(s)": response.tracks.items[0].artists[0].name,
                        "Album": response.tracks.items[0].album.name,
                        "Link": response.tracks.items[0].external_urls.spotify
                    }
                    //append log
                    appendLog(logAction)
                    appendLog(JSON.stringify(logData))
                })
                .catch(function (err) {
                    console.log(err);
                });
            // If no song is provided then your program will default to "The Sign" by Ace of Base.
        } else {
            console.log("But I need a song's name, such as 'The Sign'. Information will be listed as follows")
            // Artist(s)
            console.log("* Artist(s): Ace of Base");
            // The album that the song is from
            console.log("* Album:     The Sign (US Album) [Remastered]");
            // A preview link of the song from Spotify
            console.log("* Link:      https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        }

    }
    // 3. movie-this (node liri.js movie-this '<movie name here>')
    else if (action === "movie-this") {
        // If the user give a movie then return the info
        if (search !== undefined) {

            // set queryUrl for OMDb
            var movie = search.split("-").join('+');
            var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

            // Run a request with axios to the OMDB API with the movie specified
            axios.get(queryUrl).then(
                function (response) {
                    // This will output the following information to your terminal/bash window:
                    //   * Title of the movie.
                    console.log("For '" + response.data.Title + "'. Information is as below:");
                    //   * Year the movie came out.
                    console.log("* Premiere year:          " + response.data.Year);

                    //   * IMDB Rating of the movie.
                    console.log("* IMDB Rating:            " + response.data.imdbRating);

                    //   * Rotten Tomatoes Rating of the movie.
                    console.log("* Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);

                    //   * Country where the movie was produced.
                    console.log("* Country:                " + response.data.Country);

                    //   * Language of the movie.
                    console.log("* Language:               " + response.data.Language);

                    //   * Plot of the movie.
                    console.log("* Plot:                   " + response.data.Plot);

                    //   * Actors in the movie.
                    console.log("* Actors:                 " + response.data.Actors);

                    //save arguments and return data in logAction and logData
                    logAction = action + `,"` + search + `"`
                    logData = {
                        "Premiere year": response.data.Year,
                        "Premiere year": response.data.Year,
                        "IMDB Rating": response.data.imdbRating,
                        "Rotten Tomatoes Rating": response.data.Ratings[1].Value,
                        "Country": response.data.Country,
                        "Language": response.data.Language,
                        "Plot": response.data.Plot,
                        "Actors": response.data.Actors
                    }
                    //append log
                    appendLog(logAction)
                    appendLog(JSON.stringify(logData))

                },

                function (err) {
                    console.log("Some errors showed up!", err)
                },


            );

            // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        } else {
            console.log("But I need a movie's name, such as 'Mr. Nobody'. Information will be listed as follows")
            console.log("* Premiere year:          2009")
            console.log("* IMDB Rating:            7.8")
            console.log("* Rotten Tomatoes Rating: 67%")
            console.log("* Country:                Belgium, Germany, Canada, France, USA, UK")
            console.log("* Language:               English, Mohawk")
            console.log("* Plot:                   A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.")
            console.log("* Actors:                 Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham")

        }


    }
    // 4. do-what-it-says
    //if action is do-what-it-says
    else if (action === "do-what-it-says") {
        //read the random.txt file
        fs.readFile("./random.txt", "utf8", function (error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            console.log("I got the command: " + data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log("So you're now trying to " + dataArr[0]);

            //run the run function again
            run(dataArr[0], dataArr[1])

        });
    }



    // 5. action unknown
    else {
        console.log("I'm not sure what you want me to do....")
        console.log("Try 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says' instead.")

    }

}


// run the function
console.log("You're now trying to " + action)
run(action, search)

//** append function**//
function appendLog(log) {
    fs.appendFile("./log.txt", log + '\r\n', function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Data Logged!");
        }

    });
}