/// Get current date and time

function dateTime() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayMonth = now.getDate();
  let month = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let appDate = `${days[day]}, ${dayMonth}. ${months[month]}  ${hour}:${minutes}`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = appDate;
}
dateTime();

/// Name of the city -> search

function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#search-input");
  let currentCity = document.querySelector("#city");
  if (cityDisplay.value) {
    currentCity.innerHTML = cityDisplay.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
    currentCity.innerHTML = "Nowhere";
  }
  let apiKey = `9e0fb79c2f66d0cd0dcf06710976a873`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherLocation);
}
let city = document.querySelector("#search");
city.addEventListener("submit", cityName);

/// current geo - lat and lon

function currentLocation(position) {
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getcurrentLocation);

/// changing the city
function weatherLocation(response) {
  let searchTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  searchTemp.innerHTML = `${temperature}`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

/// Display - city
function showWeather(response) {
  let currentgeoTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  currentgeoTemp.innerHTML = temperature;
  let currentGeoLocation = document.querySelector("#city");
  currentGeoLocation.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}
