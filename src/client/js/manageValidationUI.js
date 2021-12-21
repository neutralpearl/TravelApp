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

export { animateValidation }