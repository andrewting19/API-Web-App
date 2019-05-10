var map;
var nycCords = {lat: 40.785, lng: -73.960};
var markerCords=nycCords;
var zoomA=12;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: nycCords});
    var marker = new google.maps.Marker({position: markerCords, map: map});
  }

  //function that inputs an array of coordinates and outputs map with markerCords
  exports.putMarkers = function(array, address) {
    var mapA;
    var center=address; //address = {lat, lng};
    var zoomedIn=15; //experimental value
    var markerArray = {test: "useless"};
    function initMap() {
      mapA = new google.maps.Map(document.getElementById('map'), {zoom: zoomedIn, center: address});
      for(var i=0; i<array.length; i++) {
        markerArray["marker"+(i+1)]=new google.maps.Marker({position: array[i], map: mapA});
      }
    }
  };
