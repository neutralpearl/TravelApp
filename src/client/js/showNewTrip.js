import { byClass, byId } from "..";
import { loadModalContent } from "./renderModal";

const addTripCard = async data => {

    console.log('adding trip to UI...');
    byClass('trips-panel')[0].style.display = 'block';

    const tripsContainer = byId('trips-container');

    const duration = data.dates.returnDate - data.dates.departDate; // milliseconds
    const tripLength = Math.ceil(duration / (1000 * 60 * 60 * 24)); // days

    const today = new Date();
    const daysToTrip = Math.ceil((data.dates.departDate - today) / (1000 * 60 * 60 * 24));
    const numDays = (daysToTrip === 1) ? 'day' : 'days';

    const newCard = document.createElement('div');
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

    // add card to DOM
    tripsContainer.appendChild(newCard);

    if (daysToTrip === 0) {
        byClass('countdown')[byClass('countdown').length-1].innerHTML = `<i class="far fa-calendar-alt" style="color: #79d55b;"></i><strong> &nbsp; Departing <em>today!</em></strong>`;
    } else if (daysToTrip < 0 && today < data.dates.returnDate){
        byClass('countdown')[byClass('countdown').length-1].innerHTML = `<i class="far fa-calendar-alt" style="color: #ffb14a;"></i><strong> &nbsp; <em>Trip in progress</em></strong>`;
    } else if (daysToTrip < 0 && today > data.dates.returnDate){
        byClass('countdown')[byClass('countdown').length-1].innerHTML = `<i class="far fa-calendar-alt" style="color: rgb(182, 0, 0);"></i> &nbsp; Trip concluded`;
    }

    if(data.noPhoto === 'true') {
        byClass('city-image')[byClass('city-image').length-1].style.backgroundImage = `url('http://localhost:3000/src/client/media/wing.jpg')`;
    }
    
    // add click listener for delete-trip button
    byClass('delete-trip')[byClass('delete-trip').length-1].addEventListener('click', event => {
        const thisCard = event.target.parentElement.parentElement.parentElement;
        thisCard.remove();
        if (byClass('trip-card-holder').length === 0) {
            console.log('no trips left');
            byClass('trips-panel')[0].style.display = 'none';
            byId('no-trips').style.display = 'block';
        }
    })

    byClass('add-itinerary')[byClass('add-itinerary').length-1].addEventListener('click', event => {
        //show overlay & darken to cover background
        byId('app-overlay').style.display='block';
        byId('app-overlay').style.opacity='0.9';

        // populate modal with content specific to this trip
        byClass('itinerary-modal')[0].innerHTML = `
            <div class="modal-body">
                
                <div class="modal-header">
                    <button class="close-modal"><i class="fas fa-times">&nbsp;</i></button>
                    
                </div>
                <form class="itinerary">
                    <p class="modal-section-label" id="itinerary-title">Itinerary details for your trip to ${data.location.city}</p>
                    <label class="label-detail" id="label-hotel" for="hotel">Hotel or AirBnB</label>
                    <input type="text" id="hotel">
                    <div class="travel-methods">
                        <button class="travel-method"><i class="fas fa-plane">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-train">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-bus-alt">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-car">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-anchor">&nbsp;</i></button>
                    </div>
                    
                    <label class="label-detail" id="label-departing-flight" for="departing-flight">departure travel details</label>
                    <input type="text" id="departure-details">
                    <div class="travel-methods">
                        <button class="travel-method"><i class="fas fa-plane">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-train">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-bus-alt">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-car">&nbsp;</i></button>
                        <button class="travel-method"><i class="fas fa-anchor">&nbsp;</i></button>
                    </div>
                    <label class="label-detail" id="label-departing-flight" for="departing-flight">Return travel details</label>
                    <input type="text" id="return-details">
                    <textarea>
                </form>
            </div>
        `;

        // show modal
        byClass('itinerary-modal')[0].style.display='block';

        // add event listener to close-modal button
        byClass('close-modal')[0].addEventListener('click', event => {
            byId('app-overlay').style.display='none';
            byClass('itinerary-modal')[0].style.display='none';
        });
    })


    loadModalContent(data,tripLength);
}

export { addTripCard }