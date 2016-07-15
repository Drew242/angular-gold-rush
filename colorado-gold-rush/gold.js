var showText = function (target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

$(function () {
  showText("#msg", "Welcome to 'Gold Rush'", 0, 200);
});

//google maps piece

var map;
var myLatLng = {lat: 39.325, lng: -105.523};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 7,
    draggable: false,
    zoomable: false,
    scrollwheel: false
  });

  function addMarker(location, map) {
    var icon = {
      url: 'gold-icon.png',
      scaledSize: new google.maps.Size(30, 30),
    }
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: icon,
      animation: google.maps.Animation.DROP
    })
    marker.addListener("dblclick", function() {
      marker.setMap(null);
    });
  };

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });
}

//angular piece

angular.module('GoldRush', []);

angular.module('GoldRush')
  .controller('goldCtrl', goldCtrl)

function goldCtrl() {
  var gold      = this;
  gold.message  = "Click on either map above to let us know where you've struck gold!";
  gold.pins     = [];
  gold.goldSpot = false;

  gold.dropPin = function(e) {
    var x = e.pageX - $(e.target).offset().left;
    var y = e.pageY - $(e.target).offset().top;
    wrapper = $('.topoImg')
    wrapper.append('<img class="gold-icon" style="top: ' + y + 'px; left: ' + x + 'px;"' + 'src="gold-icon.png" ng-click="gold.removePin()"/>')
    gold.goldSpot = true;
    console.log(x, y);
    console.log(gold.pins);
  }

  gold.removePin = function(event) {
    $(this).remove();
    console.log(event);
  }
}
