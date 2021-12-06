import { photoFetch } from "./photoFetch";
import { weatherFetch } from "./weatherFetch copy";

const handleSubmit = event => {
    event.preventDefault();
    const city = byId('destination').value;
    const departDate = byId('start-date').value;
    const returnDate = byId('end-date').value;

    console.log(`city = ${city} departing ${departDate} returning ${returnDate}`);
    console.log('form submitted');

    await coordinateFetch(city)
    .then(data => {
        weatherFetch(data.latitude,data.longitude);
    })
    .then(data => {
        photoFetch(city);
    })
    .then(() => {
        // update UI
    })
}

export { handleSubmit }
