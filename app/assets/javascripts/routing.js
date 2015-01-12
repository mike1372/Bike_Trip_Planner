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
    cc("dbRouteData: " + dbRouteData);
    if (dbRouteData === []) {
        // leave wayPointsArray = [] to run google routing to obtain the start and end coordinates
        cc("len " + dbRouteData.length);
    } else {

        if (dbRouteData.length === 2) {
            // return wayPointsArray = []; as previously defined
        } else if (dbRouteData.length > 2) {
            cc(dbRouteData.length)
            for (i = 1; i < (dbRouteData.length) - 1; i++) {
                wayPointsArray.push({
                    location: new google.maps.LatLng(dbRouteData[i][0], dbRouteData[i][1]),
                    stopover: false
                })
            }
            cc("setwaypoints-wayPointsArray");
            cc(wayPointsArray);
            calcRoute(wayPointsArray);
        }
    }
}

var calcRoute = function(wayPointsArray) {

    var start = document.getElementById('start').value + ", Victoria, Australia";
    var end = document.getElementById('end').value + ", Victoria, Australia";
    cc('end value: ' + end)
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
            if (wayPointsArray.length > 0) {
                cc("true")
                updateRoutes();
            } else {
                cc("false")
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
            cc("fetchBikeRoute-dbRouteData", dbRouteData);
            setWayPoints(dbRouteData);
        });
    };

    fetchBikeRoute(startlat, startlong, endlat, endlong);
}

google.maps.event.addDomListener(window, 'load', initialize);

var updating = false;

var updateRoutes = function() {
    if (updating) return;
    updating = true;
    setTimeout(function() {
        updating = false;
    }, 100);
    cc("Updating routes");

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

// Google returns elevation data to the plotElevation
var plotElevation = function(elevations, status) {
    plotSlope(elevations, SAMPLESIZE);
}

var plotSlope = function(elevations, SAMPLESIZE) {
    slopes = [];
    for (i = 0; i < elevations.length - 1; i++) {
        slope = (calcSlope(elevations[i + 1].elevation, elevations[i].elevation, distance.value / SAMPLESIZE)) * 100;
        slopes.push({
            slope: slope,
            location: midpoint(elevations[i], elevations[i + 1])
        });
    }

    drawPolyline(elevations, slopes);

    //-------injected:
    var data8 = gMaps3array(elevations, distance.value / SAMPLESIZE)
    cc("data8:")
    cc(data8)
    planes = [createGrid(fnPlane), createSlope(normalize(data8))]

    // totalθ = 0,
    //     totalφ = 0,
    //     targetAngleUP = π * 7 / 6,

    //     targetAngle = 0,
    //     zoom = 0.5,
    //     zoomTarget = 1.6,

        timer = setInterval(main, 0);
    cc("elevations, SAMPLESIZE:");
    cc(elevations, SAMPLESIZE);
    //end inject
}

var removePolylines = function() {
    for (var i = 0; i < mapPaths.length; i++) {
        mapPaths[i].setMap(null);
    }
    mapPaths = [];
}

var drawPolyline = function(elevations, slopes) {
    // Create a polyline between each elevation, color code by slope.
    // Remove any existing polylines before drawing a new polyline.
    removePolylines();

    // Define /reset upHill, downHill
    var upHill = 0;
    var downHill = 0;

    for (var i = 0; i < slopes.length; i++) {
        var routePath = [
            elevations[i].location,
            elevations[i + 1].location
        ];

        var slope = slopes[i].slope;
        var current = elevations[i].elevation
        var next = elevations[i + 1].elevation;
        if (slope > 0) {
            upHill += next - current;
        } else {
            downHill += current - next;
        }
        pathColor = slopeColor(slope)
        mapPath = new google.maps.Polyline({
            path: routePath,
            strokeColor: pathColor,
            strokeOpacity: 0.5,
            strokeWeight: 8,
            draggable: true
        });
        mapPath.setMap(map);
        mapPaths.push(mapPath);
    }
    // cc(elevations);
    document.getElementById('climb').innerHTML = parseFloat(upHill).toFixed(2) + " m";;
    document.getElementById('descent').innerHTML = parseFloat(downHill).toFixed(2) + " m";;

    // set dbRouteData = []
    // dbRouteData = [];
    cc("dbRouteData", dbRouteData)

    // update paths onClick.
    google.maps.event.addListener(dirRenderer, 'routeindex_changed', function() {
        updateRoutes();
    });
}

var elevationClear = function(x) {
    map.locationMarker.setMap(null);
}

var midpoint = function(point1, point2) {
    // To get the midpoint, find the average between each respective point
    var lat = (point1.location.lat() + point2.location.lat()) / 2;
    var lng = (point1.location.lng() + point2.location.lng()) / 2;
    return new google.maps.LatLng(lat, lng);
}

var calcSlope = function(y1, y2, dx) {
    return (y1 - y2) / dx;
}

var getURLParameter = function(name) {
    return decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)')
        .exec(location.search) || [, null])[1]);
}

document.getElementById("go").addEventListener(
    'click',
    function(evt) {
        // cc("errrrrr")
        document.getElementsByClassName("threeD-Map-button-panel")[0].style.opacity = 1; 
        document.getElementsByClassName("threeD-Map-output")[0].style.opacity = 1;
        // cc(Math.round( $id("threeD-Map").style.width))
        c.width = parseFloat(window.getComputedStyle($id("threeD-Map")).width, 10) - 4;
        // where 50px = height of 3D map button panel, 20 px top/bottom spacing, 55px = height of 3D map output
        c.height= parseFloat(window.getComputedStyle($id("threeD-Map")).height, 10) -50 -20 -55 -25;
        centerX = c.width / 2,
        centerY = c.height / 2,
        evt.preventDefault();
        
        calcRoute(wayPointsArray);
        cc("zoom")
        cc(zoom)

    });
