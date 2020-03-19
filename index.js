'use strict';

const searchURL = 
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

const apikey = 'nN5sELSIkeojkED4R4mwfoozc1zwejGHjaUVG3ON';

function getRoverphoto(maxResults,searchDate,searchCam){
   let params = {
        api_key : apikey,
        earth_date: searchDate,
        camera: searchCam,
    }
    const queryString = formatParams(params)
    let url= searchURL + '?' + queryString
    url= url.replace(" ","");
    console.log(url);
    
     fetch (url)
     .then(response =>{
         return response.json();
     })
     .then(responseJson => displayRoverphotos(responseJson))


}


function formatParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}
function displayRoverphotos(responseJson){

    $("#results").empty();
    $("#results").removeClass('hidden');
    for (let i=0; i< responseJson.photos.length; i++){
    $("#results").append(`
    <img src="${responseJson.photos[i].img_src}" alt="img result">
    `)
    }
}

function watchForm(){
    $("#js-form").on('submit', event=>{
        event.preventDefault();
       let searchDate= $("#js-date-search").val();
       console.log(searchDate);
       let searchCam= $(".cam-option:checked").val();
       console.log(searchCam);
       let maxResults = $("#js-max-results").val();
       console.log(maxResults);
       getRoverphoto(maxResults,searchDate,searchCam);
    });
}
watchForm();
