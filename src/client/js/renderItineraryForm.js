import { byId } from "..";

const prepareItineraryForm = (data,itineraryData) => {

    byClass('add-itinerary')[byClass('add-itinerary').length-1].addEventListener('click', event => {
        //show overlay & darken to cover background
        byId('app-overlay').style.display='block';
        byId('app-overlay').style.opacity='0.9';

        // populate modal with content specific to this trip
        byClass('itinerary-modal')[0].innerHTML = `
            <div class="modal-body">
                <div class="modal-header" id ="itinerary-header">
                    <p class="modal-section-label" id="itinerary-title"><i class="far fa-edit" aria-hidden="true"></i> &nbsp; Edit itinerary details for ${data.location.city}</p>
                    <button class="close-modal"><i class="fas fa-times">&nbsp;</i></button>
                </div>
                <form class="itinerary">
                    <div class="visas-container">&nbsp;</div>
                    <img class="country-flag" src="https://flagcdn.com/24x18/${data.location.country_code.toLowerCase()}.png">
                    <label class="label-main" id="label-country">${data.location.country_name}</label>
                    <label class="label-detail" id="label-visas" for="visas">Travel visa details</label>
                    <textarea type="text" id="visas" placeholder="e.g., 'Visa required for US and EU citizens, valid for up to 60 days stay...'"></textarea>
                    <label class="label-detail" id="label-hotel" for="hotel">Accommodations</label>
                    <textarea type="text" id="hotel" placeholder="hotel, AirBnB, VRBO rental, etc."></textarea>
                    <label class="label-detail" id="label-departure">Departure travel</label>
                    <ul class="travel-methods" id="travel-methods-departure">
                        <li id="departure-plane"><i class="fas fa-plane">&nbsp;</i></li>
                        <li id="departure-train"><i class="fas fa-train">&nbsp;</i></li>
                        <li id="departure-bus"><i class="fas fa-bus-alt">&nbsp;</i></li>
                        <li id="departure-car"><i class="fas fa-car">&nbsp;</i></li>
                        <li id="departure-boat"><i class="fas fa-anchor">&nbsp;</i></li>
                    </ul>
                    <textarea type="text" id="departure-details" placeholder="'Delta Flight 285, confirmation #8f92sk, departing from JFK, boards 2pm...'"></textarea>
                    <label class="label-detail" id="label-return">Return travel</label>
                    <ul class="travel-methods" id="travel-methods-return">
                        <li id="return-plane"><i class="fas fa-plane">&nbsp;</i></li>
                        <li id="return-train"><i class="fas fa-train">&nbsp;</i></li>
                        <li id="return-bus"><i class="fas fa-bus-alt">&nbsp;</i></li>
                        <li id="return-car"><i class="fas fa-car">&nbsp;</i></li>
                        <li id="return-boat"><i class="fas fa-anchor">&nbsp;</i></li>
                    </ul>
                    <textarea type="text" id="return-details" placeholder="e.g., 'Amtrak Train 95, confirmation #EJ79WP, departing from Union Station, boards 10:30am...'"></textarea>
                    <label class="label-main" id="label-misc" for="itinerary-misc">Other bookings & plans</label>
                    <textarea id="itinerary-misc"></textarea>
                    <input type="submit" id="submit-itinerary" value="add details to itinerary" onclick="return Client.handleItineraryInput(event)">
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

        // show modal
        byClass('itinerary-modal')[0].style.display='block';

        // add event listener to close-modal button
        byClass('close-modal')[0].addEventListener('click', event => {
            byId('app-overlay').style.display='none';
            byClass('itinerary-modal')[0].style.display='none';
        });

        // add event listener to travel method icons
        // const travelMethodLists = byClass('travel-methods');
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
    })

}

export { prepareItineraryForm }