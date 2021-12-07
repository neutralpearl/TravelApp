// not currently in use...

const getTripData = async () => {
    console.log('getting data from server . . . ');

    // fetch to server.js GET route
    try {
        await fetch('http://localhost:3000/')
        .then(response => {
            console.log(response); // debugging
            response.json();
        })
        .then(data => {
            console.log(data + 'converted to json'); // debugging
            return data;
        })
    } catch(error) {
        console.log(error);
    }
}

export { getTripData }