$(function () {
  var LHR = {
    name: "Heathrow",
    longitude: 42,
    latitude: 42
  };

  var FRA = {
    name: "Frankfurt",
    longitude: 24,
    latitude: 24
  };

  var CDG = {
    name: "Charles de Gaulles",
    longitude: 130,
    latitude: 130
  };

  var airports = [LHR, FRA, CDG];

  function calculateDistance(airport, position) {
    return Math.abs(airport.longitude - position.coords.longitude);
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
          console.log(airport);

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

      });
		} else {
      /* geolocation IS NOT available */
    }
  });
});