// // GLOBAL VARIABLES 
var citySearchFormEl = document.querySelector("#city-searcher");
var userInputEl = document.querySelector(".form-input");
var currentCityEl = document.querySelector("#current-city");
var currentDescriptionEl = document.querySelector("#current-description");
var currentIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUVEl = document.querySelector("#current-uv");
var currentDateEl = new Date().toLocaleDateString();
var resultsContainerTop = document.querySelector("#results");
var forecastContainer =  document.getElementById('forecast');
var quickBtns = document.querySelector("#city-buttons");

function formSubmitHandler(event) {
  // prevents refresh 
    event.preventDefault();

    // get value from input element
    var city = userInputEl.value.trim();
    if (city) {
        findTheWeather(city);

        // clear old content 
        forecastContainer.textContent = "";
        userInputEl.value = "";

        // save to local storage 
        localStorage.setItem(city, "");

        
        // var x = localStorage.getItem(city);
        //   console.log(x)

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
      oneCall(data)
    });
  } else {
    alert("Error");
  }

});

// reveals 'current weather' container
resultsContainerTop.classList.add('results-display');

};

function oneCall(coord){
    var lat = coord.coord.lat;
    var lon = coord.coord.lon;
    var city = coord.name

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=7d2468859f069e175129ed58c076ee88`).then(function(res){
      return res.json()
    }).then(function(data){
      currentWeather(data.current, city)
      getForecast(data.daily);
    })
}

// displays current weather in city chosen by user 
function currentWeather(data, cityName){
  console.log(data)

      currentCityEl.textContent = (cityName); 
      document.querySelector("#current-date").textContent = currentDateEl;
      // icon placement
      var placeIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      currentIconEl.setAttribute("src", placeIcon);
      currentIconEl.classList.add("current-icon");
      // icon placement end 
      currentDescriptionEl.textContent = (data.weather[0].main);
      currentTempEl.textContent = "Temperature: " + (data.temp) + " F°";
      currentWindEl.textContent = "Wind speed: " + (data.wind_speed) + " mph";
      currentHumidityEl.textContent = "Humidity: " + (data.humidity) + "%";
      currentUVEl.textContent = "UVI: " + (data.uvi);

      // color code UV index 
    var parseUVI = parseInt(data.uvi);
    console.log(parseUVI);
     if (parseUVI <= 2) {
      currentUVEl.classList.remove('red');
      currentUVEl.classList.remove('orange');
      currentUVEl.classList.add('green');
     } else if (parseUVI <= 7) {
       currentUVEl.classList.remove('green');
       currentUVEl.classList.remove('red');
       currentUVEl.classList.add('orange');
     } else if (parseUVI <= 10) {
      currentUVEl.classList.remove('green');
      currentUVEl.classList.remove('orange');
      currentUVEl.classList.add('red');
     }
}

// 5 Day Outlook of city chosen by user 
function getForecast(forecast){

  var forecastHeader =  document.createElement('div')
  var forcastHeading =  document.createElement('h3')

  forecastHeader.setAttribute('class', 'col-12');
  forcastHeading.textContent = "5 Day Forecast"

  forecastHeader.append(forcastHeading);
  forecastContainer.append(forecastHeader);

  for (var i = 1; i < forecast.length -2; i++) {
    // create elements 
    var card = document.createElement('div');
    var cardBody =  document.createElement('div')
    var weatherIconImg = document.createElement('img') 
      // icon placement
      var placeIcon = `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`;
      // 
    var day = document.createElement('h5');
    var degrees = document.createElement('h5');
    var wind = document.createElement('h5');
    var humidity = document.createElement('h5');

    // to get 5 day dates...
    var time = forecast[i].dt;
    var moment = new Date(time * 1000);
    var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    var year = moment.getFullYear();
    var month = months[moment.getMonth()];
    var date = moment.getDate();
    var specificDay = month + '/' + date + '/' + year;
    // console.log(specificDay);

    // set attributes...
    card.setAttribute('class', 'card');
      card.classList.add('col');
    cardBody.setAttribute('class', 'card-body');
    weatherIconImg.setAttribute('src', placeIcon);
    day.setAttribute('class', 'card-date');
    degrees.setAttribute('class', 'card-degrees');
    wind.setAttribute('class', 'card-wind');
    humidity.setAttribute('class', 'card-humidity');

    //append to cards 
    card.append(cardBody);
    cardBody.append(weatherIconImg);
    cardBody.append(day);
    cardBody.append(degrees);
    cardBody.append(wind);
    cardBody.append(humidity);
    
    // displays descriptors to cards
    day.textContent = specificDay;
    degrees.textContent =  "Average: " + forecast[i].temp.day + " F°";
    wind.textContent = "Wind: " + forecast[i].wind_speed + " mph";
    humidity.textContent = "Humidity: " + forecast[i].humidity + "%";

    forecastContainer.append(card)
  }
};


// buttons/quick options....
function quickCity(event) {
    // get the language attribute from the clicked element
    var quickSelect = event.target.getAttribute("data-language");
  
    if (quickSelect) {
      findTheWeather(quickSelect);
      // // clear old content
      forecastContainer.textContent = "";
    }
  };
quickBtns.addEventListener("click", quickCity);




