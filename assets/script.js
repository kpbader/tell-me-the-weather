// // GLOBAL VARIABLES 
var citySearchFormEl = document.querySelector("#city-searcher");
var userInputEl = document.querySelector(".form-input");
// var searchButtonEl = document.querySelector("#results-btn");
var currentCityEl = document.querySelector(".current-city");
// var currentDateEl = document.querySelector(".current-date");
var currentDescriptionEl = document.querySelector(".current-description");
var currentTempEl = document.querySelector(".current-temp");
var currentWindEl = document.querySelector(".current-wind");
var currentHumidityEl = document.querySelector(".current-humidity");
var currentFeelsLikeEl = document.querySelector(".current-feels-like");

var currentDateEl = new Date().toLocaleDateString();



function formSubmitHandler(event) {
  // prevents refresh 
    event.preventDefault();
    // get value from input element
    var city = userInputEl.value.trim();
    if (city) {
        findTheWeather(city);

        // clear old content 
        userInputEl.value = "";

    } else {
        alert("Please enter a correct city name.")
    }
};

// Search button funciton 
citySearchFormEl.addEventListener("submit", formSubmitHandler);

// pulls data from api 
function findTheWeather(cityInfo) {
var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityInfo + '&units=imperial&appid=7d2468859f069e175129ed58c076ee88';
// make a get request to url
fetch(requestUrl).then(function(response) {
  // request was successful
  if (response.ok) {
    response.json().then(function(data) {
      // console.log(data);
      currentCityEl.textContent = (data.name); 
      document.querySelector(".current-date").textContent = currentDateEl;
      currentDescriptionEl.textContent = (data.weather[0].main)
      currentTempEl.textContent = "Temperature: " + (data.main.temp) + " F°";
      currentWindEl.textContent = "Wind speed: " + (data.wind.speed) + " mph";
      currentHumidityEl.textContent = "Humidity: " + (data.main.humidity) + "%";
      currentFeelsLikeEl.textContent = "Feels like: " + (data.main.feels_like) + " F°";

    });
  } else {
    alert("Error");
  }
});
};

