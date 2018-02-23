const  app = function(){
  const url = "http://openweathermap.org/data/2.5/weather?q=London,uk&appid=";
  const button = document.getElementById("display-button");

  const handleButtonClicked = function(){
    makeRequest(url, requestComplete);
  }

  // requestComplete is a callback for when the request is um completed.
  button.addEventListener("click", handleButtonClicked)
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

  displayDataForLocation(locationData);
}


const displayDataForLocation = function(locationData){
  console.log("displayDataForLocation", locationData.name);
}
