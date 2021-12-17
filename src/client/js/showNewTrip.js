import { byClass, byId } from "..";
import { loadModalContent } from "./renderModal";
// import { createPopper } from '@popperjs/core';

const addTripCard = data => {

    console.log('adding trip to UI...');
    byClass('trips-panel')[0].style.display = 'block';

    const tripsContainer = byId('trips-container');

    const duration = data.dates.returnDate - data.dates.departDate; // milliseconds
    const tripLength = Math.ceil(duration / (1000 * 60 * 60 * 24)); // days

    const today = new Date();
    const daysToTrip = Math.ceil((data.dates.departDate - today) / (1000 * 60 * 60 * 24));
    const numDays = daysToTrip > 1 ? 'days' : 'day';

    const newCard = document.createElement('div');
    newCard.classList.add('trip-card-holder');
    newCard.innerHTML = `
        <div class="trip-card">
            <p class="countdown"><i class="far fa-calendar-alt"></i> &nbsp; <strong>${daysToTrip}</strong> ${numDays} until...</p>
            <button class="delete-trip"><i class="fas fa-plane-slash">&nbsp;</i></button>
            <p class="destination">${data.location.city}</p>
            <p class="dates">${data.dates.departDate.toLocaleDateString('en-us')} — ${data.dates.returnDate.toLocaleDateString('en-us')} &nbsp; <span id="trip-length">(${tripLength} days)</span></p>
            <div class="city-image" style="background-image: url('${data.photo}');">&nbsp;</div>
            <div class="current-weather-container">&nbsp;</div>
            <p class="current-weather-label">Currently...</p>
            <img class="current-weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.current_weather.icon}.png">
            <p class="current-weather-temp">${Math.round(Number(data.current_weather.temp))}°F</p>
            <p class="current-weather-description">${data.current_weather.description}</p>
            <button class="show-forecast">5-day forecast &nbsp;<i class="fas fa-cloud"></i></button>
            <div class="forecast-tooltip"></div>
            <button class="open-modal">planning details</button>
        </div>
    `;

    // add card to DOM
    tripsContainer.appendChild(newCard);

    // const button = byClass('show-forecast')[0];
    // const tooltip = document.createElement('div');
    // const popperInstance = Popper.createPopper(button, tooltip);

    byClass('delete-trip')[byClass('delete-trip').length-1].addEventListener('click', event => {
        console.log('clicked');
        const thisCard = event.target.parentElement.parentElement.parentElement;
        thisCard.remove();
        if (byClass('trip-card-holder').length === 0) {
            console.log('no trips left');
            byClass('trips-panel')[0].style.display = 'none';
            byId('no-trips').style.display = 'block';
        }
    })

    loadModalContent(data,tripLength);
}

export { addTripCard }