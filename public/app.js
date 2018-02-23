const  app = function(){

  const center   = {lat: 54.619007, lng: -2.276744};
  const mapDiv = document.getElementById('main-map');
  const mainMap = new MapWrapper( center, mapDiv, 6);
  mainMap.fullscreenControl = true;
  coords = mainMap.addClickEvent();

  // console.log("coords in app", coords);
  //
  // const lat = 55.9445699;
  // const lon = -3.1984922;
  // const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIkey;
  //
  // makeRequest(url, requestComplete);
  // // requestComplete is a callback for when the request is um completed.
  // button.addEventListener("click", handleButtonClicked)
}

const formApiUrl = function(coords){
  // const lat = 55.9445699;
  // const lon = -3.1984922;
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
  // console.log(jsonString);
  // console.log("requestComplete");
  // Parse the string into an array of objects
  const locationData = JSON.parse(jsonString);

  displayData(locationData);
}

// const retrieveData = function(coords){
//   console.log(marker);
//
//   // const lat = 55.9445699;
//   // const lon = -3.1984922;
//   const lat = coords.lat;
//   const lon = coords.lng;
//
//   const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APIkey;
//
// }

const displayData = function(locationData){
  console.log("displayDataForLocation", locationData.name);

  const sunrise = timeConverter(locationData.sys.sunrise);
  console.log(sunrise);
  const sunset = timeConverter(locationData.sys.sunset);
  console.log(sunset);

}

function timeConverter(UNIX_timestamp){
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





document.addEventListener('DOMContentLoaded', app);
