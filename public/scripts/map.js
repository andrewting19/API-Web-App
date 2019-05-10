var map;
var nycCords = {lat: 40.785, lng: -73.960};
var markerCords=nycCords;
var zoomA=12;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: nycCords});
    var marker = new google.maps.Marker({position: markerCords, map: map});
  }
