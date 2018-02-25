const  app = function(){

  const center   = {lat: 54.619007, lng: -2.276744};
  const mapDiv = document.getElementById('main-map');
  const mainMap = new MapWrapper( center, mapDiv, 6);
  mainMap.fullscreenControl = true;
  coords = mainMap.addClickEvent();

}

const formApiUrl = function(coords){
  const lat = coords.lat;
  const lon = coords.lng;
  const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIkey;

  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  // Remember, you can't do anything with the data until you have it.
  // The callback, requestComplete will fire up once loaded.
  request.addEventListener("load", callback);
  // THIS is an easy step to miss out.
  request.send();
}

const requestComplete = function(){
  // .this here refers to request from the eventlistener line.
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  // Parse the string into an array of objects
  const locationData = JSON.parse(jsonString);

  displayData(locationData);
}

const displayData = function(locationData){
  // console.log("displayDataForLocation", locationData.name);
  // console.log(locationData);
  const sunrise = timeConverter(locationData.sys.sunrise);
  // console.log(sunrise);
  const sunset = timeConverter(locationData.sys.sunset);
  // console.log(sunset);
  const temp = tempConverter(locationData.main.temp).toFixed(1);
  // console.log(temp + " degrees centigrade");
  const weatherMain = locationData.weather[0].main;
  const weatherDesc = locationData.weather[0].description;
  // console.log(weatherMain + " - " + weatherDesc);
  const windSpeedMph = windSpeedConverter(locationData.wind.speed).toFixed(0);
  // console.log(windSpeedMph + " mph");
  const rightDiv = document.getElementById("forecast");
  rightDiv.innerText = "";
  const nameHeader = document.createElement('h1');
  nameHeader.innerText = locationData.name;

  const line = document.createElement('br');

  const h3_weather = document.createElement('h3');
  h3_weather.innerText = weatherMain + " - " + weatherDesc;

  const ul = document.createElement('ul');

  const li_temp = document.createElement('li')
  li_temp.innerText = "Temperature (°C): " + temp;

  const li_humidity = document.createElement('li');
  li_humidity.innerText = "Humidity (%): " + locationData.main.humidity;

  const li_windSpeed = document.createElement('li');
  li_windSpeed.innerText = "Wind speed (MPH): " + windSpeedMph;


  const li_sunrise = document.createElement('li');
  li_sunrise.innerText = "Sunrise (UTC): " + sunrise;

  const li_sunset = document.createElement('li');
  li_sunset.innerText = "Sunset (UTC): " + sunset;

  rightDiv.appendChild(nameHeader);
  rightDiv.appendChild(line);
  rightDiv.appendChild(h3_weather);
  rightDiv.appendChild(ul);
  rightDiv.appendChild(li_temp);
  rightDiv.appendChild(li_humidity);
  rightDiv.appendChild(li_windSpeed);
  rightDiv.appendChild(line);
  rightDiv.appendChild(li_sunrise);
  rightDiv.appendChild(li_sunset);



}

const timeConverter = function (UNIX_timestamp){
  const time = new Date(UNIX_timestamp * 1000);
  let hour = time.getHours();
  if (hour < 10){
    hour  = "0" + time.getHours();
  }
  let min = time.getMinutes();
  if (min < 10){
    min = "0" + time.getMinutes();
  }
  let sec = time.getSeconds();
  if (sec < 10){
    sec = "0" + time.getSeconds();
  }
  const displayTime = hour + ':' + min + ':' + sec ;
  return displayTime;
}

const tempConverter = function(maxTemp){
  const tempDegreesC = maxTemp - 273.15;
  return tempDegreesC
}

const windSpeedConverter = function(metresPerSecond){
  const windSpeedMph = metresPerSecond * 2.23694;
  return windSpeedMph;
}





document.addEventListener('DOMContentLoaded', app);
