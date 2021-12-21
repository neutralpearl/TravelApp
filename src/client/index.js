// ============= IMPORTS =================

// import js files
import { chooseTheme } from './js/themePicker';
import { handleSubmit } from './js/formSubmission';
import { animateValidation } from './js/manageValidationUI';
import { validateDateRange } from './js/dateValidation';
import { handleInvalidCity } from './js/inputErrorHandler';
import { addTripCard } from './js/showNewTrip';
import { prepareItineraryForm } from './js/renderItineraryForm';
import { handleItineraryInput } from './js/itinerarySubmission';
import { loadModalContent } from './js/renderModal';

// import Sass stylesheets
import './styles/app.scss'; 
import './styles/components.scss';
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

// FIX!
const toggleForm = event => {
    const formPanel = byClass("form-panel")[0];
    const formTitle = document.getElementsByTagName('H2')[0];
    if (formPanel.style.display === 'block') {
        formPanel.style.display = 'none';
        byId('hide-form').style.display = 'none';
        byId('show-form').style.display = 'block';
        byId('show-form').style.marginTop = '-35px';
        formTitle.style.fontSize = '2em';
        byClass('title')[0].style.marginBottom = '.5em';
        byId('add-trip').style.paddingBottom = '.5em';
    } else {
        formPanel.style.display = 'block';
        byId('hide-form').style.display = 'block';
        byId('show-form').style.display = 'none';
        formTitle.style.fontSize = '2.5em';
        byClass('title')[0].style.marginBottom = '1.5em';
        byId('add-trip').style.paddingBottom = '1.5em';
    }
}

(function () {
    const formToggle = byClass('toggle')[0];
    formToggle.addEventListener('click', toggleForm);
})();


// ============= EXPORTS =================

export {
    chooseTheme,
    mountains,
    palms,
    skyline, 
    temples,
    plane,
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
