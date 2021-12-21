import { byClass } from "..";

const loadModalContent = (data,tripLength) => {
    // allows parsing date from date string
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const weatherbitIconURLBase='https://www.weatherbit.io/static/img/icons/';

    // add event listener to open modal for this trip card
    document.querySelectorAll('.open-modal')[document.querySelectorAll('.open-modal').length - 1].addEventListener('click', event => {
        //show overlay & darken to cover background
        byId('app-overlay').style.display='block';
        byId('app-overlay').style.opacity='0.9';

        // populate modal with content specific to this trip
        byClass('trip-card-modal')[0].innerHTML = `
            <div class="modal-body">
                <div class="modal-header">
                    <div class="title">
                        <h2>your trip to ${data.location.city}</h2>
                    </div>
                    <button class="print" disabled title="Printing not currently supported"><i class="fas fa-print">&nbsp;</i></button>
                    <button class="close-modal" id="close-pdf"><i class="fas fa-times">&nbsp;</i></button>
                    <p class="modal-dates"><strong>${data.dates.departDate.toLocaleDateString('en-us')}</strong> — <strong>${data.dates.returnDate.toLocaleDateString('en-us')}</strong> &nbsp; (${tripLength} days, ${tripLength -1} nights)</p>
                </div>
                <div class="weather-forecast">   
                    <p class="modal-section-label">5-Day weather forecast</p>
                    <div class="days-row">
                        <p class="weekday">${days[new Date(data.forecast_weather.tomorrow.day).getDay()]}</p>
                        <p class="weekday">${days[new Date(data.forecast_weather.inTwoDays.day).getDay()]}</p>
                        <p class="weekday">${days[new Date(data.forecast_weather.inThreeDays.day).getDay()]}</p>
                        <p class="weekday">${days[new Date(data.forecast_weather.inFourDays.day).getDay()]}</p>
                        <p class="weekday">${days[new Date(data.forecast_weather.inFiveDays.day).getDay()]}</p> 
                    </div>
                    <div class="dates-row">
                        <p class="calendar-date">${months[new Date(data.forecast_weather.tomorrow.day).getMonth()]} ${new Date(data.forecast_weather.tomorrow.day).getDate() +1}</p>
                        <p class="calendar-date">${months[new Date(data.forecast_weather.inTwoDays.day).getMonth()]} ${new Date(data.forecast_weather.inTwoDays.day).getDate() +1}</p>
                        <p class="calendar-date">${months[new Date(data.forecast_weather.inThreeDays.day).getMonth()]} ${new Date(data.forecast_weather.inThreeDays.day).getDate() +1}</p>
                        <p class="calendar-date">${months[new Date(data.forecast_weather.inFourDays.day).getMonth()]} ${new Date(data.forecast_weather.inFourDays.day).getDate() +1}</p>
                        <p class="calendar-date">${months[new Date(data.forecast_weather.inFiveDays.day).getMonth()]} ${new Date(data.forecast_weather.inFiveDays.day).getDate() +1}</p> 
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
                <div class="trip-itinerary"></div>
            </div>
        `;

        let found = itineraryData.findIndex(itinerary => {
            return itinerary.city === data.location.city;
        })
        if(found !== -1) {
            const departureMethods = itineraryData[found].selectedTravelMethods[0];
            const returnMethods = itineraryData[found].selectedTravelMethods[1];

            const getIconClasses = method => {
                if (method[0] === 'd'){
                    method = method.substring(10,15);
                } else {
                    method = method.substring(7,12);
                }
                let icon;
                switch (method) {
                    case 'plane':
                        icon = `<i class="fas fa-plane"></i>`;
                        break;
                    case 'train':
                        icon = `<i class="fas fa-train"></i>`;
                        break;
                    case 'bus':
                        icon = `<i class="fas fa-bus-alt"></i>`;
                        break;
                    case 'car':
                        icon = `<i class="fas fa-car"></i>`;
                        break;
                    case 'boat':
                        icon = `<i class="fas fa-anchor"></i>`;
                        break;
                }
                return icon;
            };

            const departureIcons = departureMethods.map(getIconClasses);
            const returnIcons = returnMethods.map(getIconClasses);

            byClass('trip-itinerary')[0].innerHTML=`
                <p>${itineraryData[found].visaInfo}</p>
                <p>${departureIcons}</p> 
                <p>${itineraryData[found].departureDetails}</p> 
                <p>${returnIcons}</p> 
                <p>${itineraryData[found].returnDetails}</p> 
                <p>${itineraryData[found].accommodations}</p> 
                <p>${itineraryData[found].visaInfo}</p>  
            `;
        }

        // add event listener to close-modal button
        byId('close-pdf').addEventListener('click', event => {
            byId('app-overlay').style.display='none';
            byClass('trip-card-modal')[0].style.display='none';
        });

        // show modal
        byClass('trip-card-modal')[0].style.display='block';
    }) 

}

export { loadModalContent }