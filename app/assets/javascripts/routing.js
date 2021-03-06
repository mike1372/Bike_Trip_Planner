//debug function
function cc(a) {
    console.log(a)
}

var dirRenderer;
var directionsService = new google.maps.DirectionsService();
var autocomplete;
var elevation_data = null;
var elevations = [];
var distance = null;
var duration = null;
var markersArray = [];
var mapPaths = [];
var polyline;
var routes = null;
var slopes = null;
var SAMPLESIZE = 500;
var googleResponse;
var dbRouteData = [];
var wayPointsArray = [];

var initialize = function() {
    var renderOptions = {
        draggable: true, //routes draggable
        hideRouteList: true,
        polylineOptions: {
            strokeOpacity: 0
        }
    };
    var melbourne = new google.maps.LatLng(-37.813776, 144.963397);
    dirRenderer = new google.maps.DirectionsRenderer(renderOptions);
    var mapCanvas = document.getElementById('google-map');

    var mapOptions = {
        center: melbourne,
        zoom: 14,
        // change map type to ROADMAP for faster loading
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // provides the user with autocomplete functionality
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('start')), {
            types: ['geocode']
        });
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('end')), {
            types: ['geocode']
        });

    map = new google.maps.Map(mapCanvas, mapOptions);
    dirRenderer.setMap(map);
    elevation_data = new google.maps.ElevationService();

    autocomplete.bindTo('bounds', map);
    dirRenderer.setMap(map);

}

var setWayPoints = function(dbRouteData) {
    // cc("+++++++++++++++++++++++++++++")
    // cc("dbRouteData: " + dbRouteData);
    // cc("+++++++++++++++++++++++++++++")
    wayPointsArray = [];
    if (dbRouteData === []) {
        // leave wayPointsArray = [] to run google routing to obtain the start and end coordinates
        // cc("len " + dbRouteData.length);
    } else {

        if (dbRouteData.length === 2) {
            // return wayPointsArray = []; as previously defined
        } else if (dbRouteData.length > 2) {
            // cc(dbRouteData.length)

            // quick fix to stay under google waypoint limit of 8
            if (dbRouteData.length > 8) {
            	dbRouteData = dbRouteData.slice(0,7);
            } 
            for (i = 1; i < (dbRouteData.length) - 1; i++) {
                wayPointsArray.push({
                    location: new google.maps.LatLng(dbRouteData[i][0], dbRouteData[i][1]),
                    stopover: false
                })
            }
            // cc("setwaypoints-wayPointsArray");
            cc("+++++++++++++++++++++++++++++")
            cc(wayPointsArray);
            cc("+++++++++++++++++++++++++++++")
            calcRoute(wayPointsArray);
        }
    }
}

var calcRoute = function(wayPointsArray) {
    // reset waypoints array to empty before each use
    var start = document.getElementById('start').value + ", Victoria, Australia";
    var end = document.getElementById('end').value + ", Victoria, Australia";
    // cc('end value: ' + end)
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.BICYCLING,
        waypoints: wayPointsArray,
        optimizeWaypoints: true,
    };

    cc(directionsService);
    console.log("calcRoute-way ", wayPointsArray);

    directionsService.route(request, function(response, status) {
        if (status === "OK") {
            dirRenderer.setDirections(response);
            googleResponse = response;
            cc("****************")
            cc(wayPointsArray);
            cc("****************")
            if (wayPointsArray.length > 0) {
                // cc("true")
                updateRoutes();
            } else {
                // cc("false")
                getRoute();
            }
        }
    });
}

// obtains the safer (desired) bike route from our database of predefined and if in range returns the lat,longs
var getRoute = function() {
    console.log(googleResponse);
    var startlat = googleResponse.routes[0].legs[0].start_location.k
    var startlong = googleResponse.routes[0].legs[0].start_location.D
    var endlat = googleResponse.routes[0].legs[0].end_location.k
    var endlong = googleResponse.routes[0].legs[0].end_location.D

    var fetchBikeRoute = function(startlat, startlong, endlat, endlong) {
        $.ajax({
            url: '/bike_route.json',
            dataType: 'json',
            data: {
                start_lat: startlat,
                start_long: startlong,
                end_lat: endlat,
                end_long: endlong,
            }
        }).done(function(dbRouteData) {
            // cc("fetchBikeRoute-dbRouteData");
            // cc(dbRouteData);
            // cc("----------------------------");
            setWayPoints(dbRouteData);
        });
    };

    fetchBikeRoute(startlat, startlong, endlat, endlong);
}

google.maps.event.addDomListener(window, 'load', initialize);

var updating = false;

var updateRoutes = function() {
    // cc("UPDATE ROUTES")
    if (updating) return;
    updating = true;
    setTimeout(function() {
        updating = false;
    }, 100);

    // if (typeof googleResponse = 'undefined') {

    // }
    var routes = googleResponse.routes;
    var path = routes[0].overview_path;
    distance = routes[0].legs[0].distance;
    duration = routes[0].legs[0].duration;

    document.getElementById('distance').innerHTML = (distance.value / 1000) + " km";
    document.getElementById('travel-time').innerHTML = duration.text;

    var pathRequest = {
        'path': path,
        'samples': SAMPLESIZE
    };

    // Send an elevation request to google
    elevation_data.getElevationAlongPath(pathRequest, plotElevation);
}

var getURLParameter = function(name) {
    return decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)')
        .exec(location.search) || [, null])[1]);
}

document.getElementById("go").addEventListener(
    'click',
    function(evt) {
        document.getElementsByClassName("threeD-Map-button-panel")[0].style.opacity = 1;
        document.getElementsByClassName("threeD-Map-output")[0].style.opacity = 1;
        c.width = parseFloat(window.getComputedStyle($id("threeD-Map")).width, 10) - 4;
        // where 60px = height of 3D map button panel, 20 px top/bottom spacing, 55px = height of 3D map output
        c.height = parseFloat(window.getComputedStyle($id("threeD-Map")).height, 10) - 60 - 20 - 55 - 25;
        centerX = c.width / 2,
            centerY = c.height / 2,
            evt.preventDefault();

        // removePolylines();
        wayPointsArray = [];
        // cc("WAYPOINTS")
        // cc(wayPointsArray);
        calcRoute(wayPointsArray);

    });


// var jQuery = function setup() {
//     var a, b, c
//     var d = function() {
//         return a
//     }
//     return {
//         func: d,
//         v: a
//     }


// }

// jQuery = setup()
// jQuery.func()
// jQuery.v
