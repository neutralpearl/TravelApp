// imports not working
import  { getClass } from '../index.js';
import { getId } from '../index.js';

const chooseTheme = event => {

    const appBody = document.querySelector('body');
    const urlBase=`url('/assets/`;

    const themeChoice = event.target;
    console.log(`changing theme to ${themeChoice.id} . . . `);
    
    switch (themeChoice.id) {
        case 'mountain': 
            appBody.style.backgroundImage = `${urlBase}mountains.jpg')`; 
            document.querySelector('.logo').style.color = '#000';
            break;
        case 'city': 
            appBody.style.backgroundImage = `${urlBase}skyline.png')`; 
            document.querySelector('.logo').style.color = '#fff';
            break;
        case 'oasis': 
            appBody.style.backgroundImage = `${urlBase}palms.jpg')`; 
            document.querySelector('.logo').style.color = '#fff';
            break;
        case 'ruins': 
            appBody.style.backgroundImage = `${urlBase}temples.jpg')`; 
            document.querySelector('.logo').style.color = '#000';
            break;
    }
}

export { chooseTheme }