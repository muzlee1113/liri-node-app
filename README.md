# Liri

## Getting Started

Liri is a node.js application that take in the search request of concerts, songs, movies from the user and return them with related information. 
The whole application runs in terminal.
Let's checkout this [demo](https://drive.google.com/file/d/1Mf1upAAAR5FbwtBLMYdhdRar7QD86CRD/view) to see what it is for.

### Prerequisites

To get started please first follow the steps below

1. Clone the whole repository and get into the directory in your terminal.
2. In your terminal, type in  `npm install`  to set up all the required modules.
   For example, **axios**, **dotenv**, **inquirer**, **moment**, **node-spotify-api**.


## How to use it

In your terminal, type in  `node liri.js`  to start the whole application.
Then you'll see four options which are the four functions of the application: 
- `concert-this`
  - this function is for searching information of concert or activity for certain artist or band, what you should do is:
    - select the first choice "concert-this" in the first prompt
    - input the name of the artist or band you're looking for in the second prompt
    - information will then show in the terminal
- `spotify-this-song`
  - this function is for searching information of a specific song, what you should do is:
    - select the second choice "spotify-this-song" in the first prompt
    - input the name of the song you're looking for in the second prompt
    - information will then show in the terminal
- `movie-this`
  - this function is for searching information of a specific movie, what you should do is:
    - select the third choice "movie-this" in the first prompt
    - input the name of the movie you're looking for in the second prompt
    - information will then show in the terminal
- `do-what-it-says`
    - this function is going to grab the command saved in the random.txt file and run it, what you should do is:
      - select the fourth choice "do-what-it-says" in the first prompt
      - the command and the information will then show in the terminal

Additionally, what you do in the terminal will be logged in the `log.txt` file. You can open and find them there.


## Built With

* [BandsinTown](http://www.artists.bandsintown.com/bandsintown-api) - API that search for concert, used in `concert-this`
* [Node Spotify](https://www.npmjs.com/package/node-spotify-api) - A simple to use API library for the Spotify REST API, used in `spotify-this-song`
* [OMDb](http://www.omdbapi.com/) - OMDb API that search for movie info, used in `movie-this`
* [Axio](https://www.npmjs.com/package/axios) - Promise based HTTP client for node.js to make API request, used in `concert-this` & `movie-this`
* [Moment](https://www.npmjs.com/package/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates, used in `concert-this`


## Authors

* **Yuwen Li** - *Initial work* - [Github](https://github.com/muzlee1113)

