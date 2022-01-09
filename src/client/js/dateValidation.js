const validateDateRange = (departDate,returnDate) => {
    // console.log('validating dates . . . '); // uncomment for debugging
    
    const dates = [departDate,returnDate]; // save inputs as an array for iteration

    // convert each date string into a data object
    const convertedDates = dates.map( date => {
        // parse date components from string
        let year = date.slice(0,4);
        let month = date.slice(5,7);
        let day = date.slice(8,10);
        if (day[0] === '0') {
            day = day.substring(1,2); // eliminate 0 from start of 1-digit day value
        }
        //convert day, month year to numbers and populate into date object
        let convertedDate = new Date(Number(year),Number(month - 1),Number(day));
        return convertedDate;
    });

    try {
        if (convertedDates[1] > convertedDates[0]) {
            return convertedDates; // array of two dates, evaluates to truthy
        } else {
            // create error message element
            const invalidDatesMsg = document.createElement('div');
            invalidDatesMsg.id='dates-validation';
            invalidDatesMsg.innerHTML='Please select a return date at least one day after your departure.';
            
            // hide city validation message if still in DOM
            if(byId('input-validation') !== null){
                byId('input-validation').remove();
            }

            byId('msg-container').appendChild(invalidDatesMsg); // add error message to DOM
            byId('dates-validation').classList.add('animate__animated','animate__fadeInDown'); // animate error message appearance

            throw new Error('Return date must be at least one day after departure date');
        } 
    } catch(error) {
        return false; // stops rest of form submission chain from proceeding
    }
}

export { validateDateRange }