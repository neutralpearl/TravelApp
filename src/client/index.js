// ============= IMPORTS =================

// import js files
import { chooseTheme } from './js/themePicker';
import { formatCity, animateValidation, hideOverlay, showOverlay, toggleForm } from './js/UIhelperFunctions';
import { handleSubmit } from './js/formSubmission';
import { validateDateRange } from './js/dateValidation';
import { handleInvalidCity } from './js/inputErrorHandler';
import { addTripCard } from './js/showNewTrip';
import { prepareItineraryForm } from './js/renderItineraryForm';
import { handleItineraryInput } from './js/itinerarySubmission';
import { loadModalContent } from './js/renderModal';

// import Sass stylesheets
import './styles/app.scss'; 
import './styles/components.scss';
import './styles/modals.scss';
import './styles/resets.scss';

// import image files // NOT WORKING
import mountains from './media/mountains.jpg'; 
import palms from './media/palms.jpg';
import skyline from './media/skyline.png'; 
import temples from './media/temples.jpg';
import plane from './media/wing.jpg';

// ============= GLOBAL FUNCTIONS =================

// shorthand methods set as properties of window
const byId = id => document.getElementById(id);
window.byId = byId;

const byClass = name => document.getElementsByClassName(name);
window.byClass = byClass;

// ============= GLOBAL VARIABLES =================
let itineraryData = [];
window.itineraryData = itineraryData;

class tripItinerary {
    constructor(city,visaInfo,departureDetails,returnDetails,accommodations,itineraryMisc,selectedTravelMethods) {
        this.city = city;
        this.visaInfo = visaInfo;
        this.departureDetails = departureDetails;
        this.returnDetails =  returnDetails;
        this.accommodations =  accommodations;
        this.itineraryMisc =  itineraryMisc;
        this.selectedTravelMethods =  selectedTravelMethods;
    }
}

// ============= DOM SET-UP ON LOAD =================

// default the start date value to today [IIFE]
(function () {
    let today = new Date().toISOString().substr(0, 10);
    byId('start-date').value = today;
})();

// add event listeners to theme options [IIFE]
(function () {
    const themeMenuOptions = byClass('theme-menu')[0].children;
    for (let option of themeMenuOptions) {
        option.addEventListener('click', chooseTheme);
    }
})();

// add event listener to form toggle [IIFE]
(function () {
    const formToggle = byClass('toggle')[0];
    formToggle.addEventListener('click', toggleForm);
})();

// ============= EXPORTS =================

export {
    chooseTheme,
    formatCity,
    toggleForm,
    hideOverlay,
    showOverlay,
    byClass,
    byId,
    itineraryData,
    tripItinerary,
    handleSubmit,
    animateValidation,
    validateDateRange,
    handleInvalidCity,
    addTripCard,
    prepareItineraryForm,
    handleItineraryInput, 
    loadModalContent
}
