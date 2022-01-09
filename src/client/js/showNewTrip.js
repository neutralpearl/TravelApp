import { byClass, byId } from "..";
import { prepareItineraryForm } from "./renderItineraryForm";
import { loadModalContent } from "./renderModal";

const addTripCard = async data => {

    // console.log('adding trip to UI...'); // uncomment for debugging
    byClass('trips-panel')[0].style.display = 'block'; //

    const duration = data.dates.returnDate - data.dates.departDate; // returns time difference in milliseconds
    const tripLength = Math.ceil(duration / (1000 * 60 * 60 * 24)); // returns time difference in days

    const today = new Date(); // save today's date for countdown 
    const daysToTrip = Math.ceil((data.dates.departDate - today) / (1000 * 60 * 60 * 24)); // returns countdown to departure in days
    const numDays = (daysToTrip === 1) ? 'day' : 'days'; // ensures correct syntax for countdown message

    const newCard = document.createElement('div'); // add new div element for trip card
    newCard.classList.add('trip-card-holder');
    newCard.innerHTML = `
        <div class="trip-card">
            <p class="countdown"><i class="far fa-calendar-alt"></i> &nbsp; <strong>${daysToTrip}</strong> ${numDays} until...</p>
            <button class="delete-trip" title="delete trip"><i class="fas fa-plane-slash">&nbsp;</i></button>
            <img class="country-flag" src="https://flagcdn.com/24x18/${data.location.country_code.toLowerCase()}.png">
            <p class="destination">${data.location.city}</p>
            <p class="dates">${data.dates.departDate.toLocaleDateString('en-us')} — ${data.dates.returnDate.toLocaleDateString('en-us')} &nbsp; <span id="trip-length">(${tripLength} days)</span></p>
            <div class="city-image" style="background-image: url('${data.photo}');">&nbsp;</div>
            <div class="current-weather-container">&nbsp;</div>
            <p class="current-weather-label">Currently...</p>
            <img class="current-weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.current_weather.icon}.png">
            <p class="current-weather-temp">${Math.round(Number(data.current_weather.temp))}°F</p>
            <p class="current-weather-description">${data.current_weather.description}</p>
            <div class="forecast-tooltip"></div>
            <button class="add-itinerary"><i class="far fa-edit"></i> &nbsp; add itinerary details</button>
            <button class="open-modal">view trip PDF</button>
        </div>
    `;

    // add card to DOM as child of trip container element
    byId('trips-container').appendChild(newCard);

    // adjusts countdown messaging based on trip dates
    if (daysToTrip === 0) {
        byClass('countdown')[byClass('countdown').length-1].innerHTML = `<i class="far fa-calendar-alt" style="color: #79d55b;"></i><strong> &nbsp; Departing <em>today!</em></strong>`;
    } else if (daysToTrip < 0 && today < data.dates.returnDate){
        byClass('countdown')[byClass('countdown').length-1].innerHTML = `<i class="far fa-calendar-alt" style="color: #ffb14a;"></i><strong> &nbsp; <em>Trip in progress</em></strong>`;
    } else if (daysToTrip < 0 && today > data.dates.returnDate){
        byClass('countdown')[byClass('countdown').length-1].innerHTML = `<i class="far fa-calendar-alt" style="color: rgb(182, 0, 0);"></i> &nbsp; Trip concluded`;
    }

    // replaces city image with generic travel image if not retrieved from Pixabay
    if(data.noPhoto === 'true') {
        byClass('city-image')[byClass('city-image').length-1].style.backgroundImage = `url('/assets/wing.jpg')`;
    }
    
    // add click listener for "delete trip" button
    byClass('delete-trip')[byClass('delete-trip').length-1].addEventListener('click', event => {
        const thisCard = event.target.parentElement.parentElement.parentElement;
        thisCard.remove();
        if (byClass('trip-card-holder').length === 0) {
            console.log('no trips left');
            byClass('trips-panel')[0].style.display = 'none';
            byId('no-trips').style.display = 'block';
        }
    })

    // add event listener to "add itinerary" button
    byClass('add-itinerary')[byClass('add-itinerary').length-1].addEventListener('click', event => {
        prepareItineraryForm(data,itineraryData);
    });
    
    loadModalContent(data,tripLength);
}

export { addTripCard }