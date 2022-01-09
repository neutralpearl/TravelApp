import { byId, itineraryData } from "..";
import { tripItinerary } from "..";

const handleItineraryInput = event => {
    event.preventDefault();

    let city = byId('itinerary-title').innerText.substring(29,byId('itinerary-title').innerText.length);
    let visaInfo =  byId('visas').value;
    let departureDetails =  byId('departure-details').value;
    let returnDetails =  byId('return-details').value;
    let accommodations =  byId('hotel').value;
    let itineraryMisc =  byId('itinerary-misc').value;

    let selectedTravelMethods = [[],[]]; // prepare array to store selected travel methods
    const travelMethodsDeparture = byId('travel-methods-departure').children;
    for (let i = 0; i < travelMethodsDeparture.length; i++) {
        let icon = travelMethodsDeparture[i].children[0];
        if (icon.classList.contains('selected')) {
            selectedTravelMethods[0].push(travelMethodsDeparture[i].id); // add departure methods to subarray at index 0
        }
    }
    const travelMethodsReturn = byId('travel-methods-return').children;
    for (let i = 0; i < travelMethodsReturn.length; i++) {
        let icon = travelMethodsReturn[i].children[0];
        if (icon.classList.contains('selected')) {
            selectedTravelMethods[1].push(travelMethodsReturn[i].id); // add return methods to subarray at index 1
        }
    }

    // check if itinerary already exists for this trip
    let found = itineraryData.findIndex(itinerary => {
        return itinerary.city === city;
    })

    if(found === -1) {
        // save itinerary info as new instance of itinerary class for later retrieval
        const itinerary = new tripItinerary(city,visaInfo,departureDetails,returnDetails,accommodations,itineraryMisc,selectedTravelMethods);
        itineraryData.push(itinerary);
    } else {
        // set new values for existing itinerary object based on itinerary form data
        itineraryData[found].visaInfo = visaInfo;
        itineraryData[found].departureDetails = departureDetails;
        itineraryData[found].returnDetails = returnDetails;
        itineraryData[found].accommodations = accommodations;
        itineraryData[found].selectedTravelMethods = selectedTravelMethods;
        itineraryData[found].itineraryMisc = itineraryMisc;
    }

    // hide itinerary form
    byId('app-overlay').style.display='none';
    byClass('itinerary-modal')[0].style.display='none';

    console.log(itineraryData); // uncomment for debuggin
    return itineraryData;
}

export { handleItineraryInput }