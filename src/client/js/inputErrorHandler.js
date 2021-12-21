const handleInvalidCity = () => {

    console.log('handling invalid city ...'); // for debugging
    const invalidCityMsg = document.createElement('div');
    invalidCityMsg.id='city-validation';
    invalidCityMsg.innerHTML='Sorry, we couldn\'t find that city!<br>Please check your spelling or try another location.';
    
    // get rid of existing validation message
    if(byId('input-validation') !== null){
        byId('input-validation').remove();
    }

    byId('msg-container').appendChild(invalidCityMsg); // add to DOM
    byId('city-validation').classList.add('animate__animated','animate__fadeInDown'); // animate entrance
}

export { handleInvalidCity }