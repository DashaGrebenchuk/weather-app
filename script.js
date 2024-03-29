//real day and time

function formatDate(timestamp) {
  let currentDate = new Date();
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
//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function dispalyForecast(response) {
  let forecast = response.data.daily;
  document.querySelector("#day-temp").innerHTML = Math.round(
    forecast[0].temp.day
  );
  document.querySelector("#night-temp").innerHTML = Math.round(
    forecast[0].temp.night
  );
  forecast.shift();
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              ${formatDay(forecastDay.dt)}
              <img
                src="icons_new/${forecastDay.weather[0].icon}.png"
                alt="clear-sky"
                class="secondary-icons"
              />
              <div class="forecast-temp">${Math.round(
                forecastDay.temp.max
              )}°</div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "4fb36667f50c716efb0c9e559b5b7ffe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}
//change the city when clicking Search + currentWeather
function showCurrentWeather(response) {
  celciusTemperature = response.data.main.temp;
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celciusTemperature);
  document.querySelector("#icon-text").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute("src", `icons_new/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "4fb36667f50c716efb0c9e559b5b7ffe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function searchPosition(position) {
  let apiKey = "4fb36667f50c716efb0c9e559b5b7ffe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function dispayCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML =
    Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", dispayCelcius);

let form = document.querySelector("#search-tab");
form.addEventListener("submit", handleSubmit);
//weather response GPS
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Warsaw");
