let marker;

const MapWrapper = function(coords, container, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
}

// MapWrapper.prototype.addInfoWindow = function (coords, contentString) {
//   const window = new google.maps.InfoWindow({
//     position: coords,
//     map: this.googleMap,
//     content: contentString,
//   })
// };

MapWrapper.prototype.addMarker = function (coords) {
  // assigning the marker to a variable isn't necessary
  // but may be useful at a later time.
  if (marker){
    marker.setPosition(coords);
  } else {
    marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
  }
  this.getTimezone(coords);

  // formApiUrl(coords);
};

MapWrapper.prototype.addClickEvent = function () {
  google.maps.event.addListener(this.googleMap, 'click', function(event){
    // You don't construct a string. IT IS AN OBJECT !
    let coords = {lat:event.latLng.lat(), lng:event.latLng.lng()};
    this.addMarker(coords);
  }.bind(this))
};

MapWrapper.prototype.getTimezone = function(coords){
  // console.log(coords);
  const url = "https://maps.googleapis.com/maps/api/timezone/" + "json?location=" + coords.lat + "," + coords.lng + "&timestamp=1519587609&key=AIzaSyDUD0bMQme92l-E4XklcoWdM35RaH5-ofE";
  // console.log(url);
  makeRequest(url, timezoneRequestComplete);
}
