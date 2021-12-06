const weatherFetch = async (latitude,longitude) => {
    const endpoint = 'http://api.weatherbit.io/v2.0/current';
    const key = process.env.WEATHERBIT_KEY;

    // Get observation by lat/lon (Recommended)	lat,lon	&lat=38.123&lon=-78.543
    // Get observation by city name	city, state(optional), country (optional) // &city=Raleigh&country=US // &city=Raleigh,NC // &city=Raleigh,North+Carolina
    // example url : https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely

    const url = `${endpoint}?key=${key}&lat=${latitude}&lon=${longitude}`;

    await fetch(url)
    .then(response => {
        response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
}

export { weatherFetch }