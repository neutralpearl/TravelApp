const path = require('path');
const dotenv = require('dotenv');
const fetch = require('cross-fetch');
dotenv.config({ 
    path: path.resolve(__dirname, "../.env") 
});

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
// configure Express
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// save API keys as environmental variables
const GEONAMES_KEY = process.env.GEONAMES_KEY;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY;

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// specifies cors headers
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

// Setup Server
const port = 3000;
const server = app.listen(port, () => {console.log(`Server running on localhost: ${port}`)});

const serverURL = `http://localhost:${port}`;

////////////////////////////////////////////

const allTrips = {}; // will store all trips posted to server

// posts city
app.post('/store-trip-data/', async (req, res) => {

    // initialize tripData object, into which API data will be added
    const tripData = {city: req.body.city};

    // GET from geonames
    try {
        await fetch(`${serverURL}/get-geonames/${tripData.city}`)
        .then(coordinates => {
            return coordinates.json();
        })
        .then( data => {
            // console.log(data); // prints coordinates!!!
            tripData.latitude = data.latitude;
            tripData.longitude = data.longitude;
            if (!(typeof tripData.latitude === 'undefined')){
                return tripData;
            } else {
                throw new Error('Coordinates not received');
            }
        })
        console.log(tripData); // prints accumulated data to terminal

        res.send(JSON.stringify(tripData)); // later move to after all tripData has been added to object

    } catch(error){
        console.log(error);
        res.send(JSON.stringify({msg: 'city not found'}));
    }
    
    // GET from weathebit
    
    // GET from pixabay

    
})

// :city becomes req.params: {"city": <city>}
app.get('/get-geonames/:city', async (req,res) => {
    
    const city = req.params.city;
    const endpoint = 'http://api.geonames.org/searchJSON'
    const username = GEONAMES_KEY;
    const url = `${endpoint}?formatted=true&maxRows=5&q=${city}&username=${username}`;

    const responseOptions = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: `${url}`})
    }

    //initialize empty object
    const coordinates = {};

    try {
        // POST to Geonames & retrieve coordinates from response
        try {  
            await fetch(url,responseOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                coordinates.latitude = json.geonames[0].lat;
                coordinates.longitude = json.geonames[0].lng;
                // console.log(`coordinates = ${JSON.stringify(coordinates)}`); 
                return coordinates;
            })
        } catch(error) {
            throw new Error('Couldn\'t retrieve city coordinates!');
        }

        // send coordinates to GET route
        res.status(200).send(JSON.stringify(coordinates));

    } catch(error){

        // send error message to GET route
        res.status(200).send(error);
    }
});



// EMBED WITHIN GET ROUTE
const fetchWeather = async (latitude,longitude) => {
    const endpoint = 'http://api.weatherbit.io/v2.0/current';
    const key = process.env.WEATHERBIT_KEY;

    // Get observation by lat/lon (Recommended)	lat,lon	&lat=38.123&lon=-78.543
    // Get observation by city name	city, state(optional), country (optional) // &city=Raleigh&country=US // &city=Raleigh,NC // &city=Raleigh,North+Carolina
    // example url : https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely

    const url = `${endpoint}?key=${key}&lat=${latitude}&lon=${longitude}`;

    await fetch(url)
    .then(response => {
        response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
}

// EMBED WITHIN GET ROUTE
const fetchPhoto = async (city) => {

    // https://pixabay.com/api/docs/
    // "If you intend to use the images, please download them to your server first."

    const endpoint = 'https://pixabay.com/api/';
    const key = process.env.PIXABAY_KEY;

    // https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
    const url = `${endpoint}?key=${key}&q=${city}`;

    // GET — RESTful API
    // $.getJSON(URL, function(data){
    // if (parseInt(data.totalHits) > 0)
    //     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
    // else
    //     console.log('No hits');
    // });

}