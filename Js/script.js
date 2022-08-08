let now = new Date();
let showDate = document.querySelector(".date");
let showTime = document.querySelector(".time");

function formatDate(now) {
	let dayNumber = now.getDay();
	let monthNumber = now.getMonth();
	let date = now.getDate();
	let hours = now.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = now.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thuersday",
		"Friday",
		"Saturday"
	];
	let day = days[now.getDay()];

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	let month = months[now.getMonth()];

	let messageDate = `${date} ${month}, ${day}`;
	let messageTime = `${hours}:${minutes}`;
	showDate.innerHTML = messageDate;
	showTime.innerHTML = messageTime;
}

formatDate(now);

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


