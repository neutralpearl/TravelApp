import { validateDateRange } from './dateValidation';
// import { postTripData } from './postToServer';
import { handleInvalidCity } from './inputErrorHandler';


// helper function
// const checkDates = async (departDate,returnDates) => {
//     // validate date range
//     datesValidated = await validateDateRange(departDate,returnDate);
//     console.log('datesValidated = ' + datesValidated);
// }

const handleSubmit = async event => {
    event.preventDefault();
    const city = byId('destination').value;
    let departDate = byId('start-date').value;
    let returnDate = byId('end-date').value;

    // console.log(`city = ${city} departing ${departDate} returning ${returnDate}`); // debugging
    console.log('form submitted . . . ');

    let datesValidated = false; // initalize to false; should be truthy only if date range passes validation
    try {
        datesValidated = await validateDateRange(departDate,returnDate);
        // console.log('datesValidated = ' + datesValidated); // debugging
        if (!datesValidated) {
            throw new Error('Dates invalid');
        } else {

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
                        departDate: `${datesValidated[0]}`,
                        returnDate: `${datesValidated[1]}`
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


        }

    } catch(error) {
        console.log(error);
    }

    
    
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
