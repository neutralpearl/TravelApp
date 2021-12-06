import { fetchPhoto } from "./photoFetch";
import { fetchCoordinates } from "./coordinateFetch";
import { fetchWeather } from "./weatherFetch";

const handleSubmit = async event => {
    event.preventDefault();
    const city = byId('destination').value;
    const departDate = byId('start-date').value;
    const returnDate = byId('end-date').value;

    console.log(`city = ${city} departing ${departDate} returning ${returnDate}`);
    console.log('form submitted');

    try {
        await fetchCoordinates(city)
        .then(data => {
            fetchWeather(data.latitude,data.longitude);
        })
        .then(data => {
            fetchPhoto(city);
        })
        .then(() => {
            // update UI
            console.log('updating UI...')
        })
    } catch(error) {
        console.log(error);
    }    
}

export { handleSubmit }
