

//MAP STUFF BELOW

var map;
var nycCords = {lat: 40.785, lng: -73.960};
var markerCords=nycCords;
var zoomA=12;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: nycCords});
    var marker = new google.maps.Marker({position: markerCords, map: map});
  }


  //function that inputs an array of coordinates and outputs map with markerCords
// var putMarkers = function(array, address) {
//     var mapA;
//     var center=address; //address = {lat, lng};
//     var zoomedIn=15; //experimental value
//     var markerArray = {test: "useless"};
//     function initMap() {
//       mapA = new google.maps.Map(document.getElementById('map'), {zoom: zoomedIn, center: address});
//       for(var i=0; i<array.length; i++) {
//         markerArray["marker"+(i+1)]=new google.maps.Marker({position: array[i], map: mapA});
//       }
//     }
//   };

// var address = "135 E 71 St, NY, NY 10021";
// var markers;
//
// address=address.replace(/\s/g, '+');
// address=address.replace(/,/g,"%2c");
// console.log(address);
//
// var benchmark = "Public_AR_ACS2018"; //database that we pull from
// var rstring = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address="+address+"&benchmark="+benchmark+"&format=json";
// console.log("Get request: "+rstring);
//
// request(rstring, function (error, response, body) {
//   var data = JSON.parse(body);
//   console.log("Wait for things to catch up, parsing body");
//   console.log(data);
//   console.log("\nAttempt at getting coordinates for address: \n ");
//   console.log(data.result);
//   console.log(data.result.addressMatches);
//   console.log(data.result.addressMatches[0].coordinates);
//
//   address={lat: data.result.addressMatches[0].coordinates.y,lng: data.result.addressMatches[0].coordinates.x};
//   markers=[address];
//   console.log("User_data object in server.js: \n"+user_data.address);
//   putMarkers(markers, address);
// });
