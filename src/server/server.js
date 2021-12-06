const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ 
    path: path.resolve(__dirname, "../.env") 
});

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
// note that bodyParser is now included in express: https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4 — app would not work using bodyParser as specified in the starter code
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// save API keys as environmental variables
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY;

// specifies cors headers
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{console.log(`Server running on localhost: ${port}`)});

// empty object gets populated with API data
let API_RESPONSES = {};

// allows client to get data from server
app.get('/', (req, res) => {
    
    const url = req.body.url;
    // res.sendFile('dist/index.html') <-- switch to this for production
    // res.sendFile(path.resolve('src/client/html/index.html'));

    //POST to GEONAMES

    // GET from weathebit
    
    // GET from pixabay

    // store specific data points from API_RESPONSES in another object to update UI


    res.status(200).send(JSON.stringify(TRIP_DATA));
})

app.post('/geonames', (req, res) => {
    res.status(200).send(url,responseOptions);
});



    // const fetchCoordinates = async (city) => {
    //     const endpoint = 'http://api.geonames.org/searchJSON'
    //     const url = `${endpoint}?formatted=true&q=${city}&username=${GEONAMES_USERNAME}`;
    //     const responseOptions = {
    //         method: 'POST',
    //         mode: 'cors',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({url: `${url}`})
    //     }
    //     //https://cors-anywhere.herokuapp.com/

    //     try{
    //         await fetch(url,responseOptions)
    //         .then( response => {
    //             response.json();
    //         })
    //         .then( data => {
    //             console.log(data);
    //             API_RESPONSES.geonames = data;
    //             return data;
    //         })
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }






// // callback functions for GET and POST routes
// const addEntry = (req, res) => {
//     projectData = req.body;
//     res.status(200).send(projectData);
//     console.log(projectData);
// }; 

// const retrieveEntry = (req, res) => {
//     res.status(200).send(JSON.stringify(projectData));
// };

// // POST route (allows app.js to submit new entry to projectData)
// app.post('/add-entry', addEntry);

// // GET route (allows app.js to access projectData)
// app.get('/retrieve-entry', retrieveEntry);

