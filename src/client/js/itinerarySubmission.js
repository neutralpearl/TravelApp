import { byId } from "..";

const handleItineraryInput = event => {
    event.preventDefault();

    itineraryData.visaInfo =  byId('visas').value;
    itineraryData.departureDetails =  byId('departure-details').value;
    itineraryData.returnDetails =  byId('return-details').value;
    itineraryData.accommodations =  byId('hotel').value;
    itineraryData.itineraryMisc =  byId('itinerary-misc').value;

    let selectedTravelMethods = [[],[]];
    const travelMethodsDeparture = byId('travel-methods-departure').children;
    for (let i = 0; i < travelMethodsDeparture.length; i++) {
        let icon = travelMethodsDeparture[i].children[0];
        console.log(icon);
        if (icon.classList.contains('selected')) {
            selectedTravelMethods[0].push(travelMethodsDeparture[i].id);
        }
    }
    const travelMethodsReturn = byId('travel-methods-return').children;
    for (let i = 0; i < travelMethodsReturn.length; i++) {
        let icon = travelMethodsReturn[i].children[0];
        console.log(icon);
        if (icon.classList.contains('selected')) {
            selectedTravelMethods[1].push(travelMethodsReturn[i].id);
        }
    }

    itineraryData.selectedTravelMethods = selectedTravelMethods;

    console.log(itineraryData);

    // PUSH DATA TO WHERE IT CAN BE 
}

export { handleItineraryInput }