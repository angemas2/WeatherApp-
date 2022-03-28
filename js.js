function formatDate(date) {
  let now = new Date();
  let day = now.getDay();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = weekdays[day];
  let currentHour = `${hour}:${min}`;
  let currentdate = `${weekday}, ${currentHour}`;

  return currentdate;
}

function displayCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input").value;

  if (userCity) {
    let units = "metric";
    let apiKey = "c0ed04c902a245721bb289e92dca75fe";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=${units}&appid=${apiKey}`;
    axios.get(url).then(showTemp);
  } else {
    alert("Please enter a city");
  }
}

function position(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "c0ed04c902a245721bb289e92dca75fe";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function locationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(position);
}

function showTemp(response) {
  let currentTemp = document.querySelector("#temp-data");
  let currentCity = document.querySelector("#city");
  let precipitation = document.querySelector("#precipitation");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconid = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconid}@2x.png`;

  console.log(response);
  description.innerHTML = response.data.weather[0].description;
  precipitation.innerHTML = response.data.main.feels_like;
  currentTemp.innerHTML = response.data.main.temp;
  currentCity.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  document.getElementById("img").src = iconUrl;
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-data");
  temp.innerHTML = 50;
  document.getElementById("fahrenheit").style.fontWeight = "bold";
  document.getElementById("celsius").style.fontWeight = "normal";
  document.getElementById("fahrenheit").style.opacity = "1";
  document.getElementById("celsius").style.opacity = "0.4";
}

function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-data");
  temp.innerHTML = 10;
  document.getElementById("celsius").style.fontWeight = "bold";
  document.getElementById("fahrenheit").style.fontWeight = "normal";
  document.getElementById("fahrenheit").style.opacity = "0.4";
  document.getElementById("celsius").style.opacity = "1";
}

navigator.geolocation.getCurrentPosition(position);

let displayDate = document.querySelector("#current-date");
displayDate.innerHTML = formatDate(displayDate);

let loc = document.querySelector("#location");
loc.addEventListener("click", locationTemp);

let submitCity = document.querySelector("#search-city");
submitCity.addEventListener("submit", displayCity);

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
fahrenheit.addEventListener("click", showFahrenheit);
celsius.addEventListener("click", showCelsius);
