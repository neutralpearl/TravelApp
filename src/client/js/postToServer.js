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
    // try {
    await fetch('http://localhost:3000/store-trip-data',responseOptions)
    .then(async tripData => {
        const response = await tripData.json(); // Promise
        console.log(response);
        return response;
    })

    // .then(data => {
    //     // const city = data.Object.city;
    //     // console.log(city); // debugging
    //     return data;
    // })
    // } catch(error) {
    //     console.log(error);
    // }
}

export { postTripData }