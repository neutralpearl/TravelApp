import { byClass } from "..";
import { showOverlay, hideOverlay } from "./UIhelperFunctions";
import { prepareItineraryForm } from "./renderItineraryForm";

const loadModalContent = (data,tripLength) => {
    // allows parsing date from date string
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const weatherbitIconURLBase='https://www.weatherbit.io/static/img/icons/';

    // add event listener to open modal for this trip card
    document.querySelectorAll('.open-modal')[document.querySelectorAll('.open-modal').length - 1].addEventListener('click', event => {
        showOverlay(); // obscure app background

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
                    <div class="weather-forecast-container"></div>
                    <div class="days-row">
                        <p class="weekday" id="weekday1">${days[new Date(data.forecast_weather.tomorrow.day).getDay()]}</p>
                        <p class="weekday" id="weekday2">${days[new Date(data.forecast_weather.inTwoDays.day).getDay()]}</p>
                        <p class="weekday" id="weekday3">${days[new Date(data.forecast_weather.inThreeDays.day).getDay()]}</p>
                        <p class="weekday" id="weekday4">${days[new Date(data.forecast_weather.inFourDays.day).getDay()]}</p>
                        <p class="weekday" id="weekday5">${days[new Date(data.forecast_weather.inFiveDays.day).getDay()]}</p> 
                    </div>
                    <div class="dates-row">
                        <p class="calendar-date" id="date1">${months[new Date(data.forecast_weather.tomorrow.day).getMonth()]} ${new Date(data.forecast_weather.tomorrow.day).getDate() +1}</p>
                        <p class="calendar-date" id="date2">${months[new Date(data.forecast_weather.inTwoDays.day).getMonth()]} ${new Date(data.forecast_weather.inTwoDays.day).getDate() +1}</p>
                        <p class="calendar-date" id="date3">${months[new Date(data.forecast_weather.inThreeDays.day).getMonth()]} ${new Date(data.forecast_weather.inThreeDays.day).getDate() +1}</p>
                        <p class="calendar-date" id="date4">${months[new Date(data.forecast_weather.inFourDays.day).getMonth()]} ${new Date(data.forecast_weather.inFourDays.day).getDate() +1}</p>
                        <p class="calendar-date" id="date5">${months[new Date(data.forecast_weather.inFiveDays.day).getMonth()]} ${new Date(data.forecast_weather.inFiveDays.day).getDate() +1}</p> 
                    </div>
                    <div class="icons-row">
                        <img class="forecast-icon" id="icon1" src="${weatherbitIconURLBase}${data.forecast_weather.tomorrow.icon}.png">
                        <img class="forecast-icon" id="icon2" src="${weatherbitIconURLBase}${data.forecast_weather.inTwoDays.icon}.png">
                        <img class="forecast-icon" id="icon3" src="${weatherbitIconURLBase}${data.forecast_weather.inThreeDays.icon}.png">
                        <img class="forecast-icon" id="icon4" src="${weatherbitIconURLBase}${data.forecast_weather.inFourDays.icon}.png">
                        <img class="forecast-icon" id="icon5" src="${weatherbitIconURLBase}${data.forecast_weather.inFiveDays.icon}.png">
                    </div>
                    <div class="temps-row">
                        <p class="temp-high" id="temp-high1">High:<br/> <span>${Math.round(data.forecast_weather.tomorrow.high_temp)}</span>°F</p>
                        <p class="temp-low" id="temp-low1">Low:<br/> <span>${Math.round(data.forecast_weather.tomorrow.low_temp)}</span>°F</p>
                        <p class="temp-high" id="temp-high2"> High:<br/> <span>${Math.round(data.forecast_weather.inTwoDays.high_temp)}</span>°F</p>
                        <p class="temp-low" id="temp-low2">Low:<br/> <span>${Math.round(data.forecast_weather.inTwoDays.low_temp)}</span>°F</p>
                        <p class="temp-high" id="temp-high3">High:<br/> <span>${Math.round(data.forecast_weather.inThreeDays.high_temp)}</span>°F</p>
                        <p class="temp-low" id="temp-low3">Low:<br/> <span>${Math.round(data.forecast_weather.inThreeDays.low_temp)}</span>°F</p>
                        <p class="temp-high" id="temp-high4"> High:<br/> <span>${Math.round(data.forecast_weather.inFourDays.high_temp)}</span>°F</p>
                        <p class="temp-low" id="temp-low4">Low:<br/> <span>${Math.round(data.forecast_weather.inFourDays.low_temp)}</span>°F</p>
                        <p class="temp-high" id="temp-high5">High:<br/> <span>${Math.round(data.forecast_weather.inFiveDays.high_temp)}</span>°F</p>
                        <p class="temp-low" id="temp-low5">Low:<br/> <span>${Math.round(data.forecast_weather.inFiveDays.low_temp)}</span>°F</p>
                    </div>
                    <div class="desc-row">
                        <p class="forecast-desc" id="desc1">${data.forecast_weather.tomorrow.description}</p>
                        <p class="forecast-desc" id="desc2">${data.forecast_weather.inTwoDays.description}</p>
                        <p class="forecast-desc" id="desc3"> ${data.forecast_weather.inThreeDays.description}</p>
                        <p class="forecast-desc" id="desc4">${data.forecast_weather.inFourDays.description}</p>
                        <p class="forecast-desc" id="desc5">${data.forecast_weather.inFiveDays.description}</p>
                    </div>
                </div>
                <div class="trip-itinerary"></div>
            </div>
        `;

        let found = itineraryData.findIndex(itinerary => {
            return itinerary.city === data.location.city;
        })
        // if itinerary data is stored for this city
        if(found !== -1) {
            const departureMethods = itineraryData[found].selectedTravelMethods[0];
            const returnMethods = itineraryData[found].selectedTravelMethods[1];

            // converts list of travel method classes into array of <i> elements
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

            // get array of <i> tags for departure/return respectively, then convert into string
            const departureIcons = departureMethods.map(getIconClasses).join('');
            const returnIcons = returnMethods.map(getIconClasses).join('');

            // populate Itinerary section with user inputs
            byClass('trip-itinerary')[0].innerHTML=`
                <p class="modal-section-label">Itinerary Details</p>
                <div>&nbsp;</div>
                <div class="itinerary-container"></div>
                <div class="visa-info-label label-detail">Visa Info for ${data.location.country_name}</div>
                <p class="visa-info">${itineraryData[found].visaInfo}</p>
                <div class="departure-label label-detail">Departure</div>
                <div class="departure-methods">${departureIcons}</div>
                <p class="departure-details">${itineraryData[found].departureDetails}</p>
                <div class="return-label label-detail">Return</div>
                <div class="return-methods">${returnIcons}</div>
                <p class="return-details">${itineraryData[found].returnDetails}</p> 
                <div class="accommodations-label label-detail">Accommodations</div>
                <p class="accommodations">${itineraryData[found].accommodations}</p> 
                <div class="itinerary-misc-label label-detail">Miscellaneous Plans & Details</div>
                <p class="itinerary-misc">${itineraryData[found].itineraryMisc}</p>
            `;
        } else {
            // if no itinerary data is available, show "No details" and direct them to itinerary form
            byClass('trip-itinerary')[0].innerHTML=`
                <p class="modal-section-label">Itinerary Details</p>
                <div class="itinerary-container"></div>
                <p class="no-itinerary"><em>No details to display</em></p>
                <button class="add-itinerary itinerary-hint"><i class="far fa-edit"></i> &nbsp; add itinerary details</button>
            `;

            // add event listener to "itinerary hint" button
            byClass('add-itinerary')[0].addEventListener('click', event => {
                byClass('trip-card-modal')[0].style.display='none'; // close current modal
                hideOverlay(); 
                prepareItineraryForm(data,itineraryData); // show itinerary modal
            });
        }

        // add event listener to close-modal button
        byId('close-pdf').addEventListener('click', event => {
            byClass('trip-card-modal')[0].style.display='none';
            hideOverlay();
        });

        // show modal
        byClass('trip-card-modal')[0].style.display='block';
    }) 

}

export { loadModalContent }