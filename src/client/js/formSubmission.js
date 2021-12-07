import { postTripData } from './postToServer';
import { getTripData } from './getFromServer';
// import { fetchPhoto } from "./photoFetch";
// import { fetchCoordinates } from "./coordinateFetch";
// import { fetchWeather } from "./weatherFetch";

const handleSubmit = async event => {
    event.preventDefault();
    const city = byId('destination').value;
    const departDate = byId('start-date').value;
    const returnDate = byId('end-date').value;

    console.log(`city = ${city} departing ${departDate} returning ${returnDate}`);
    console.log('form submitted');

    // NEED TO ADD VALIDATION HERE

    //if city & dates are validated
    const tripData = await postTripData(city)
    .then(data => {
        console.log(data); // debugging
        return data
    });

    console.log(tripData); // prints 'undefined'; should be object passed from server
    // .then(() => {
    //     // UI update: // add new card to "your trips"
    // });

    
    // await getTripData(city)
    
    
    // fetches now happening on server side
    // try {
    //     await fetchCoordinates(city)
    //     .then(data => {
    //         fetchWeather(data.latitude,data.longitude);
    //     })
    //     .then(data => {
    //         fetchPhoto(city);
    //     })
    //     .then(() => {
    //         // update UI
    //         console.log('updating UI...')
    //     })
    // } catch(error) {
    //     console.log(error);
    // }    
}

export { handleSubmit }
