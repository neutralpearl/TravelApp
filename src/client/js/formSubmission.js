const handleSubmit = event => {
    event.preventDefault();
    const city = document.getElementById('destination').value;
    const departDate = document.getElementById('start-date').value;
    const returnDate = document.getElementById('end-date').value;

    console.log(`city = ${city} departing ${departDate} returning ${returnDate}`);
    console.log('form submitted');
}

export { handleSubmit }
