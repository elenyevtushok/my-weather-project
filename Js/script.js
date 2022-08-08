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
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}


//==============================================================
function searchCity(event) {
	event.preventDefault();
	let currentCity = document.querySelector("#search-text-input").value;
	fetchWeatherByCity(currentCity);
}

function updateWeatherByCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(fetchWeatherByCoordinate);
}


let form = document.querySelector("#lookCity");
form.addEventListener("submit", searchCity);

document.querySelector("#buttonCurrentLocation").addEventListener("click", updateWeatherByCurrentLocation);

//==============================================================


function showTemperature(response) {
	let city = document.querySelector(".city");
	city.innerHTML = response.data.name;
	let descriptionElement = document.querySelector(".description");
	descriptionElement.innerHTML = response.data.weather[0].description;
	let temperature = Math.round(response.data.main.temp);
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
}

function fetchWeatherByCity(city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=847c95a73fdbcb2728943e12f70e3bee`;
	axios.get(apiUrl).then(showTemperature);
}

function fetchWeatherByCoordinate(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=847c95a73fdbcb2728943e12f70e3bee`;
	axios.get(apiUrl).then(showTemperature);
}


//==============================================================

let showC = document.querySelector("#celsius-link");
let showF = document.querySelector("#fahrenheit-link");
showF.addEventListener("click", convertF);
showC.addEventListener("click", convertC);

function convertF(event) {
	event.preventDefault();
	let link = document.querySelector("#degrees");
	let c = 30;
	let f = Math.round(c * 1.8 + 32);
	link.innerHTML = f;
};
function convertC(event) {
	event.preventDefault();
	let link = document.querySelector("#degrees");
	let c = 30;
	let f = Math.round(c * 1.8 + 32);
	link.innerHTML = c;
};


