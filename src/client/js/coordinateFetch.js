const fetchCoordinates = async (city) => {

    const endpoint = 'http://api.geonames.org/searchJSON'
    // const username = process.env.GEONAMES_KEY;
    const username = 'neutralpearl';
    const url = `${endpoint}?formatted=true&q=${city}&username=${username}`;

    const responseOptions = {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: `${url}`})
    }
    // proxy: https://cors-anywhere.herokuapp.com/

    try{
        await fetch(url,responseOptions)
        .then( response => {
            return response.json();
        })
        .then( data => {
            console.log(data);
            return data;
        })
    } catch(error) {
        console.log(error);
    }
}

export { fetchCoordinates }