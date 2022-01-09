import { byId } from "..";
import { hideOverlay, showOverlay } from "./UIhelperFunctions";

const prepareItineraryForm = (data,itineraryData) => {
    showOverlay(); // obscure app background

    // populate modal with content specific to this trip
    byClass('itinerary-modal')[0].innerHTML = `
        <div class="modal-body">
            <div class="modal-header" id ="itinerary-header">
                <div class="modal-section-label" id="itinerary-title"><p><i class="far fa-edit" aria-hidden="true"></i></p><p> &nbsp; Edit itinerary details for ${data.location.city}</p></div>
                <button class="close-modal" id="close-itinerary" aria-label="Close itinerary form"><i class="fas fa-times">&nbsp;</i></button>
            </div>
            <form class="itinerary">
                <div class="visas-container">&nbsp;</div>
                <img class="country-flag" src="https://flagcdn.com/24x18/${data.location.country_code.toLowerCase()}.png" alt="national flag of ${data.location.country_name}">
                <label class="label-main" id="label-country">${data.location.country_name}</label>
                <label class="label-detail" id="label-visas" for="visas">Travel visa details</label>
                <textarea type="text" id="visas" placeholder="e.g., 'Visa required for US and EU citizens, valid for up to 60 days stay...'"></textarea>
                <label class="label-detail" id="label-hotel" for="hotel">Accommodations</label>
                <textarea type="text" id="hotel" placeholder="hotel, AirBnB, VRBO rental, etc."></textarea>
                <label class="label-detail" id="label-departure">Departure travel</label>
                <ul class="travel-methods" id="travel-methods-departure" title="Select the travel methods you'll use to get to ${data.location.city}">
                    <li id="departure-plane"><i class="fas fa-plane" aria-label="airplane">&nbsp;</i></li>
                    <li id="departure-train"><i class="fas fa-train" aria-label="train">&nbsp;</i></li>
                    <li id="departure-bus"><i class="fas fa-bus-alt" aria-label="bus">&nbsp;</i></li>
                    <li id="departure-car"><i class="fas fa-car" aria-label="car">&nbsp;</i></li>
                    <li id="departure-boat"><i class="fas fa-anchor" aria-label="boat">&nbsp;</i></li>
                </ul>
                <textarea type="text" id="departure-details" placeholder="'Delta Flight 285, confirmation #8f92sk, departing from JFK, boards 2pm...'"></textarea>
                <label class="label-detail" id="label-return">Return travel</label>
                <ul class="travel-methods" id="travel-methods-return" title="Select the travel methods you'll use to come home from ${data.location.city}">
                    <li id="return-plane"><i class="fas fa-plane" aria-label="airplane">&nbsp;</i></li>
                    <li id="return-train"><i class="fas fa-train" aria-label="train">&nbsp;</i></li>
                    <li id="return-bus"><i class="fas fa-bus-alt" aria-label="bus">&nbsp;</i></li>
                    <li id="return-car"><i class="fas fa-car" aria-label="car">&nbsp;</i></li>
                    <li id="return-boat"><i class="fas fa-anchor" aria-label="boat">&nbsp;</i></li>
                </ul>
                <textarea type="text" id="return-details" placeholder="e.g., 'Amtrak Train 95, confirmation #EJ79WP, departing from Union Station, boards 10:30am...'"></textarea>
                <label class="label-main" id="label-misc" for="itinerary-misc">Other bookings & plans</label>
                <textarea id="itinerary-misc"></textarea>
                <input type="submit" id="submit-itinerary" value="add details to itinerary" onclick="return Client.handleItineraryInput(event)" aria-label="Add details to itinerary">
            </form>
        </div>
    `;

    // check if itinerary already exists for this trip
    let found = itineraryData.findIndex(itinerary => {
        return itinerary.city === data.location.city;
    })
    // if itinerary info already exists, put previous entries into form so user can see & edit existing data
    if (found !== -1){
        byId('visas').value = itineraryData[found].visaInfo;
        byId('hotel').value = itineraryData[found].accommodations;
        byId('departure-details').value = itineraryData[found].departureDetails;
        byId('return-details').value = itineraryData[found].returnDetails;
        byId('itinerary-misc').value = itineraryData[found].itineraryMisc;
    }

    // add event listener to close-modal button
    byId('close-itinerary').addEventListener('click', event => {
        byClass('itinerary-modal')[0].style.display='none';
        hideOverlay();
    });

    // add event listener to travel method icons
    const travelMethodsDeparture = byId('travel-methods-departure').children;
    for (let i = 0; i < travelMethodsDeparture.length; i++) {
        travelMethodsDeparture[i].addEventListener('click', event => {
            const selection = event.target;
            if (selection.classList.contains('selected')) {
                selection.classList.remove('selected');
            } else {
                selection.classList.add('selected');
            }
        })
    }
    const travelMethodsReturn = byId('travel-methods-return').children;
    for (let i = 0; i < travelMethodsReturn.length; i++) {
        travelMethodsReturn[i].addEventListener('click', event => {
            const selection = event.target;
            if (selection.classList.contains('selected')) {
                selection.classList.remove('selected');
            } else {
                selection.classList.add('selected');
            }
        })
    }

    // show modal
    byClass('itinerary-modal')[0].style.display='block';
}

export { prepareItineraryForm }