const validateDateRange = (departDate,returnDate) => {
    console.log('validating dates . . . ');
    
    
    const dates = [departDate,returnDate];
    const convertedDates = dates.map( date => {
        let year = date.slice(0,4);
        let month = date.slice(5,7);
        let day = date.slice(8,10);
        if (day[0] === '0') {
            day = day.substring(1,2);
        }
        date = `${month}/${day}/${year}`;
        return date;
    });
    const today = new Date().toLocaleDateString('en-us');

    console.log('departure: ' + convertedDates[0] + ', return: ' + convertedDates[1] + ', today: ' + today); // debugging

    try {
        // NOT WORKING!
        if (convertedDates[0] > today && convertedDates[1] > convertedDates[0]) {
            return convertedDates;
        } else if (convertedDates[0] < today) {
            throw new Error('Departure date cannot be earlier than today');
        } else if (convertedDates[1] <= convertedDates[0]) {
            throw new Error('Return date must be at least one day after departure date');
        }
    } catch(error) {
        console.log(error);
        return false;
    }
}

export { validateDateRange }