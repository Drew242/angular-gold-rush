var showText = function (target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

$(function () {
  showText("#msg", "Welcome to 'Gold Rush'", 0, 300);   
});

//angular piece

angular.module('GoldRush', []);

angular.module('GoldRush')
  .controller('goldCtrl', goldCtrl)

function goldCtrl() {
  var gold = this;
}

//google maps piece

var map;
var myLatLng = {lat: 39.325, lng: -105.523};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 7,
    draggable: true
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation:google.maps.Animation.DROP,
    title: 'Gold Rush'
  });
}
