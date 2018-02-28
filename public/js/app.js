// ==============================
// Google Autocomplete Form Stuff
// ==============================
/* global google */
// let placeSearch = null;
let autocomplete = null;
let geocoder = null;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
      types: ['geocode']
    });
  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status === 'OK') {
      // This is the lat and lng results[0].geometry.location
      console.log(results[0].geometry.location);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  console.log(place);
  const lat = document.querySelector('[name="map[lat]"]');
  const lng = document.querySelector('[name="map[lng]"]');
  const postCode = document.querySelector('[name=postCode]');
  const location = place.geometry.location.toJSON();
  lat.value = location.lat;
  lng.value = location.lng;
  postCode.value = `${place['address_components'][place['address_components'].length-1]['short_name']}`;
  console.log(postCode);
  console.log(location.lat);
  console.log(location.lng);
  codeAddress(document.getElementById('autocomplete').value);
}
// ================
// Actual Map Stuff
// ================
function initMap() {
  // set attributes as 'data-whatever' to access in javascript by document.getElement().dataset.whatever
  // here we've used JSON.stringify to turn the object into a string (which we will then JSON.parse in JavaScript)
  const venue = JSON.parse(document.getElementById('map').dataset.location);
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: venue
  });
  new google.maps.Marker({
    position: venue,
    map: map
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('map')) initMap();
  if (document.getElementById('autocomplete')) initAutocomplete();
});
