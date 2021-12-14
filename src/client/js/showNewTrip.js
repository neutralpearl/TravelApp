const addTripCard = data => {

    console.log('adding trip to UI...');

    byId('no-trips').style.display = 'none';
    byClass('trips-panel')[0].style.display = 'block';

    const tripGrid = byId('trips-grid');

    const newCard = document.createElement('div');
    newCard.classList.add('trip-card');
    newCard.innerHTML = `
        <p class="destination">${data.location.city}</p>
        <p class="dates"><strong>${data.dates.departDate.toLocaleDateString('en-us')}</strong> — <strong>${data.dates.returnDate.toLocaleDateString('en-us')}</strong></p>
        <div class="city-image" style="background-image: url('https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png'); background-size: cover;"></div>
        <img class="current-weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.current_weather.icon}.png">
        <p class="current-weather-temp">${Math.round(Number(data.current_weather.temp))}°F</p>
        <p class="current-weather-description">${data.current_weather.description}</p>
    `;
    tripGrid.appendChild(newCard);
}

export { addTripCard }