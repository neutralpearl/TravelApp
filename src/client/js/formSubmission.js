import { validateDateRange } from './dateValidation';
// import { postTripData } from './postToServer';
import { handleInvalidCity } from './inputErrorHandler';
import { addTripCard } from './showNewTrip';


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
    let tripDataReceived = false;
    
    try {
        datesValidated = await validateDateRange(departDate,returnDate);
        // console.log('datesValidated = ' + datesValidated); // debugging
        if (!datesValidated) {
            throw new Error('Dates invalid');
        } else {

            // initialize server-side object to store new trip variables
            let newTripData = {};

            // fetch to server.js POST route
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
                    tripDataReceived = true;
                    return newTripData;
                } else {
                    throw new Error('No data retrieved for that city');
                }
            })
            .catch(error => {
                console.log(error);
                handleInvalidCity(); // show error message in UI indicating that data couldn't be retrieved for that city
            });

            if (tripDataReceived) {
                console.log(newTripData);
                addTripCard(newTripData);
            }
        }

    } catch(error) {
        console.log(error);
    }
}

export { handleSubmit }
