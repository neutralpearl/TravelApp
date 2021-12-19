import { byId } from '..';
import { animateValidation } from './manageValidationUI';
import { validateDateRange } from './dateValidation';
import { handleInvalidCity } from './inputErrorHandler';
import { addTripCard } from './showNewTrip';


const handleSubmit = async event => {
    event.preventDefault(); // block default page reload after form submission

    console.log('form submitted . . . '); // debugging
    animateValidation(); // show "verifying your destination" animation while server retrieves data

    // save form inputs
    const city = byId('destination').value;
    let departDate = byId('start-date').value;
    let returnDate = byId('end-date').value;

    let datesValidated = false; // should become truthy only if date range passes validation
    let tripDataReceived = false; // should become truthy only if trip data is retrieved from server
    
    try {
        // make sure return date is after departure
        datesValidated = await validateDateRange(departDate,returnDate);
    
        if (!datesValidated) {
            throw new Error('Dates invalid'); 
        } else {
            
            byId('view-trips').classList.add('animate__animated','animate__pulse'); // pulse animation on trips container
            byId('no-trips').style.display = 'none'; // remove "You don't have any saved trips" placeholder text
            
            let newTripData = {}; // initialize object to store new trip variables

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

            // attempt to get data from server
            await fetch('http://localhost:3000/store-trip-data',responseOptions)
            .then(async tripData => {
                newTripData = await tripData.json(); // object containing tripData
        
                // overwrite dates with objects in lieu of strings
                newTripData.dates.departDate = datesValidated[0];
                newTripData.dates.returnDate = datesValidated[1];
        
                // msg object indicates server-side error
                if (!newTripData.msg) {
                    tripDataReceived = true;
                    return newTripData;
                } else if (newTripData.msg === 'photo not found'){
                    newTripData.noPhoto = 'true'; // add key indicating if no photo could be retrieved
                    console.log(`no photo available for ${newTripData.location.city}`);
                    tripDataReceived = true; // because rest of data is available even if photo is not
                    return newTripData;
                } else {
                    throw new Error('No data retrieved for that city');
                }
            })
            .then(() => {
                if (tripDataReceived) {
                    console.log(newTripData); // for debugging
                    addTripCard(newTripData); // parses retrieved data and adds corresponding trip card
                    byId('view-trips').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); // scrolls window to newly-added trip card
                }
            })
            .catch(error => {
                console.log(error);
                handleInvalidCity(); // show error message in UI indicating that data couldn't be retrieved for that city
            });
        }
    } catch(error) {
        console.log(error);
    }
    
}

export { handleSubmit }
