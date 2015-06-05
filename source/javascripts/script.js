$(function () {

  var AirSigns = {

    Lufthansa: {
      id: '#lufthansa'
    },

    BritishAirways: {
      id: '#britishairways'
    },

    Iberia: {
      id: '#iberia'
    },

    KLM: {
      id: '#klm'
    },

    AirFrance: {
      id: '#airfrance'
    },

    Aeroflot: {
      id: '#aeroflot'
    },

    Norwegian: {
      id: '#norwegian'
    },

    EasyJet: {

      id: '#easyjet'
    },

    Ryanair: {
      id: '#ryanair'
    }
  };

  var AMS = {
    name: "Amsterdam",
    longitude: 52.310539,
    latitude: 4.768274,
    airsign: AirSigns.KLM
  };

  var ARN = {
    name: "Stockholm",
    longitude: 59.649762,
    latitude: 17.923781,
    airsign: AirSigns.Norwegian
  };

  var ATH = {
    name: "Athens",
    longitude: 37.935647,
    latitude: 23.948416,
    airsign: AirSigns.Aeroflot
  };

  var BRU = {
    name: "Brussels",
    longitude: 50.900999,
    latitude: 4.485574,
    airsign: AirSigns.KLM
  };

  var BUD = {
    name: "Budapest",
    longitude: 47.438459,
    latitude: 19.252296,
    airsign: AirSigns.Iberia
  };

  var CDG = {
    name: "Charles de Gaulles",
    longitude: 49.009691,
    latitude: 2.547924,
    airsign: AirSigns.AirFrance
  };

  var CPH = {
    name: "Copenhagen",
    longitude: 55.618024,
    latitude: 12.650763,
    airsign: AirSigns.Norwegian
  };

  var DUB = {
    name: "Dublin",
    longitude: 53.426448,
    latitude: -6.24991,
    airsign: AirSigns.Ryanair
  };

  var FCO = {
    name: "Rome",
    longitude: 41.799887,
    latitude: 12.246238,
    airsign: AirSigns.Ryanair
  };

  var FRA = {
    name: "Frankfurt",
    longitude: 50.037933,
    latitude: 8.562152,
    airsign: AirSigns.Lufthansa
  };

  var HEL = {
    name: "Helsinki",
    longitude: 60.321042,
    latitude: 24.95286,
    airsign: AirSigns.Norwegian
  };

  var LCA = {
    name: "Cyprus",
    longitude: 34.87234,
    latitude: 33.620352,
    airsign: AirSigns.Aeroflot
  };

  var LHR = {
    name: "Heathrow",
    longitude: 51.470022,
    latitude: -0.454296,
    airsign: AirSigns.BritishAirways
  };

  var LIS = {
    name: "Lisbon",
    longitude: 38.775594,
    latitude: -9.135367,
    airsign: AirSigns.Iberia
  };

  var LJU = {
    name: "Ljubljana",
    longitude: 46.225943,
    latitude: 14.455914,
    airsign: AirSigns.EasyJet
  };

  var LUX = {
    name: "Luxembourg",
    longitude: 49.6289,
    latitude: 6.214745,
    airsign: AirSigns.Lufthansa
  };

  var MAD = {
    name: "Madrid",
    longitude: 40.483936,
    latitude: -3.567952,
    airsign: AirSigns.Iberia
  };

  var MLA = {
    name: "Malta",
    longitude: 35.854114,
    latitude: 14.48328,
    airsign: AirSigns.EasyJet
  };

  var OTP = {
    name: "Romania",
    longitude: 44.570731,
    latitude: 26.084412,
    airsign: AirSigns.Aeroflot
  };

  var PRG = {
    name: "Prag",
    longitude: 50.101791,
    latitude: 14.263181,
    airsign: AirSigns.EasyJet
  };

  var RIX = {
    name: "Riga",
    longitude: 56.922655,
    latitude: 23.973313,
    airsign: AirSigns.Norwegian
  };

  var SOF = {
    name: "Sofia",
    longitude: 42.689384,
    latitude: 23.402516,
    airsign: AirSigns.Aeroflot
  };

  var TLL = {
    name: "Tallinn",
    longitude: 59.41636,
    latitude: 24.802738,
    airsign: AirSigns.Norwegian
  };

  var VIE = {
    name: "Vienna",
    longitude: 48.115833,
    latitude: 16.566575,
    airsign: AirSigns.Lufthansa
  };

  var VNO = {
    name: "Vilnius",
    longitude: 54.638037,
    latitude: 25.286558,
    airsign: AirSigns.Aeroflot
  };

  var WAW = {
    name: "Warsaw",
    longitude: 52.167237,
    latitude: 20.967891,
    airsign: AirSigns.EasyJet
  };

  var ZAG = {
    name: "Zagreb",
    longitude: 45.74075,
    latitude: 16.067436,
    airsign: AirSigns.Ryanair
  };

  var airports = [AMS, ARN, ATH, BRU, BUD, CDG, CPH, DUB, FCO, FRA, HEL, LCA, LHR, LIS, LJU, LUX, MAD, MLA, OTP, PRG, RIX, SOF, TLL, VIE, VNO, WAW, ZAG];

  function calculateDistance(airport, position) {
    var lat1,
        lat2,
        lon_d,
        degrees_to_radians;
    degrees_to_radians = Math.PI / 180;

    lat1 = airport.latitude         * degrees_to_radians;
    lat2 = position.coords.latitude * degrees_to_radians;
    lon_d = Math.abs( airport.longitude - position.coords.longitude ) * degrees_to_radians;

    return Math.atan2(
      Math.sqrt(
        Math.pow(Math.cos(lat2) * Math.sin(lon_d), 2.0) +
        Math.pow(
          Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon_d), 2.0
        )
      ),
      Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon_d)
    );
  }

  $('#find-sign').click(function() {
    if ("geolocation" in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(function(position) {

        console.log(position);

        var closestAirport, closestDistance, distance;

        airports.forEach(function(airport){
          distance = calculateDistance(airport, position);

          if (!closestAirport) {
            closestAirport = airport;
          } else if (distance < closestAirport) {
            closestAirport = airport;
          }
        });

        console.log(closestAirport);

        $(".airsign").hide();
        $(closestAirport.airsign.id).show();

      });
    } else {
      $(airsign.FRA).show();
    }

  });

});
