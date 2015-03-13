$(function () {

  var AirSigns = {
    BritishAirways: {
      id: '#britishairways'
    },
    Lufthansa: {
      id: '#lufthansa'
    },
    AirFrance: {
      id: '#airfrance'
    }
  }

  var LHR = {
    name: "Heathrow",
    longitude: 51.470022,
    latitude: -0.454296,
    airsign: AirSigns.BritishAirways
  };

  var FRA = {
    name: "Frankfurt",
    longitude: 50.037933,
    latitude: 8.562152,
    airsign: AirSigns.Lufthansa
  };

  var CDG = {
    name: "Charles de Gaulles",
    longitude: 49.009691,
    latitude: 2.547924,
    airsign: AirSigns.AirFrance
  };

  var airports = [LHR, FRA, CDG];

  function calculateDistance(airport, position) {
    return Math.sqrt(Math.pow(airport.longitude - position.coords.longitude, 2) + Math.pow(airport.latitude - position.coords.latitude, 2));
  }

  $('#find-sign').click(function() {
    if ("geolocation" in navigator) {
  		/* geolocation is available */
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(function(position) {
        //do_something(position.coords.latitude, position.coords.longitude);
        console.log(position);

        var closestAirport, closestDistance;

        airports.forEach(function(airport){
          distance = calculateDistance(airport, position);

          if (!closestAirport) {
            closestAirport = airport;
            closestDistance = distance;
          } else if (distance <= closestDistance) {
            closestAirport = airport;
            closestDistance = distance;
          } 
        });

        // wähle den airport der am nächsten ...
        console.log(closestAirport);

        // closestAirport = LHR;

        $(closestAirport.airsign.id).show();

      });
		} else {
      /* geolocation IS NOT available */
    }
  });
});