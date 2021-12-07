import { validateDateRange } from './dateValidation';
import { postTripData } from './postToServer';

const handleSubmit = async event => {
    event.preventDefault();
    const city = byId('destination').value;
    const departDate = byId('start-date').value;
    const returnDate = byId('end-date').value;

    console.log(`city = ${city} departing ${departDate} returning ${returnDate}`);
    console.log('form submitted');

    // validate date range
    const datesValidated = validateDateRange(departDate,returnDate);
    if (!datesValidated) {
        throw new Error('Return date must be at least one day later than departure date')
    }

    //if city & dates are validated
    const tripData = await postTripData(city,departDate,returnDate)
    .then(data => {
        console.log(data); // debugging — prints undefined
        return data
    });

    // .then(() => {
    //     // UI update: // add new card to "your trips"
    // });
  
}

export { handleSubmit }
