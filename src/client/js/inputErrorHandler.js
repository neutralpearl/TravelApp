const handleInvalidCity = () => {
    
    console.log('handling invalid city ...');
    const invalidCityMsg = document.createElement('div');
    invalidCityMsg.id='city-validation';
    invalidCityMsg.innerHTML='Sorry, we couldn\'t find that city!<br>Please check your spelling or try another location.';
    
    // get rid of validation message
    if(byId('input-validation') !== null){
        byId('input-validation').remove();
    }

    byId('msg-container').appendChild(invalidCityMsg);
    byId('city-validation').classList.add('animate__animated','animate__fadeInDown');
    
    // setTimeout( () => {
    //     byId('city-validation').remove();
    // }, 3000);
    
}

export { handleInvalidCity }