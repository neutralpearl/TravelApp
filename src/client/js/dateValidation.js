const validateDateRange = (departDate,returnDate) => {
    console.log('validating dates . . . ');
    
    const dates = [departDate,returnDate];

    // convert date strings into objects
    const convertedDates = dates.map( date => {
        let year = date.slice(0,4);
        let month = date.slice(5,7);
        let day = date.slice(8,10);
        if (day[0] === '0') {
            day = day.substring(1,2);
        }
        //convert day, month year to numbers and populate into date object
        let convertedDate = new Date(Number(year),Number(month - 1),Number(day));
        return convertedDate;
    });

    try {
        if (convertedDates[1] > convertedDates[0]) {
            return convertedDates; // array of two dates, evaluates to truthy
        } else {
            const invalidDatesMsg = document.createElement('div');
            invalidDatesMsg.id='dates-validation';
            invalidDatesMsg.innerHTML='Please select a return date at least one day after your departure.';
            
            // get rid of validation message
            if(byId('input-validation') !== null){
                byId('input-validation').remove();
            }

            byId('msg-container').appendChild(invalidDatesMsg);
            byId('dates-validation').classList.add('animate__animated','animate__fadeInDown');

            throw new Error('Return date must be at least one day after departure date');


        } 
    } catch(error) {
        console.log(error);
        return false;
    }
}

export { validateDateRange }