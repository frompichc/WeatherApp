import apiConfig from './apiConfig.js';

let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind")
let humidity = document.querySelector(".humidity");
let weatherIcon = document.querySelector(".weather-icon");
let inputSearch = document.querySelector(".inputsearch");
let buttonSearch = document.querySelector(".buttonsearch");
let mainDescription = document.querySelector(".main-description");
let currentCity = "";

const apiKey = apiConfig.apiKey;
const apiUrl = apiConfig.apiUrl;
const iconUrl = apiConfig.iconUrl;
const geoKey = apiConfig.geoKey;
const geoUrl = apiConfig.geoUrl;


function checkWeather(currentCity) {
    let data="";
    fetch(apiUrl + currentCity + `&appid=${apiKey}`).then(response => response.json()).then(responsedat => {
        data = responsedat;
        temp.innerText = Math.round(data.main.temp) + ` ℃`;
        mainDescription.innerText = data.weather[0].main;
        city.innerText = data.name;
        wind.innerText = data.wind.speed + ` km/h`; 
        humidity.innerText = data.main.humidity + `%`;
        weatherIcon.src = iconUrl + data.weather[0].icon + `@4x.png`;
        inputSearch.value = ``;
    }).catch(error => {
        console.error(error);
    }); 
}

function executeButton() {
    currentCity = inputSearch.value;
    checkWeather(currentCity);
}


const successCallback = (position) => {
    fetch(geoUrl + position.coords.latitude + `%2C` + position.coords.longitude + `&key=${geoKey}`)
    .then(response => response.json())
    .then(data => {
        currentCity = data.results[0].address_components[3].short_name;
        checkWeather(currentCity);     
    }).catch(error => {
        console.error(error);
    });
};
  
const errorCallback = (error) => {
    console.log(error);
};

buttonSearch.addEventListener("click", executeButton); 
window.onload = checkWeather(`New York city`);