const formatCity = city => {
    city = city.trim(); // remove starting / ending whitespace

    let cityName = '';
    cityName = cityName.concat(city[0].toUpperCase()); // capitalize first letter
    for (let i=1; i<city.length; i++){
        let letter;
        if (city.indexOf(' ') === -1){
            // for one-word cities
            letter = city[i].toLowerCase(); // add each additional letter in lowercase
        } else {
            // for multi-word cities
            if (city[i-1] === ' '){
                letter = city[i].toUpperCase(); // capitalize letters following spaces
            } else {
                letter = city[i].toLowerCase(); 
            }
        }
        cityName = cityName.concat(letter);
    }
    
    return cityName;
}

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
        byClass('toggle')[0].ariaLabel="form closed";
    } else {
        formPanel.style.display = 'block';
        byId('hide-form').style.display = 'block';
        byId('show-form').style.display = 'none';
        formTitle.style.fontSize = '2.5em';
        byClass('title')[0].style.marginBottom = '1.5em';
        byId('add-trip').style.paddingBottom = '1.5em';
        byClass('toggle')[0].ariaLabel="form open";
    }
}

const animateValidation = () => {
    if (byId('city-validation') !== null){
        byId('city-validation').remove();
    }
    if (byId('dates-validation') !== null){
        byId('dates-validation').remove();
    }
    
    const validationMsg = document.createElement('div');
    validationMsg.id='input-validation';
    validationMsg.innerHTML='verifying your destination...';
    byId('msg-container').appendChild(validationMsg);
    byId('input-validation').classList.add('animate__animated','animate__flipInX','animate__repeat-3');
    
    setTimeout( () => {
        if(byId('input-validation') !== null){
            byId('input-validation').remove();
        }
    }, 2500);
}

const showOverlay = event => {
    // show overlay & darken to cover background
    byId('app-overlay').style.display='block';
    byId('app-overlay').style.opacity='0.9';
    // hide nav dropdowns
    const dropBtns = document.querySelectorAll('.dropbtn');
    for (let btn of dropBtns) {
        btn.style.display='none';
    }
}

const hideOverlay = event => {
    // hide overlay 
    byId('app-overlay').style.display='none';
    // show nav dropdowns
    const dropBtns = document.querySelectorAll('.dropbtn');
    for (let btn of dropBtns) {
        btn.style.display='block';
    }
}

export { formatCity, animateValidation, toggleForm, showOverlay, hideOverlay }