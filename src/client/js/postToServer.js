import { handleInvalidCity  } from "./inputErrorHandler";

const postTripData = async (city) => {
    console.log('posting city to server & calling API data . . . ');

    const responseOptions = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({city: `${city}`})
    }

    // fetch to server.js POST route
    try {
        await fetch('http://localhost:3000/store-trip-data',responseOptions)
        .then(async tripData => {
            const response = await tripData.json(); // object containing tripData
            console.log(response);
            if (!response.msg) {
                return response
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