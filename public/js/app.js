// ==============================
// Google Autocomplete Form Stuff
// ==============================
let placeSearch = null;
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
  const addressLine1 = document.querySelector('[name=addressLine1]');
  // const addressLine2 = document.querySelector('[name=addressLine2]');
  const city = document.querySelector('[name=city]');
  const postCode = document.querySelector('[name=postCode]');
  const location = place.geometry.location.toJSON();
  lat.value = location.lat;
  lng.value = location.lng;
  addressLine1.value = `${place['address_components'][1]['short_name']} ${place['address_components'][2]['short_name']}`;
  city.value = `${place['address_components'][3]['short_name']} ${place['address_components'][6]['long_name']}`;
  postCode.value = `${place['address_components'][place['address_components'].length-1]['short_name']}`;
  console.log(location.lat);
  console.log(location.lng);
  codeAddress(document.getElementById('autocomplete').value);
}
// ===========================================
