const chooseTheme = event => {

    const appBody = document.querySelector('body');
    const urlBase=`url('/assets/`;

    const themeChoice = event.target;
    console.log(`changing theme to ${themeChoice.id} . . . `);

    // helper function
    const setColors = color => {
        byClass('form-panel')[0].style.backgroundColor = color;
        byClass('trips-panel')[0].style.backgroundColor = color;
        // changes border rule for .current-weather-container // MAKE SURE THE INDEX IS CORRECT!
        document.styleSheets[8].cssRules[77].style.border = `2px solid ${color}`;   
        // document.styleSheets[8].cssRules[107].style.backgroundColor = color; 
        document.styleSheets[8].cssRules[108].style.backgroundColor = color; 
        document.styleSheets[8].cssRules[126].style.backgroundColor = color; 
    }
    
    switch (themeChoice.id) {
        case 'mountain': 
            appBody.style.backgroundImage = `${urlBase}mountains.jpg')`; 
            byClass('logo')[0].style.color = '#000';
            setColors('rgb(209 182 206)');
            break;
        case 'skyline': 
            appBody.style.backgroundImage = `${urlBase}skyline.jpg')`; 
            byClass('logo')[0].style.color = '#fff';
            setColors('rgb(203 153 111)');
            break;
        case 'oasis': 
            appBody.style.backgroundImage = `${urlBase}palms.jpg')`; 
            byClass('logo')[0].style.color = '#fff';
            setColors('rgb(237 222 127)');
            break;
        case 'ruins': 
            appBody.style.backgroundImage = `${urlBase}temples.jpg')`; 
            byClass('logo')[0].style.color = '#000';
            setColors('rgb(169 183 142)');
            break;
    }
}

export { chooseTheme }