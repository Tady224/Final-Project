//Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

//forecast hours
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//CITY TEMP HUMIDITY WIND ICON
function showWeather(response) {

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
}
//API Location
function searchLocation(position) {
  let apiKey = "5625fc4e2f1e1a9677dec96db881138a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
//Current Location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
//Add forecast Weather
function showForecast(response) {

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = `
<div class="col-2">
<h2> ${formatHours(forecast.dt *1000)} </h2>
<img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
<div class="weather-forecast-temperature">
<strong> ${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
</div>
</div> `;
}

//Add metric to API
function search(city) {

  let apiKey = "5625fc4e2f1e1a9677dec96db881138a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);

}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
