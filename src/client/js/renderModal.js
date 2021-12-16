import { byClass } from "..";

const loadModalContent = (data,tripLength) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    const weatherbitIconURLBase='https://www.weatherbit.io/static/img/icons/';

    byClass('trip-card-modal')[0].innerHTML = `
        <div class="modal-body">
            <div class="modal-header">
                <div class="title">
                    <h2>your trip to ${data.location.city}</h2>
                </div>
                <button class="print"><i class="fas fa-print">&nbsp;</i></button>
                <button class="close-modal"><i class="fas fa-times">&nbsp;</i></button>
                <p class="modal-dates"><strong>${data.dates.departDate.toLocaleDateString('en-us')}</strong> — <strong>${data.dates.returnDate.toLocaleDateString('en-us')}</strong></p>
            </div>
            <p>${tripLength} days, ${tripLength -1} nights</p>
            <div class="weather-forecast">   
                <p class="forecast-label">5-Day weather forecast</p>
                <div class="days-row">
                    <p class="weekday">${days[new Date(data.forecast_weather.tomorrow.day).getDay()]}</p>
                    <p class="weekday">${days[new Date(data.forecast_weather.inTwoDays.day).getDay()]}</p>
                    <p class="weekday">${days[new Date(data.forecast_weather.inThreeDays.day).getDay()]}</p>
                    <p class="weekday">${days[new Date(data.forecast_weather.inFourDays.day).getDay()]}</p>
                    <p class="weekday">${days[new Date(data.forecast_weather.inFiveDays.day).getDay()]}</p> 
                </div>
                <div class="icons-row">
                    <img class="forecast-icon" src="${weatherbitIconURLBase}${data.forecast_weather.tomorrow.icon}.png">
                    <img class="forecast-icon" src="${weatherbitIconURLBase}${data.forecast_weather.inTwoDays.icon}.png">
                    <img class="forecast-icon" src="${weatherbitIconURLBase}${data.forecast_weather.inThreeDays.icon}.png">
                    <img class="forecast-icon" src="${weatherbitIconURLBase}${data.forecast_weather.inFourDays.icon}.png">
                    <img class="forecast-icon" src="${weatherbitIconURLBase}${data.forecast_weather.inFiveDays.icon}.png">
                </div>
                <div class="temps-row">
                    <p class="temp-high">High: <span>${data.forecast_weather.tomorrow.high_temp}</span>°F</p>
                    <p class="temp-low">Low: <span>${data.forecast_weather.tomorrow.low_temp}</span>°F</p>
                    <p class="temp-high"> High: <span>${data.forecast_weather.inTwoDays.high_temp}</span>°F</p>
                    <p class="temp-low">Low: <span>${data.forecast_weather.inTwoDays.low_temp}</span>°F</p>
                    <p class="temp-high">High: <span>${data.forecast_weather.inThreeDays.high_temp}</span>°F</p>
                    <p class="temp-low">Low: <span>${data.forecast_weather.inThreeDays.low_temp}</span>°F</p>
                    <p class="temp-high"> High: <span>${data.forecast_weather.inFourDays.high_temp}</span>°F</p>
                    <p class="temp-low">Low: <span>${data.forecast_weather.inFourDays.low_temp}</span>°F</p>
                    <p class="temp-high">High: <span>${data.forecast_weather.inFiveDays.high_temp}</span>°F</p>
                    <p class="temp-low">Low: <span>${data.forecast_weather.inFiveDays.low_temp}</span>°F</p>
                </div>
                <div class="desc-row">
                    <p class="forecast-desc">${data.forecast_weather.tomorrow.description}</p>
                    <p class="forecast-desc">${data.forecast_weather.inTwoDays.description}</p>
                    <p class="forecast-desc"> ${data.forecast_weather.inThreeDays.description}</p>
                    <p class="forecast-desc">${data.forecast_weather.inFourDays.description}</p>
                    <p class="forecast-desc">${data.forecast_weather.inFiveDays.description}</p>
                </div>
            </div>
        </div>
    `;

    byClass("close-modal")[0].addEventListener('click', event => {
        byId('app-overlay').style.display='none';
        byClass('trip-card-modal')[0].style.display='none';
    });
    

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

export { loadModalContent }