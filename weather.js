console.log("Using weather api");
var url = "http://api.openweathermap.org/data/2.5/weather?";
var apiKey = "f727bfff0a07f01698799cd08693e17a";
var apiUrl;

var xmlhttp = new XMLHttpRequest();

var latitude = 0.0;
var longitude = 0.0;

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function savePosition(position) {
    latitude = position.coords.latitude,
    longitude = position.coords.longitude;
    console.log("Lat "+latitude);
    apiUrl = url + "lat=" + latitude +"&"+ "lon=" + longitude +"&"+ "APPID=" + apiKey;
    getWeather(apiUrl); 
}

function getWeather(url) {

    xmlhttp.onreadystatechange = function (){

        if (this.status == 200) {
            console.log("Info: "+this.responseText);
            var res = JSON.parse(this.responseText);
            showWeather(res);
        } else {
            console.log("Ready state: " + this.readystate);
            console.log("Status: " + this.status);    
        }
    };

    console.log(apiUrl);
    xmlhttp.open("GET", apiUrl, true);
    xmlhttp.send();
}

function showWeather(info){
    var weatherValue = info.main.temp;
    console.log("Weather: "+weatherValue);
    weatherValue = weatherValue - 273.15;
    weatherValue = Math.round(weatherValue*100) / 100;
    document.getElementById("weather-value").innerHTML = weatherValue;
}

