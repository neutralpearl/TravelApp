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
// const bodyParser = require("body-parser");
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
        forecast_weather: {
            tomorrow: {},
            inTwoDays: {},
            inThreeDays: {},
            inFourDays: {},
            inFiveDays: {}
        },
        photo: {}
    };

    // GET from geonames
    
    await fetch(`${serverURL}/get-geonames/${tripData.location.city}`)
    .then(coordinates => {
        return coordinates.json();
    })
    .then( data => {
        tripData.coordinates.latitude = data.latitude;
        tripData.coordinates.longitude = data.longitude;
        tripData.location.country_code = data.country_code;

        if (!(typeof tripData.coordinates.latitude === 'undefined')){
            return tripData;
        } else {
            throw new Error('Coordinates not received');
        }
    })
    .catch(error => {
        console.log(error);
        res.send(JSON.stringify({msg: 'city not found'}));
    });
    
    // GET from weatherbit Current Weather API
    await fetch(`${serverURL}/get-weatherbit-current/${tripData.coordinates.latitude}/${tripData.coordinates.longitude}`)
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
    .catch(error => {
        console.log(error);
        res.send(JSON.stringify({msg: 'current weather not found'}));
    });

    // GET weatherbit forecast
    await fetch(`${serverURL}/get-weatherbit-forecast/${tripData.coordinates.latitude}/${tripData.coordinates.longitude}`)
    .then(forecast => {
        return forecast.json();
    })
    .then( data => {
        for (let date in data) {
            tripData.forecast_weather[date].day = data[date].day;
            tripData.forecast_weather[date].high_temp = data[date].high_temp;
            tripData.forecast_weather[date].low_temp = data[date].low_temp;
            tripData.forecast_weather[date].humidity = data[date].humidity;
            tripData.forecast_weather[date].precip = data[date].precip;
            tripData.forecast_weather[date].clouds = data[date].clouds;
            tripData.forecast_weather[date].description = data[date].description;
            tripData.forecast_weather[date].icon = data[date].icon;
        }
        
        if (!(typeof tripData.forecast_weather.tomorrow.day === 'undefined')){
            return tripData;
        } else {
            throw new Error('Weather forecast not received');
        }
    })
    .catch(error => {
        console.log(error);
        res.send(JSON.stringify({msg: 'weather forecast not found'}));
    });

    
    // GET from pixabay

    await fetch(`${serverURL}/get-pixabay-photo/${tripData.location.city}`)
    .then(photo => {
        return photo.json();
    })
    .then( data => {
        tripData.photo = data.url;
        if (!(typeof tripData.photo === 'undefined')){
            return tripData;
        } else {
            console.log('Photo not received');
            // if no photo, add message to data sent to client so other photo can get subbed in
            tripData.msg = 'photo not found';
            return tripData;
        }  
    })
    .then(tripData => {
        allTrips.push(tripData);
        res.send(JSON.stringify(tripData)); // sends object to client
    })
    .catch(error => {
        console.log(error);
        res.send(JSON.stringify({msg: 'Could not send data to client'}));
    });
})

// FETCH COORDINATES
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
        .catch (error => {
            throw new Error('Couldn\'t retrieve city coordinates!');
        })

        // send coordinates to GET route
        res.status(200).send(JSON.stringify(coordinates));

    } catch(error){
        // send error message to GET route
        res.status(200).send(error);
    }
});

// FETCH CURRENT WEATHER
app.get('/get-weatherbit-current/:latitude/:longitude', async (req,res) => {
    const lat = req.params.latitude;
    const lon = req.params.longitude;

    const endpoint = 'http://api.weatherbit.io/v2.0/current';
    const key = process.env.WEATHERBIT_KEY;
    const url = `${endpoint}?key=${key}&lat=${lat}&lon=${lon}&units=I`;

    const weather = {};
    
    try { 
        // GET from Weatherbit Current Weather API
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
        })
        .catch(error => {
            throw new Error('Couldn\'t retrieve current weather!');
        });

        // send weather to GET route
        res.status(200).send(JSON.stringify(weather));

    } catch(error) {
        // send error message to GET route
        res.status(200).send(error);
    }
});

// FETCH FORECAST 
app.get('/get-weatherbit-forecast/:latitude/:longitude', async (req,res) => {
    const lat = req.params.latitude;
    const lon = req.params.longitude;

    const endpoint = 'http://api.weatherbit.io/v2.0/forecast/daily';
    const key = process.env.WEATHERBIT_KEY;
    const url = `${endpoint}?key=${key}&lat=${lat}&lon=${lon}&units=I&days=5`;

    const forecast = {
        tomorrow: {},
        inTwoDays: {},
        inThreeDays: {},
        inFourDays: {},
        inFiveDays: {}
    };
    
    try { 
        // GET from Weatherbit Current Weather API
        await fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let i=0;
            for (let date in forecast) {
                forecast[date].day = json.data[i].valid_date;
                forecast[date].high_temp = json.data[i].high_temp;
                forecast[date].low_temp = json.data[i].low_temp;
                forecast[date].humidity = json.data[i].rh;
                forecast[date].precip = json.data[i].precip;
                forecast[date].clouds = json.data[i].clouds;
                forecast[date].icon = json.data[i].weather.icon;
                forecast[date].description = json.data[i].weather.description;
                i++;
            }
            // console.log(forecast); // works
            return forecast;
        })
        .catch(error => {
            throw new Error('Couldn\'t retrieve weather forecast!');
        });

        // send weather to GET route
        res.status(200).send(JSON.stringify(forecast));

    } catch(error) {
        // send error message to GET route
        res.status(200).send(error);
    }
});

// FETCH PHOTO
app.get('/get-pixabay-photo/:city', async (req, res) => {

    // https://pixabay.com/api/docs/
    // "If you intend to use the images, please download them to your server first."
    const city = req.params.city;
    const endpoint = 'https://pixabay.com/api/';
    const key = process.env.PIXABAY_KEY;

    // https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
    const url = `${endpoint}?key=${key}&q=${city}&image_type=photo`;
    // console.log(url);

    const photo = {};

    try {
        await fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            photo.url = json.hits[1].webformatURL;
            // if (totalHits > 0) {
                
            // } else {
            //     photo.url = 'http://localhost:3000/src/client/media/wing.jpg';
            // }
            return photo;
        })
        .catch(error => {
            throw new Error('Couldn\'t retrieve photo!');
        });

        // send weather to GET route
        res.status(200).send(JSON.stringify(photo));

    } catch(error) {
        // send error message to GET route
        res.status(200).send(error);
    }
})