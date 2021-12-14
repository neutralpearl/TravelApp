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


//===============================================================//

const allTrips = []; // will store all trips posted to server

// create class to store individual trip records
class Trip {
    constructor(city,departDate,returnDate) {
        this.city = city;
        this.departDate = departDate;
        this.returnDate = returnDate;
        this.tripId = ''; // create unique identifier for each trip?
    }
}

// posts city
app.post('/store-trip-data/', async (req, res) => {

    // initialize tripData object, into which API data will be added
    const tripData = {
        location: {
            city: req.body.city
        },
        dates: {
            departDate: req.body.departDate,
            returnDate: req.body.returnDate
        },
        coordinates: {},
        current_weather: {},
        photo: {}
    };

    // GET from geonames
    try {
        await fetch(`${serverURL}/get-geonames/${tripData.location.city}`)
        .then(coordinates => {
            return coordinates.json();
        })
        .then( data => {
            // console.log(data); // prints coordinates!!!
            tripData.coordinates.latitude = data.latitude;
            tripData.coordinates.longitude = data.longitude;
            tripData.location.country_code = data.country_code;

            if (!(typeof tripData.coordinates.latitude === 'undefined')){
                return tripData;
            } else {
                throw new Error('Coordinates not received');
            }
        })

    } catch(error){
        console.log(error);
        res.send(JSON.stringify({msg: 'city not found'}));
    }
    
    // GET from weatherbit Current Weather API
    try {
        await fetch(`${serverURL}/get-weatherbit/${tripData.coordinates.latitude}/${tripData.coordinates.longitude}`)
        .then(weather => {
            return weather.json();
        })
        .then( data => {
            tripData.current_weather.temp = data.temp;
            tripData.current_weather.app_temp = data.app_temp;
            tripData.current_weather.humidity = data.humidity;
            tripData.current_weather.precip = data.precip;
            tripData.current_weather.clouds = data.clouds;
            tripData.current_weather.air_quality = data.air_quality;
            tripData.current_weather.description = data.description;
            tripData.current_weather.icon = data.icon;
            if (!(typeof tripData.current_weather.temp === 'undefined')){
                return tripData;
            } else {
                throw new Error('Current weather not received');
            }
        })
        console.log(tripData); // prints accumulated data to terminal

        // tripData = new Trip; //create new Trip object
        allTrips.push(tripData);
        console.log(allTrips);

        res.send(JSON.stringify(tripData)); // later move to after all tripData has been added to object

    } catch(error) {
        console.log(error);
        res.send(JSON.stringify({msg: 'weather not found'}));
    }

    // GET weatherbit forecast

    // GET weatherbit historical weather

    
    // GET from pixabay
    // try {

    // } catch(error) {
    //     console.log(error);
    //     res.send(JSON.stringify({msg: 'photo not found'}));
    // }
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
        // POST to Geonames 
        try {  
            await fetch(url,responseOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                // retrieve coordinates from response
                coordinates.latitude = json.geonames[0].lat;
                coordinates.longitude = json.geonames[0].lng;
                coordinates.country_code = json.geonames[0].countryCode;
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


app.get('/get-weatherbit/:latitude/:longitude', async (req,res) => {
    const lat = req.params.latitude;
    const lon = req.params.longitude;

    const endpoint = 'http://api.weatherbit.io/v2.0/current';
    const key = process.env.WEATHERBIT_KEY;
    const url = `${endpoint}?key=${key}&lat=${lat}&lon=${lon}&units=I`;

    const weather = {};
    
    try { 
        // GET from Weatherbit Current Weather API
        try {
            await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                weather.temp = json.data[0].temp;
                weather.app_temp = json.data[0].app_temp;
                weather.humidity = json.data[0].rh;
                weather.precip = json.data[0].precip;
                weather.clouds = json.data[0].clouds;
                weather.air_quality = json.data[0].aqi;
                weather.icon = json.data[0].weather.icon;
                weather.description = json.data[0].weather.description;
                return weather;
            });

        } catch(error) {
            throw new Error('Couldn\'t retrieve weather data!');
        }

        // send weather to GET route
        res.status(200).send(JSON.stringify(weather));

    } catch(error) {
        // send error message to GET route
        res.status(200).send(error);
    }
});





// EMBED WITHIN GET ROUTE
// const fetchPhoto = async (city) => {

//     // https://pixabay.com/api/docs/
//     // "If you intend to use the images, please download them to your server first."

//     const endpoint = 'https://pixabay.com/api/';
//     const key = process.env.PIXABAY_KEY;

//     // https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
//     const url = `${endpoint}?key=${key}&q=${city}`;

//     // GET — RESTful API
//     // $.getJSON(URL, function(data){
//     // if (parseInt(data.totalHits) > 0)
//     //     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
//     // else
//     //     console.log('No hits');
//     // });

// };