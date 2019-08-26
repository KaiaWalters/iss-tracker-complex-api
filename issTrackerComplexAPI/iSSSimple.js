//takes a time stamp from the user and returns the position of the
// international space station at that moment
//puts that information into a second api that will display the location of the station on a
let longitude;
let latitude;
let map;
// checking
mapboxgl.accessToken = 'pk.eyJ1Ijoid2FrYWZsYWthIiwiYSI6ImNqeHhqM2QxYjAwM3MzY28xbmMxaGtoMzYifQ.7hyaI5X9hTgfupd3B47KXg';

document.querySelector("button").addEventListener('click',function(){
 fetch("http://api.open-notify.org/iss-now.json")
 .then(res => res.json())
 .then(response => {
  longitude = `${response.iss_position.longitude}`
  latitude = `${response.iss_position.latitude}`
   console.log(response);
   //document.getElementById("message").innerText = `${response.message}`
   document.getElementById("longitude").innerHTML= longitude;
   document.getElementById("latitude").innerHTML = latitude;

  map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [longitude, latitude],
   zoom: 3
   });

 })

 .catch(err => {
   console.log(`error ${err}`)
   alert("no results")
 });
})
 //should this event listener be around the entire program so that all of this runs?

 //MAP STUFFFFF

 /*
 mapboxgl.accessToken = 'pk.eyJ1Ijoid2FrYWZsYWthIiwiYSI6ImNqeHhqM2QxYjAwM3MzY28xbmMxaGtoMzYifQ.7hyaI5X9hTgfupd3B47KXg';
 var map = new mapboxgl.Map({
 container: 'map',
 style: 'mapbox://styles/mapbox/streets-v11',
 center: [-79.4512, 43.6568],
 zoom: 13
 }); */



 /* given a query in the form "lng, lat" or "lat, lng" returns the matching
 * geographic coordinate(s) as search results in carmen geojson format,
 * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
 */
 var coordinatesGeocoder = function (query) {
 // match anything which looks like a decimal degrees coordinate pair
 var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
 if (!matches) {
 return null;
 }

 function coordinateFeature(lng, lat) {
 return {
 center: [lng, lat],
 geometry: {
 type: "Point",
 coordinates: [lng, lat]
 },
 place_name: 'Lat: ' + lat + ' Lng: ' + lng, // eslint-disable-line camelcase
 place_type: ['coordinate'], // eslint-disable-line camelcase
 properties: {},
 type: 'Feature'
 };
 }

 var coord1 = Number(matches[1]);
 var coord2 = Number(matches[2]);
 var geocodes = [];

 if (coord1 < -90 || coord1 > 90) {
 // must be lng, lat
 geocodes.push(coordinateFeature(coord1, coord2));
 }

 if (coord2 < -90 || coord2 > 90) {
 // must be lat, lng
 geocodes.push(coordinateFeature(coord2, coord1));
 }

 if (geocodes.length === 0) {
 // else could be either lng, lat or lat, lng
 geocodes.push(coordinateFeature(coord1, coord2));
 geocodes.push(coordinateFeature(coord2, coord1));
 }

 return geocodes;
 };

 map.addControl(new MapboxGeocoder({
 accessToken: mapboxgl.accessToken,
 localGeocoder: coordinatesGeocoder,
 zoom: 4,
 placeholder: "Try: -40, 170",
 mapboxgl: mapboxgl
 }));



map.on('load', function() {
map.loadImage('/Users/resilientcoders20191/Desktop/Week8/iSSSimple/coo.png', function(error, image) {
if (error) throw error;
map.addImage('cat', image);
map.addLayer({
"id": "points",
"type": "symbol",
"source": {
"type": "geojson",
"data": {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [0, 0]
}
}]
}
},
"layout": {
"icon-image": "cat",
"icon-size": 0.25
}
});
});
});
