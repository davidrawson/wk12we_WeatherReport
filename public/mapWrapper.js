let marker;

const MapWrapper = function(coords, container, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
}


MapWrapper.prototype.addMarker = function (coords) {
  if (marker){
    marker.setPosition(coords);
  } else {
    marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
  }
  localStorage.setItem('coords', JSON.stringify(coords));

  this.getTimezone(coords);
};

MapWrapper.prototype.addClickEvent = function () {
  google.maps.event.addListener(this.googleMap, 'click', function(event){
    let coords = {lat:event.latLng.lat(), lng:event.latLng.lng()};
    this.addMarker(coords);
  }.bind(this))
};

MapWrapper.prototype.getTimezone = function(coords){
  const url = "https://maps.googleapis.com/maps/api/timezone/" + "json?location=" + coords.lat + "," + coords.lng + "&timestamp=1519587609&key=AIzaSyDUD0bMQme92l-E4XklcoWdM35RaH5-ofE";
  makeRequest(url, timezoneRequestComplete);
}
