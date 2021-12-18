const prepareItineraryForm = data => {

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
                        <li class="travel-method"><i class="fas fa-plane">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-train">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-bus-alt">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-car">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-anchor">&nbsp;</i></li>
                    </ul>
                    <textarea type="text" id="departure-details" placeholder="'Delta Flight 285, confirmation #8f92sk, departing from JFK, boards 2pm...'"></textarea>
                    <label class="label-detail" id="label-return">Return travel</label>
                    <ul class="travel-methods" id="travel-methods-return">
                        <li class="travel-method"><i class="fas fa-plane">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-train">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-bus-alt">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-car">&nbsp;</i></li>
                        <li class="travel-method"><i class="fas fa-anchor">&nbsp;</i></li>
                    </ul>
                    <textarea type="text" id="return-details" placeholder="e.g., 'Amtrak Train 95, confirmation #EJ79WP, departing from Union Station, boards 10:30am...'"></textarea>
                    <label class="label-main" id="label-misc" for="itinerary-misc">Other bookings & plans</label>
                    <textarea id="itinerary-misc"></textarea>
                    <input type="submit" id="submit-itinerary" value="add details to itinerary" onclick="return Client.handleItineraryInput(event)">
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

}

export { prepareItineraryForm }