let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind")
let humidity = document.querySelector(".humidity");
let weatherIcon = document.querySelector(".weather-icon");
let inputSearch = document.querySelector(".inputsearch");
let buttonSearch = document.querySelector(".buttonsearch");
let mainDescription = document.querySelector(".main-description");
let currentCity = "";

const apiKey = `bcd942581b25d5e1fe72e6160462b1ba`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const iconUrl = `https://openweathermap.org/img/wn/`;
const geoKey = `AIzaSyD95qQIl08KWoJtVfRSCuwiytQPaotVzew`;
const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=`;


function checkWeather(currentCity) {
    let data="";
    console.log(apiUrl + currentCity + `&appid=${apiKey}`);
    fetch(apiUrl + currentCity + `&appid=${apiKey}`).then(response => response.json()).then(responsedat => {
        data = responsedat;
        console.log(data);
        temp.innerText = Math.round(data.main.temp) + ` ℃`;
        mainDescription.innerText = data.weather[0].main;
        city.innerText = data.name;
        wind.innerText = data.wind.speed + ` km/h`; 
        humidity.innerText = data.main.humidity + `%`;
        weatherIcon.src = iconUrl + data.weather[0].icon + `@4x.png`;
    }).catch(error => {
        console.error(error);
    }); 
}

function executeButton() {
    currentCity = inputSearch.value;
    checkWeather(currentCity);
}


const successCallback = (position) => {
    console.log(geoUrl + position.coords.latitude + `%2C` + position.coords.longitude + `&key=${geoKey}`);
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
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);