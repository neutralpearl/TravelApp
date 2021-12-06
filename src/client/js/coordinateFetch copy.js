const fetchCoordinates = async (city) => {

    const endpoint = 'http://api.geonames.org/searchJSON'
    const username = process.env.GEONAMES_KEY;
    const url = `${endpoint}?formatted=true&q=${city}&username=${username}`;

    //http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo

    // http://forum.geonames.org/gforum/posts/list/8.page

    const responseOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: url,
    }

    await fetch(url,responseOptions)
    .then( response => {
        response.json();
    })
    .then( data => {
        console.log(data);
        return data;
    })

    // const geonameResponse = await fetch('/geo-name-locations', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody),
    // });

    // const geonameData = await geonameResponse.json();
    // return geonameData;
}

export { fetchCoordinates }