import { conditionalExpression } from "@babel/types";
import { byClass, byId } from "..";

const addTripCard = data => {

    console.log('adding trip to UI...');

    byId('no-trips').style.display = 'none';
    byClass('trips-panel')[0].style.display = 'block';

    const tripsContainer = byId('trips-container');

    const duration = data.dates.returnDate - data.dates.departDate; // milliseconds
    const tripLength = Math.ceil(duration / (1000 * 60 * 60 * 24)); // days
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // console.log(tripLength);

    const newCard = document.createElement('div');
    newCard.classList.add('trip-card-holder');
    newCard.innerHTML = `
        <div class="trip-card">
            <p class="destination">${data.location.city}</p>
            <p class="dates"><strong>${data.dates.departDate.toLocaleDateString('en-us')}</strong> — <strong>${data.dates.returnDate.toLocaleDateString('en-us')}  <span id="trip-length">(${tripLength} days)</span></strong></p>
            <div class="city-image" style="background-image: url('https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png'); background-size: cover; min-height: 120px;">&nbsp;</div>
            <div class="current-weather-container">&nbsp;</div>
            <p class="current-weather-label">Currently...</p>
            <img class="current-weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.current_weather.icon}.png">
            <p class="current-weather-temp">${Math.round(Number(data.current_weather.temp))}°F</p>
            <p class="current-weather-description">${data.current_weather.description}</p>
            <button class="open-modal">View details</button>
        </div>
    `;

    // add card & modal to DOM
    tripsContainer.appendChild(newCard);

    // const newModal = document.createElement('div');
    // newModal.classList.add('trip-card-modal');
    // newModal.style.display='none';
    // newModal.innerHTML = `
    //     <div class="weather-forecast">
    //         <p class="forecast-label">5-Day weather forecast for ${data.location.city}</p>
    //         <p class="forecast-tomorrow"> ${days[new Date(data.forecast_weather.tomorrow.day).getDay() +1]}: High of ${data.forecast_weather.tomorrow.high_temp}°F, Low ${data.forecast_weather.tomorrow.low_temp}°F, ${data.forecast_weather.tomorrow.description}</p>
    //         <p class="forecast-in-two-days"> ${days[new Date(data.forecast_weather.inTwoDays.day).getDay() +1]}: High of ${data.forecast_weather.inTwoDays.high_temp}°F, Low ${data.forecast_weather.inTwoDays.low_temp}°F, ${data.forecast_weather.inTwoDays.description}</p>
    //         <p class="forecast-in-three-days"> ${days[new Date(data.forecast_weather.inThreeDays.day).getDay() +1]}: High of ${data.forecast_weather.inThreeDays.high_temp}°F, Low ${data.forecast_weather.inThreeDays.low_temp}°F, ${data.forecast_weather.inThreeDays.description}</p>
    //         <p class="forecast-in-four-days"> ${days[new Date(data.forecast_weather.inFourDays.day).getDay() +1]}: High of ${data.forecast_weather.inFourDays.high_temp}°F, Low ${data.forecast_weather.inFourDays.low_temp}°F, ${data.forecast_weather.inFourDays.description}</p>
    //         <p class="forecast-in-five-days"> ${days[new Date(data.forecast_weather.inFiveDays.day).getDay() +1]}: High of ${data.forecast_weather.inFiveDays.high_temp}°F, Low ${data.forecast_weather.inFiveDays.low_temp}°F, ${data.forecast_weather.inFiveDays.description}</p>
    //     </div>
    // `;

    byClass('trip-card-modal')[0].innerHTML = `
        <div class="weather-forecast">
            <p class="forecast-label">5-Day weather forecast for ${data.location.city}</p>
            <p class="forecast-tomorrow"> ${days[new Date(data.forecast_weather.tomorrow.day).getDay() +1]}: High of ${data.forecast_weather.tomorrow.high_temp}°F, Low ${data.forecast_weather.tomorrow.low_temp}°F, ${data.forecast_weather.tomorrow.description}</p>
            <p class="forecast-in-two-days"> ${days[new Date(data.forecast_weather.inTwoDays.day).getDay() +1]}: High of ${data.forecast_weather.inTwoDays.high_temp}°F, Low ${data.forecast_weather.inTwoDays.low_temp}°F, ${data.forecast_weather.inTwoDays.description}</p>
            <p class="forecast-in-three-days"> ${days[new Date(data.forecast_weather.inThreeDays.day).getDay() +1]}: High of ${data.forecast_weather.inThreeDays.high_temp}°F, Low ${data.forecast_weather.inThreeDays.low_temp}°F, ${data.forecast_weather.inThreeDays.description}</p>
            <p class="forecast-in-four-days"> ${days[new Date(data.forecast_weather.inFourDays.day).getDay() +1]}: High of ${data.forecast_weather.inFourDays.high_temp}°F, Low ${data.forecast_weather.inFourDays.low_temp}°F, ${data.forecast_weather.inFourDays.description}</p>
            <p class="forecast-in-five-days"> ${days[new Date(data.forecast_weather.inFiveDays.day).getDay() +1]}: High of ${data.forecast_weather.inFiveDays.high_temp}°F, Low ${data.forecast_weather.inFiveDays.low_temp}°F, ${data.forecast_weather.inFiveDays.description}</p>
        </div>
    `;

    // tripsContainer.appendChild(newModal);

    // add event listener to toggle modal for this trip card
    document.querySelectorAll('.open-modal')[document.querySelectorAll('.open-modal').length - 1].addEventListener('click', event => {
        // let thisTripCard = event.target.parentElement;
        // let thisTripHolder = thisTripCard.parentElement;
        byId('app-overlay').style.display='block';
        byId('app-overlay').style.opacity='0.9';
        // thisTripHolder.appendChild(newModal);
        // thisTripCard.nextElementSibling.style.display='block';
        byClass('trip-card-modal')[0].style.display='block';
    })
}

export { addTripCard }