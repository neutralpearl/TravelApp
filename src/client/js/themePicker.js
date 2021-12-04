const chooseTheme = event => {

    const appBody = document.getElementsByTagName('body')[0];
    const urlBase=`url('/assets/`;

    const themeChoice = event.target;
    console.log(`changing theme to ${themeChoice.id} . . . `);
    
    // images aren't getting 
    switch (themeChoice.id) {
        case 'mountain': 
            appBody.style.backgroundImage = `${urlBase}mountains.jpg')`; 
            document.getElementsByClassName('logo')[0].style.color = '#000';
            break;
        case 'city': 
            appBody.style.backgroundImage = `${urlBase}skyline.png')`; 
            document.getElementsByClassName('logo')[0].style.color = '#fff';
            break;
        case 'oasis': 
            appBody.style.backgroundImage = `${urlBase}palms.jpg')`; 
            document.getElementsByClassName('logo')[0].style.color = '#fff';
            break;
        case 'ruins': 
            appBody.style.backgroundImage = `${urlBase}temples.jpg')`; 
            document.getElementsByClassName('logo')[0].style.color = '#000';
            break;
    }
}

export { chooseTheme }