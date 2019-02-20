//set any environment variables with the dotenv package
require("dotenv").config();

//require the keys.js file 
var keys = require("./keys.js");
//require the all modules
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
var inquirer = require("inquirer");


//access key info of spotify and save it in a variable
var spotify = new Spotify(keys.spotify);

// global variables for action and search
var actionG
var searchG

// create variables to save log
var logAction = ""
var logData = {}


//get action and search from prompt
// constructor function used to create programmers objects
function Liri(action, search) {
    this.action = action;
    this.search = search;
    // creates a function to see which command is selected and run its function
    this.selector = function () {

        if (this.action === "concert-this") {
            this.bandsintown()
            logAction = this.action + `,"` + this.search + `"`
            appendLog(logAction)
        } else if (this.action === "spotify-this-song") {
            this.spotify()
            logAction = this.action + `,"` + this.search + `"`
            appendLog(logAction)
        } else if (this.action === "movie-this") {
            this.movie()
            logAction = this.action + `,"` + this.search + `"`
            appendLog(logAction)
        } else if (this.action === "do-what-it-says") {
            this.random()
        } else {
            console.log("I'm not sure what you want me to do....")
        }
    }

    // 1. concert-this (node liri.js concert-this <artist/band name here>)
    this.bandsintown = function () {
        //if action is concert-this
        if (this.search !== undefined) {
            // set queryUrl for OMDb
            var artist = this.search.split(" ").join('+');
            var artistDisplay = this.search
            var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

            // Run a request with axios to the OMDB API with the movie specified
            axios.get(queryUrl).then(
                function (response) {
                    // The artist's or band's name 
                    console.log("For '" + artistDisplay + "'. \nInformation is as below:");
                    // Name of the venue + Venue location
                    console.log("* Venue: " + response.data[0].venue.name + " at " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                    // Date of the Event (use moment to format this as "MM/DD/YYYY")
                    var dateDisplay = moment(response.data[0].datetime).format("MM/DD/YYYY");
                    console.log("* Date:  " + dateDisplay);
                    //save  return data in logData
                    logData = {
                        "Artist(s)": artistDisplay,
                        "Venue": response.data[0].venue.name + " at " + response.data[0].venue.city + ", " + response.data[0].venue.region,
                        "Date": dateDisplay
                    }
                    //append log
                    appendLog(JSON.stringify(logData))
                })

        } else {

        }
    }
    // 2. spotify-this-song(node liri.js spotify-this-song '<song name here>')
    this.spotify = function () {
        if (this.search !== undefined) {
            //Then search on spotify using with promises
            spotify
                .search({ type: 'track', query: this.search })
                .then(function (response) {

                    // This will show the following information about the song in your terminal/bash window
                    // The song's name and Artist(s)
                    console.log("For '" + response.tracks.items[0].name + "'. \nInformation is as below:");
                    // Artist(s)
                    console.log("* Artist(s): " + response.tracks.items[0].artists[0].name);
                    // The album that the song is from
                    console.log("* Album:     " + response.tracks.items[0].album.name);
                    // A preview link of the song from Spotify
                    console.log("* Link:      " + response.tracks.items[0].external_urls.spotify);
                    //save  return data in logData
                    logData = {
                        "Artist(s)": response.tracks.items[0].artists[0].name,
                        "Album": response.tracks.items[0].album.name,
                        "Link": response.tracks.items[0].external_urls.spotify
                    }
                    //append log
                    appendLog(JSON.stringify(logData))
                })
                .catch(function (err) {
                    console.log(err);
                });
            // If no song is provided then your program will default to "The Sign" by Ace of Base.
        } else {
            console.log("But I need a song's name, such as 'The Sign'. \nInformation will be listed as follows")
            // Artist(s)
            console.log("* Artist(s): Ace of Base");
            // The album that the song is from
            console.log("* Album:     The Sign (US Album) [Remastered]");
            // A preview link of the song from Spotify
            console.log("* Link:      https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        }
    }

    // 3. movie-this (node liri.js movie-this '<movie name here>')
    this.movie = function () {
        // If the user give a movie then return the info
        if (this.search !== undefined) {

            // set queryUrl for OMDb
            var movie = this.search.split(" ").join('+');
            var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

            // Run a request with axios to the OMDB API with the movie specified
            axios.get(queryUrl).then(
                function (response) {
                    // This will output the following information to your terminal/bash window:
                    //   * Title of the movie.
                    console.log("For '" + response.data.Title + "'. \nInformation is as below:");
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

                    //save  return data in logData
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
                    appendLog(JSON.stringify(logData))

                },

                function (err) {
                    console.log("Some errors showed up!", err)
                },


            );

            // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        } else {
            console.log("But I need a movie's name, such as 'Mr. Nobody'. \nInformation will be listed as follows")
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
    this.random = function () {

        //read the random.txt file
        var data = fs.readFileSync("./random.txt", "utf8")

        // We will then print the contents of data
        console.log("I got the command: " + data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        //update this val and this search
        this.action = dataArr[0]
        this.search = dataArr[1]
        // We will then re-display the content as an array for later use.
        console.log("So you're now trying to " + dataArr[0]);

        //run the selctor function again
        this.selector()
    }

}


// runs inquirer and asks the user a series of questions whose replies are
// stored within the variable answers inside of the .then statement.
inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "action",
    },
]).then(function (answers) {
    actionG = answers.action
    if (answers.action !== "do-what-it-says") {
        inquirer.prompt([
            {
                type: "input",
                message: "What artist/song/movie you're looking for?",
                name: "search",
            },
        ]).then(function (answers) {
            // initializes the variable liri to be a new object which will take in all of the user's answers to the questions above
            var liri = new Liri(actionG, answers.search);
            console.log("You're now trying to " + actionG)
            liri.selector()
        })
    } else {
        // initializes the variable liri to be a new object which will take in all of the user's answers to the questions above
        var liri = new Liri(actionG, undefined);
        console.log("You're now trying to " + answers.action)
        liri.selector()
    }
});

//run the .run function

//** append function**//
function appendLog(log) {
    fs.appendFile("./log.txt", log + '\r\n', function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }


    });
}