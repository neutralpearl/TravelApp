import { validateDateRange } from './dateValidation';
// import { postTripData } from './postToServer';
import { handleInvalidCity } from './inputErrorHandler';

const handleSubmit = async event => {
    event.preventDefault();
    const city = byId('destination').value;
    let departDate = byId('start-date').value;
    let returnDate = byId('end-date').value;

    console.log(`city = ${city} departing ${departDate} returning ${returnDate}`);
    console.log('form submitted');

    // validate date range
    const datesValidated = validateDateRange(departDate,returnDate);
    // departDate = datesValidated[0];
    // returnDate = datesValidated[1];
    if (!datesValidated) {
        console.log('Error: Return date must be at least one day later than departure date')
    }
    
    // initialize server-side object to store new trip variables
    let newTripData = {};

    // fetch to server.js POST route
    try {

        //configure POST fetch
        const responseOptions = {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                city: `${city}`,
                departDate: `${departDate}`,
                returnDate: `${returnDate}`
            })
        }

        await fetch('http://localhost:3000/store-trip-data',responseOptions)
        .then(async tripData => {
            // return tripData;
            newTripData = await tripData.json(); 
            // console.log(newTripData); // object containing tripData
            if (!newTripData.msg) {
                return newTripData;
                } else {
                    throw new Error('No data retrieved for that city');
                }
        });
    } catch(error) {
        console.log(error);
        handleInvalidCity();
    }

    console.log(newTripData); // WORKS!
    // needs to be parsed



    //if city & dates are validated
    // try {
    // const newTripData = await postTripData(city,departDate,returnDate)
    // .then (async tripData => {
    //     let data = await tripData.json(); 
    //     return data;
    // });
    // .then(data => {
    //     return data.json();
    // })
    // .then(json => {
    //     newTripData.location.city = json.location.city;
    //     return newTripData;
    // })
    // TRY CHAINING A GET CALL TO SERVER

    // .then(response => {
    //     console.log(response); // debugging — prints undefined
    //     return await response.json();
    // })
    // .then(data => {
    //     console.log(data);
    //     return data;
    // // UI update: // add new card to "your trips"
    // });
    

    // } catch (error) {
    //     console.log(error);
    // }
    
    


  
}

export { handleSubmit }
