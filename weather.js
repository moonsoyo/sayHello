const weather = document.querySelector(".js-weather");

const API_KEY = "9fb7a20c4989c9d1526ca909820a5aa4";
const COORDINATES = "coordinates";

function getWeather(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		).then(function(response){
		return response.json();
	}).then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature}°C @ ${place}`;
	});
}

function saveCoords(coordsObject){
	localStorage.setItem(COORDINATES, JSON.stringify(coordsObject));
}

function handleGeoPosition(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObject = {
		latitude: latitude,
		longitude: longitude
	};
	saveCoords(coordsObject);
	getWeather(latitude, longitude);
}

function handleGeoError(){

}

function askCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoPosition, handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDINATES);
	if (loadedCoords === null){
		askCoords();
	}
	else{
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}


function init(){
	loadCoords();
}

init();