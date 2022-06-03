//real day and time
let currentDate = new Date();

function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formedDate = `${day}, ${hour}:${minutes}`;

  return formedDate;
}
let dateLine = document.querySelector("#current-date");
dateLine.innerHTML = formatDate(currentDate);

//change the city when clicking Search + currentWeather
function showCurrentWeather(response) {
  console.log(response);
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#icon-text").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}
function searchCity(city) {
  let apiKey = "4fb36667f50c716efb0c9e559b5b7ffe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
function searchPosition(position) {
  let apiKey = "4fb36667f50c716efb0c9e559b5b7ffe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let form = document.querySelector("#search-tab");
form.addEventListener("submit", handleSubmit);
//weather response GPS
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Warsaw");

//Farenheit to Celcius
function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#current-temp");
  farenheitTemp.innerHTML = `66°`;
}
function showCelciusTemp(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#current-temp");
  celciusTemp.innerHTML = `25°`;
}

let farenheitTemp = document.querySelector("#farenheit-link");
farenheitTemp.addEventListener("click", showFarenheitTemp);

let celciusTemp = document.querySelector("#celcius-link");
celciusTemp.addEventListener("click", showCelciusTemp);
