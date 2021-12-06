const photoFetch = async (city) => {

    // https://pixabay.com/api/docs/
    // "If you intend to use the images, please download them to your server first."

    const endpoint = 'https://pixabay.com/api/';
    const key = process.env.PIXABAY_KEY;

    // https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
    const url = `${endpoint}?key=${key}&q=${city}`;

    // GET — RESTful API
    // $.getJSON(URL, function(data){
    // if (parseInt(data.totalHits) > 0)
    //     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
    // else
    //     console.log('No hits');
    // });

}

export { photoFetch }