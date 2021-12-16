import { loadModalContent } from "./renderModal";

const addTripCard = data => {

    console.log('adding trip to UI...');

    byId('no-trips').style.display = 'none';
    byClass('trips-panel')[0].style.display = 'block';

    const tripsContainer = byId('trips-container');

    const duration = data.dates.returnDate - data.dates.departDate; // milliseconds
    const tripLength = Math.ceil(duration / (1000 * 60 * 60 * 24)); // days
    // console.log(tripLength);

    const newCard = document.createElement('div');
    newCard.classList.add('trip-card-holder');
    newCard.innerHTML = `
        <div class="trip-card">
            <p class="destination">${data.location.city}</p>
            <p class="dates">${data.dates.departDate.toLocaleDateString('en-us')} — ${data.dates.returnDate.toLocaleDateString('en-us')} &nbsp; <span id="trip-length">(${tripLength} days)</span></p>
            <div class="city-image" style="background-image: url('https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png');">&nbsp;</div>
            <div class="current-weather-container">&nbsp;</div>
            <p class="current-weather-label">Currently...</p>
            <img class="current-weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.current_weather.icon}.png">
            <p class="current-weather-temp">${Math.round(Number(data.current_weather.temp))}°F</p>
            <p class="current-weather-description">${data.current_weather.description}</p>
            <button class="show-forecast">5-day forecast</button>
            <button class="open-modal">trip planning details</button>
        </div>
    `;

    // add card to DOM
    tripsContainer.appendChild(newCard);

    loadModalContent(data,tripLength);
}

export { addTripCard }