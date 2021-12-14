const addTripCard = data => {
    console.log('adding trip to UI...');
    const tripGrid = byId('trips-grid');
    const newCard = document.createElement('div');
    newCard.classList.add('trip-card');
    newCard.innerHTML = `
        <p id="destination">${data.location.city}</p>
        <p id="destination">Departing: ${data.dates.departDate}</p>
        <p id="destination">Returning: ${data.dates.returnDate}</p>
    `;
    tripGrid.appendChild(newCard);
}

export { addTripCard }