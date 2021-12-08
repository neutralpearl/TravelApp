import { handleInvalidCity  } from "./inputErrorHandler";

const postTripData = async (city,departDate,returnDate) => {
    console.log('fetching trip data . . . ');

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
    
    // fetch to server.js POST route
    try {
        await fetch('http://localhost:3000/store-trip-data',responseOptions)
        .then(async tripData => {
            // return tripData;
            let newTripData = await tripData.json(); 
            console.log(newTripData); // object containing tripData
            if (!newTripData.msg) {
                // console.log(JSON.stringify(response));

                // TRY POPULATING CLIENT-SIDE 
                // let newTripData = {
                //     location: {city: '', country_code: ''},
                //     dates: {departDate: `${departDate}`, returnDate: `${returnDate}`},
                //     coordinates: { latitude: '', longitude: ''},
                //     current_weather: {},
                //     photo: {}
                // };
                return JSON.stringify(newTripData);
                } else {
                    throw new Error('No data retrieved for that city');
                }
        })
    } catch(error) {
        console.log(error);
        handleInvalidCity();
    }
}

export { postTripData }