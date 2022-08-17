function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",];

	return days[day];
}
function formatDailyForecastDayMonth(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDate();
	if (day < 10) {
		day = `0${day}`;
	}
	let month = date.getMonth() + 1;
	if (month < 10) {
		month = `0${month}`;
	}
	let DayMonth = `${day}.${month}`;
	return DayMonth;
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="col">`;
	forecast.forEach(function(forecastDay, index){
		if (index < 6 && index > 0){
		forecastHTML = forecastHTML + `<div class="row-4 weather-forecast-block">
						<div class="col-md-4 weather-forecast-day">${formatDay(forecastDay.dt)}</div>
						<div class="col-md-3 weather-forecast-date">${formatDailyForecastDayMonth(forecastDay.dt)}</div>
						<div class="col-md-3 weather-forecast-icon">
							<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="60">
						</div>
						<div class="col-md-2 weather-forecast-temperatures">
							<span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°•</span>
							<span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
						</div>
					</div>`;
		}
	});
	forecastHTML = forecastHTML + `</div>`;				
	forecastElement.innerHTML = forecastHTML;
}

//==============================================================
function searchCity(event) {
	event.preventDefault();
	let currentCity = document.querySelector("#search-text-input").value;
	fetchWeatherByCity(currentCity);
	findPhotoCity(currentCity);
}

function updateWeatherByCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(fetchWeatherByCoordinate);
}


let form = document.querySelector("#lookCity");
form.addEventListener("submit", searchCity);

document.querySelector("#buttonCurrentLocation").addEventListener("click", updateWeatherByCurrentLocation);

//==============================================================
let apiKey = "847c95a73fdbcb2728943e12f70e3bee";

function getForecast(coordinates){
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
	celsiusTemperature = response.data.main.temp;

	let city = document.querySelector(".city");
	city.innerHTML = response.data.name;
	let descriptionElement = document.querySelector(".description");
	descriptionElement.innerHTML = response.data.weather[0].description;
	let temperature = Math.round(celsiusTemperature);
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = `${temperature}`;
	let humidity = response.data.main.humidity;
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = `Humidity: ${humidity}%`;
	let wind = Math.round(response.data.wind.speed);
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = `Wind: ${wind} km/h`;
	let dateElement = document.querySelector("#date");
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute ("src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

function fetchWeatherByCity(city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(showTemperature);
	findPhotoCity(city);
}

function fetchWeatherByCoordinate(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(showTemperature);
}


//==============================================================

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
};
function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

fetchWeatherByCity("Valencia");


//Dynamic background

function showPhotoCity(response) {
	let photoAuthor = document.querySelector("#photo_details");
	photoAuthor.innerHTML = `${response.data.user.first_name} ${response.data.user.last_name}`;
	photoAuthor.setAttribute("href", response.data.user.links.html);
	let elementImg = document.querySelector("body");
	elementImg.style.setProperty(
		`background-image`,
		`url(${response.data.urls.regular})`
	);
}
function findPhotoCity(city) {
	let apiPhoto = "OEBWt1FG3rDG7c3DP-lvBC1kvBf9xCg2pVZcGBMnXek";
	let apiUrlPhoto = `https://api.unsplash.com/photos/random?&query=${city}&w=1200&content-filter=high&topics=nature,sky,rain,sun,arcitecture&orientation=landscape&client_id=${apiPhoto}`;
	axios.get(apiUrlPhoto).then(showPhotoCity);
}
