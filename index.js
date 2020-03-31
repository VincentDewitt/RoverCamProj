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

function GetRoverphotoSol(maxResultsSol,searchDateSol,searchCamSol){
    let params = {
        api_key: apikey,
        sol: searchDateSol,
        camera: searchCamSol,
    }
    const queryString= formatParams(params)
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
    let maxResults = $("#js-max-results").val();
       console.log(maxResults);

    let maxResultsSol = $("#js-max-results-sol").val();
    console.log(maxResultsSol);
    
    $("#results").empty();
    $("#results").removeClass('hidden');
    if (responseJson.photos.length == 0 ){
        $('#results').append(`
        <h3>No results for that entered date</h3>
        `)
    }
    else {
    for (let i=0; i< responseJson.photos.length && i<maxResults; i++){
    $("#results").append(`
    <img src="${responseJson.photos[i].img_src}" alt="img result">
    `)
    }
}
}

function watchForm(){
    $("#js-form-earthdate").on('submit', event=>{
        $("p").addClass("hidden_alert");
        event.preventDefault();
       let searchDate= $("#js-date-search").val();
       console.log(searchDate);
       let searchCam= $(".cam-option:checked").val();
       console.log(searchCam);
       let maxResults = $("#js-max-results").val();
       console.log(maxResults);
       getRoverphoto(maxResults,searchDate,searchCam);
       console.log(searchCam);
       if (searchCam==undefined) {
           $("p").removeClass("hidden_alert");
           console.log
       }
    });
   $("#js-form-soldate").on('submit', event=>{
       $("p").addClass("hidden_alert");
        event.preventDefault();
        let searchDateSol = $("#js-sole-search").val();
        console.log(searchDateSol);
        let searchCamSol = $(".cam-option-sol:checked").val();
        console.log(searchCamSol);
        let maxResultsSol = $("#js-max-results-sol").val();
        console.log(maxResultsSol);
        GetRoverphotoSol(maxResultsSol,searchDateSol,searchCamSol);
   }) 
}
watchForm();
