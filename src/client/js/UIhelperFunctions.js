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

export { animateValidation, toggleForm, showOverlay, hideOverlay }