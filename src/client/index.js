// ============= IMPORTS =================

// import js files
import { chooseTheme } from './js/themePicker';
import { handleSubmit } from './js/formSubmission';
import { validateDateRange } from './js/dateValidation';
import { postTripData } from './js/postToServer';
import { handleInvalidCity } from './js/inputErrorHandler';

// import Sass stylesheets
import './styles/app.scss'; 
import './styles/resets.scss';

// import image files // NOT WORKING
import mountains from './media/mountains.jpg'; 
import palms from './media/palms.jpg';
import skyline from './media/skyline.png'; 
import temples from './media/temples.jpg';

// ============= GLOBAL FUNCTIONS =================

// shorthand methods set as properties of window
const byId = id => document.getElementById(id);
window.byId = byId;
const byClass = name => document.getElementsByClassName(name);
window.byClass = byClass;


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


// ============= EXPORTS =================

export {
    chooseTheme,
    mountains,
    palms,
    skyline, 
    temples,
    byClass,
    byId,
    handleSubmit,
    validateDateRange,
    postTripData,
    handleInvalidCity
}
