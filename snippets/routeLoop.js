var rendererOptions = {
    draggable: true,
    polylineOptions: {
        strokeColor: "#FF0000"
    }
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var geocoder;
var map;
var center;
var baseSet = new Boolean();
var BaseMarker;
var BaseMarkerAction;
var homeIcon = './RLimages/Home.png';
var pitchMarker;
var BaseLocation = new google.maps.LatLng(42, -71);
var W3CLocation;
var browserSupportFlag = new Boolean();
var gotW3Clocation = new Boolean();
var countW3C = 0;
var CookiesChecked = false;
var travelMode, travelDirection, travelHeading;
var allowFerries = false;
var avoidHighways = true;
var tcxSpeed;
var markerArray = [];
var markerPosition = [];
var markerLabel = [];
var markerTime = [];
var Country;
var tooLong = 0;
var tooShort = 0;
var scaleFactor = 0.80;
var scaleCount = 0;
var currentRouteData = [];
var spacedRouteData = [];
var useThis = spacedRouteData;
var fixedPoints = new Array;
var rlPoints = new Array();
var rlPointsNew = new Array();
var routeResult;
var routeLatLng = new Array;
var totalDistanceInCurrentUnits;
var requestedLengthInMeters;
var targetLengthInMeters;
var rlPoints = new Array();
var Velocity, Time, Dist;
var countCalcs = 0;
var resultHistory = new Array;
var historyPointer;
var storeInHistory;
var lastRemoved = -1;
var uBase;
var urlPoints = new Array();
var utMode;
var ulen;
var uuS;
var uClean;
var parsedUrl = false;
var haveGoodUrl = false;
var haveOldUrl = new Boolean();
var haveEmbedded = new Boolean();
var oldUrlLng, oldUrlLat;
var oldUrlLen;
var oldUrlRnd;
var OldUrlAllow;
var numMM;
var mileMarkers = [];
var RlUrl;
var RLroutes = [];
var myText;
var weatherLayer, cloudLayer;
google.load("visualization", "1", {
    packages: ["columnchart"]
});
var elevDist = [];
var pointArray = [];
var importedPolyline = [];
var importedTracks = new Array;
var DoClean = true;
var countCalcs = 0;
var circleArray = [];
var circleAsked = [];
var wayFlags = [];
var ePlot = false;
var rtTraffic = false;
var rtWeather = false;
var showingMarkers = false;
var measuring = false;
var rulerMarkers = new Array;
var rulerClickListener;
var rulerLine;
var Language = new String();
var MILES2KM = 5280 * 12 * 2.54 / 100 / 1000;
var KM2MILES = 1 / MILES2KM;
var Feet2Meters = 12 * 2.54 / 100;
var cueText;
var Directions;
var OpenCycleMapTypeOptions = {
    getTileUrl: function(coord, zoom) {
        var normalizedCoord = getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
            return null;
        }
        var bound = Math.pow(2, zoom);
        return 'http://tile.thunderforest.com/cycle' + '/' + zoom + '/' + normalizedCoord.x + '/' + normalizedCoord.y + '.png';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 18,
    minZoom: 0,
    radius: 6371000,
    name: 'OpenCycleMap'
};
var OpenCycleMapType = new google.maps.ImageMapType(OpenCycleMapTypeOptions);
var rotateIndex = -1;
var rotatingMessages = new Array;
var rotatingMessage;
var iAmRotating = false;
rotatingMessages.push("<strong><a href='http://www.garmin.com' target='_blank'>Garmin</a> has RouteLoops inside!</strong><br/>" + "Very exciting news.  The new " + "<a href='https://buy.garmin.com/en-US/US/into-sports/cycling/edge-touring-plus/prod143677.html' target='_blank'>" + "Garmin 'Edge Touring'</a> bike computer now contains RouteLoops! Click it once, and " + "it returns 3 options for you to try.  RouteLoops on a GPS.  It's like a dream.<br\>" + "<a href='./CombinedImage2.jpg' target='_blank'><img src='CombinedImage2.jpg' height='42' width='42'></a>" + " Click the image to see it up close and personal. ");
rotatingMessages.push("<strong><a href='http://www.mapmyfitness.com' target='_blank'>MapMyFitness</a> has RouteLoops inside!</strong><br/>" + "MapMyFitness now offers " + "<a href='http://www.mapmyfitness.com/maps/auto_route/' target='_blank'>" + "Route Genius!</a>  Become an MVP member and generate RouteLoops right from your MMF account.");
rotatingMessages.push("<strong><a href='http://www.routeloops.com/LostAndFound' target='_blank'>RouteLoops Lost and Found</a></strong><br/>" + "Have you ever lost something while out running, biking, or doing whatever it is you do?<br/>" + "Have you found something?<br/>" + "Either way, check out the new " + "<a href='http://www.routeloops.com/LostAndFound' target='_blank'>Lost and Found</a> " + "page, and help people get their stuff back.<br/>");
rotatingMessages.push("<strong><a href='http://www.routeloops.com/OSM' target='_blank'>Open Street Maps Version</a></strong><br/>" + "Try out the new OSM version of RouteLoops!<br/><ul>" + "<li>Drag more points than with Google Maps for more control over your route.</li/>" + "<li>Have more input into the roads you use, like toll roads, unpaved roads, seasonal roads, etc.</li/>" + "<li>Select amoung various road-grade options: avoid hills, favor hills, etc.</li/></ul>");
rotatingMessages.push("<strong><a href='http://www.garmin.com' target='_blank'>Garmin</a> puts RouteLoops into the Edge 1000!</strong><br/>" + "The " + "<a href='https://buy.garmin.com/en-US/US/into-sports/cycling/edge-1000/prod134491.html' target='_blank'>" + "Garmin 'Edge 1000'</a> bike computer now contains RouteLoops! Works even better than the Edge Touring " + "version in my opinion.  If you don't have one of these, you really need to get yourself one.");
rotatingMessages.push("<strong><a href='http://www.garmin.com' target='_blank'>Garmin</a> lets motorcyclists RouteLoops too!</strong><br/>" + "The " + "<a href='https://buy.garmin.com/en-US/US/on-the-road/motorcycles/zumo-590lm/prod145273.html' target='_blank'>" + "Garmin 'zumo 590 LM'</a> motorcycle computer now contains RouteLoops! Very cool.  It shows up as an 'app' " + "that lets motorcyclists tool around on curvy roads and the like.  Why should bikes have all the fun?");

function initialize() {
    BBgo();
    extractLanguage();
    var currentURL = location.href;
    var query = "";
    if (currentURL.indexOf("?") >= 0)
        var query = currentURL.slice(currentURL.indexOf("?"), currentURL.length);
    else
        var query = "";
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    document.getElementById("crYear").innerHTML = year;
    var navAgent = navigator.userAgent;
    if (navAgent.toLowerCase().indexOf("android") > -1 || navAgent.toLowerCase().indexOf("ipod") > -1 || navAgent.toLowerCase().indexOf("iphone") > -1 || navAgent.toLowerCase().indexOf("ipad") > -1)
        var answer = confirm("Go to mobile site?");
    if (answer) location.replace("http://www.routeloops.com/mobile" + query);
    document.getElementById("trackRead").addEventListener('change', importTrack, false);
    geocoder = new google.maps.Geocoder();
    baseSet = false;
    if (query.length > 0) checkForPermalink(currentURL);
    if (!baseSet) checkForCookies();
    getLength();
    travelMode = document.getElementById("travelMode").value;
    travelDirection = document.getElementById("travelDirection").value;
    travelHeading = document.getElementById("travelHeading").value;
    var Lat, Lng;
    if (baseSet) {
        Lat = BaseLocation.lat();
        Lng = BaseLocation.lng();
    } else {
        Lat = 40.735383;
        Lng = -73.984655;
    }
    var initialLocation = new google.maps.LatLng(Lat, Lng);
    var mapTypeControlOpts = {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN, 'OpenCycleMap'],
        position: google.maps.ControlPosition.TOP_RIGHT,
        style: google.maps.MapTypeControlStyle.DEFAULT
    };
    var rotateControlOpts = {
        position: google.maps.ControlPosition.TOP_CENTER
    };
    var myOptions = {
        zoom: 2,
        tilt: 45,
        scaleControl: true,
        rotateControl: true,
        rotateControlOptions: rotateControlOpts,
        mapTypeControl: true,
        mapTypeControlOptions: mapTypeControlOpts,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: initialLocation,
        disableDoubleClickZoom: true
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    map.mapTypes.set('OpenCycleMap', OpenCycleMapType);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    trafficLayer = new google.maps.TrafficLayer();
    weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    });
    weatherLayer.setMap(map);
    cloudLayer = new google.maps.weather.CloudLayer();
    cloudLayer.setMap(map);
    stepDisplay = new google.maps.InfoWindow({
        pixelOffset: {
            width: 00,
            height: -30
        }
    });
    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        routeResult = directionsDisplay.directions;
        computeTotalDistance(routeResult);
        buildDirections(routeResult);
        flagPoints();
        storeRouteData();
    });
    google.maps.event.addListener(map, "dblclick", function(mEvent) {
        BaseLocation = mEvent.latLng;
        document.getElementById("address").value = BaseLocation.toString();
        createBaseMarker();
        codeAddress();
        calcRoute();
    });
    google.maps.event.addListener(map, "rightclick", function(mEvent) {
        var close = 0;
        var test = 0;
        var kill = 0;
        close = LatLngDist(mEvent.latLng.lat(), mEvent.latLng.lng(), directionsDisplay.directions.routes[0].legs[0].via_waypoint[0].location.lat(), directionsDisplay.directions.routes[0].legs[0].via_waypoint[0].location.lng());
        for (var i = 1; i < directionsDisplay.directions.routes[0].legs[0].via_waypoint.length; i++) {
            test = LatLngDist(mEvent.latLng.lat(), mEvent.latLng.lng(), directionsDisplay.directions.routes[0].legs[0].via_waypoint[i].location.lat(), directionsDisplay.directions.routes[0].legs[0].via_waypoint[i].location.lng());
            if (test < close) {
                close = test;
                kill = i;
            }
        }
        var answer = confirm("The waypoint to be removed is at " + directionsDisplay.directions.routes[0].legs[0].via_waypoint[kill].location.toString());
        if (answer) {
            directionsDisplay.directions.routes[0].legs[0].via_waypoint.splice(kill, 1);
            rlPoints = new Array();
            for (var i = 0; i < directionsDisplay.directions.routes[0].legs[0].via_waypoint.length; i++) {
                rlPoints[i] = directionsDisplay.directions.routes[0].legs[0].via_waypoint[i].location;
            }
            calcRoute();
        }
    });
    if (baseSet) {
        createBaseMarker();
        codeAddress();
    }
    var permalink;
    var protocol = location.protocol;
    var host = location.host;
    var path = location.pathname;
    permalink = protocol + "//" + host + path;
    document.getElementById("permalink").href = permalink;
    permalink = protocol + "//" + host + "/OSM";
    document.getElementById("OSMversion").href = permalink;
    if (query.length > 0 && baseSet) calcRoute();
}

function getW3Clocation() {
    countW3C++;
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
        W3CLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        gotW3Clocation = true;
        BaseLocation = W3CLocation;
        map.setCenter(BaseLocation);
        map.setZoom(13);
        var infowindow = new google.maps.InfoWindow();
        document.getElementById("address").value = BaseLocation.toString();
        codeAddress();
    }, function() {
        BaseLocation = new google.maps.LatLng(42, -71);
        gotW3Clocation = false;
    }, {
        maximumAge: 1000
    });
    return;
}

function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;
    var tileRange = 1 << zoom;
    if (y < 0 || y >= tileRange) {
        return null;
    }
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }
    return {
        x: x,
        y: y
    };
}

function checkForPermalink(currentURL) {
    if (parseUrl(currentURL)) {
        if (uBase) document.getElementById("address").value = uBase.lat() + "," + uBase.lng();
        BaseLocation = new google.maps.LatLng(uBase.lat(), uBase.lng());
        baseSet = true;
        for (var i = 0; i < urlPoints.length; i++) rlPoints[i] = new google.maps.LatLng(urlPoints[i].lat(), urlPoints[i].lng());
        travelMode = utM;
        document.getElementById("travelMode").value = utM;
        if (uuS == 0)
            document.getElementById("length").value = ulen;
        else if (uuS == 1)
            document.getElementById("length").value = (ulen * KM2MILES).toFixed(2);
        if (!uClean) {
            DoClean = true;
            toggleAutoClean();
        }
    } else {
        if (haveOldUrl) {
            document.getElementById("address").value = oldUrlLat + "," + oldUrlLng;
            BaseLocation = new google.maps.LatLng(oldUrlLat, oldUrlLng);
            baseSet = true;
        }
        if (haveEmbedded) {
            parsedUrl = true;
        }
    }
    return;
}

function checkForCookies() {
    var CookieLength = readCookie("length");
    if (CookieLength != null) document.getElementById("length").value = CookieLength;
    var CookieTM = readCookie("TM");
    if (CookieTM != null) document.getElementById("travelMode").value = parseInt(CookieTM);
    var CookieTD = readCookie("TD");
    if (CookieTD != null) document.getElementById("travelDirection").value = parseInt(CookieTD);
    var CookieUS = readCookie("US");
    if (CookieUS != null) document.getElementById("unitSystem").value = parseInt(CookieUS);
    var CookieClean = readCookie("Clean");
    var CookieAddress = readCookie("address");
    if (CookieAddress != null) {
        document.getElementById("address").value = CookieAddress;
        $("#address").removeClass("watermark");
        codeAddress();
        if (CookieClean == "Turn AutoClean On") toggleAutoClean();
    }
    if (document.getElementById("unitSystem").value == 0) {
        document.getElementById("total_1").innerHTML = "0 miles";
        document.getElementById("inputUnits").innerHTML = "miles";
        document.getElementById("tcxUnits").innerHTML = "feet";
        document.getElementById("tcxSpeedUnits").innerHTML = "mph";
    } else {
        document.getElementById("total_1").innerHTML = "0 kilometers";
        document.getElementById("inputUnits").innerHTML = "kilometers";
        document.getElementById("tcxUnits").innerHTML = "meters";
        document.getElementById("tcxSpeedUnits").innerHTML = "kph";
    }
    return;
}

function importTrack(evt) {
    if (typeof evt == 'undefined') {
        alert("Please choose a file using the file selector button.");
        document.getElementById("trackRead").vale = null;
        return;
    }
    f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            if (contents.length > 0) {
                contents = contents.replace(/&lt;/g, "<");
                contents = contents.replace(/&gt;/g, ">");
                parseText(contents);
            }
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file.");
    }
    return;
}

function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (BaseMarker) BaseMarker.setMap(null);
            BaseLocation = results[0].geometry.location;
            BaseMarker = placeMarker(BaseLocation, 'Home - Start/Stop');
            map.setCenter(BaseLocation);
            BaseMarker.setZIndex(1000);
            BaseMarker.setIcon(homeIcon);
            BaseMarker.setTitle("Start/Stop @ " + results[0].formatted_address);
            document.getElementById("address").value = results[0].formatted_address;
            if (BaseMarkerAction) google.maps.event.removeListener(BaseMarkerAction);
            BaseMarkerAction = google.maps.event.addListener(BaseMarker, 'dragend', function(mEvent) {
                BaseLocation = mEvent.latLng;
                document.getElementById("address").value = mEvent.latLng.toString();
                codeAddress();
            });
            if (map.getZoom() == 2) map.setZoom(11);
            baseSet = true;
            var list = results[0].address_components.length;
            for (var i = 0; i < list; i++) {
                if (results[0].address_components[i].types == "country,political") Country = results[0].address_components[i].long_name;
            }
            if (Language == "JP")
                document.getElementById("GoButton").value = "ã“ã®è·é›¢ã®ãƒ«ãƒ¼ãƒˆã‚’æŽ¢ã™";
            else if (Language == "FR")
                document.getElementById("GoButton").value = "CrÃ©ez un circuit de cette distance";
            else
                document.getElementById("GoButton").value = "Create a Route of this Length";
        } else {
            alert("Geocode returned: " + status + "\n This may only be so much gobbledygook. \n Please make sure you have an address in the address field.");
        }
    });
    return;
}

function handleFixed(nFix) {
    for (var i = 0; i < fixedPoints.length; i++) fixedPoints[i].marker.setMap(null);
    fixedPoints.length = 0;
    var id = "fixedPoint_" + nFix;
    var address = document.getElementById(id).value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            var marker = placeMarker(location, 'Fixed Waypoint');
            marker.setTitle("Waypoint @ " + results[0].formatted_address);
            document.getElementById(id).value = results[0].formatted_address;
            var markerAction = google.maps.event.addListener(marker, 'dragend', function(mEvent) {
                var moveTo = mEvent.latLng;
                document.getElementById(id).value = mEvent.latLng.toString();
                handleFixed(nFix);
            });
            fixedPoints.push({
                marker: marker,
                action: markerAction
            });
        } else {
            if (address.length != 0) alert("Geocode of " + address + " returned: " + status);
        }
    });
    return;
}

function getRLpoints() {
    for (var i = 0; i < importedTracks.length; i++)
        if (importedTracks[i]) importedTracks[i].setMap(null);
    historyPointer = resultHistory.length;
    storeInHistory = true;
    if (pitchMarker) pitchMarker.setMap(null);
    if (fixedPoints.length > 0)
        fixedPointRoute(targetLengthInMeters);
    else {
        var pickMethod = Math.floor(3 * Math.random());
        if (pickMethod == 0) {
            circleRoute(targetLengthInMeters);
        }
        if (pickMethod == 1) {
            rectangleRoute(targetLengthInMeters);
        }
        if (pickMethod == 2) {
            fig8Route(targetLengthInMeters);
        }
    }
    return;
}

function calcRoute() {
    if (rlPoints.length == 0) return;
    countCalcs++;
    if (document.getElementById("unitSystem").value == 0)
        var units = google.maps.DirectionsUnitSystem.IMPERIAL;
    else if (document.getElementById("unitSystem").value == 1)
        var units = google.maps.DirectionsUnitSystem.METRIC;
    var wpts = [];
    for (var i = 0; i < rlPoints.length; i++) {
        wpts.push({
            location: rlPoints[i],
            stopover: false
        });
    }
    travelMode = document.getElementById("travelMode").value;
    travelDirection = document.getElementById("travelDirection").value;
    travelHeading = document.getElementById("travelHeading").value;
    var checkHiWay = parseInt(document.getElementById("highways").value);
    if (checkHiWay == 0) avoidHighways = true;
    else if (checkHiWay == 1) avoidHighways = false;
    var gTravelMode;
    if (travelMode == 0) gTravelMode = google.maps.DirectionsTravelMode.DRIVING;
    else if (travelMode == 1) gTravelMode = google.maps.DirectionsTravelMode.BICYCLING;
    else if (travelMode == 2) gTravelMode = google.maps.DirectionsTravelMode.WALKING;
    var storage;
    storage = "Base=" + BaseLocation.lat() + ":" + BaseLocation.lng();
    storage = storage + "&tM=" + travelMode;
    storage = storage + "&len=" + document.getElementById("length").value;
    storage = storage + "&unitS=" + document.getElementById("unitSystem").value;
    storage = storage + "&address=" + document.getElementById("address").value;
    storage = storage + "&function=calcRoute";
    var fromHere = BaseLocation;
    var toHere = BaseLocation;
    var request = {
        origin: fromHere,
        destination: toHere,
        waypoints: wpts,
        travelMode: gTravelMode,
        avoidHighways: avoidHighways,
        unitSystem: units
    };
    directionsService.route(request, examineRoute);
    return;
}

function examineRoute(response, status) {
    if (status != google.maps.DirectionsStatus.OK) {
        if (travelMode != 1)
            alert("The Google directions service says: " + status + ".\n" + "Please try again.");
        else if (travelMode == 1)
            alert("The Google directions service says: " + status + ".\n" + "You have selected the BIKE mode, but this may not be available in your location.\n" + "Please select a different travel mode setting in the Settings Menu and try again.");
        return;
    }
    var thisRoute = response.routes[0].legs[0];
    routeLatLng.length = 0;
    var step = response.routes[0].legs[0].steps.length;
    for (var i = 0; i < thisRoute.steps.length; i++) {
        var path = thisRoute.steps[i].path;
        for (var j = 0; j < path.length; j++) {
            if (i > 0 && j == 0) continue;
            var lat = thisRoute.steps[i].path[j].lat();
            var lng = thisRoute.steps[i].path[j].lng();
            var loc = new google.maps.LatLng(lat, lng);
            routeLatLng.push({
                location: loc,
                narrative: ""
            });
        }
    }
    var removedPoints;
    if (DoClean) removedPoints = cleanTails(response);
    else if (!DoClean) removedPoints = -1;
    if (removedPoints > 0 && removedPoints != lastRemoved) {
        lastRemoved = removedPoints;
        $('#progress').remove();
        calcRoute();
    } else {
        $('#progress').remove();
        computeTotalDistance(response);
        if (!compareToPlan(response)) {
            getRLpoints();
            calcRoute();
        }
        countCalcs = 0;
        adjustScale();
        routeResult = response;
        showSteps(response);
        directionsDisplay.setDirections(response);
        if (storeInHistory) makeHistory(response);
        if (response.routes[0].warnings.length > 0)
            document.getElementById("modeWarning").innerHTML = "<b><i>" + response.routes[0].warnings[0] + "</i></b>";
        else
            document.getElementById("modeWarning").innerHTML = "";
        flagPoints();
        storeRouteData();
        makePermalink();
        writeCookies();
        if (Language == "JP")
            document.getElementById("GoButton").value = "ã“ã®è·é›¢ã®ãƒ«ãƒ¼ãƒˆã‚’æŽ¢ã™";
        else if (Language == "FR")
            document.getElementById("GoButton").value = "CrÃ©ez un circuit de cette distance";
        else
            document.getElementById("GoButton").value = "Create a Different Route\nof the Same Length";
    }
    return;
}

function computeTotalDistance(result) {
    var total = 0;
    var timeTot;
    var timeH = 0;
    var timeM = 0;
    var timeText;
    var speed = parseFloat(document.getElementById("tcxSpeed").value);
    var myroute = result.routes[0];
    for (i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    if (document.getElementById("unitSystem").value == 0) {
        total = total * 100 / 2.54 / 12 / 5280;
        var tP = Math.log(total) / Math.log(10);
        tP = Math.floor(tP);
        tP += 3;
        document.getElementById("total_1").innerHTML = total.toPrecision(tP) + " miles";
        totalDistanceInCurrentUnits = total;
    } else {
        total = total / 1000;
        var tP = Math.log(total) / Math.log(10);
        tP = Math.floor(tP);
        tP += 3;
        document.getElementById("total_1").innerHTML = total.toPrecision(tP) + " kilometers";
        totalDistanceInCurrentUnits = total;
    }
    timeTot = total / speed * 60 * 60;
    timeH = hours(timeTot);
    timeM = minutes(timeTot);
    if (timeH > 0) timeText = timeH + " hours ";
    else timeText = "";
    if (timeM > 0) timeText += timeM + " min ";
    else timeText += "";
    document.getElementById("routeTime").innerHTML = timeText;
    return;
}

function changeSpeed() {
    var total = totalDistanceInCurrentUnits;
    var timeTot;
    var timeH = 0;
    var timeM = 0;
    var timeText;
    var speed = parseFloat(document.getElementById("tcxSpeed").value);
    timeTot = total / speed * 60 * 60;
    timeH = hours(timeTot);
    timeM = minutes(timeTot);
    if (timeH > 0) timeText = timeH + " hours ";
    else timeText = "";
    if (timeM > 0) timeText += timeM + " min ";
    else timeText += "";
    document.getElementById("routeTime").innerHTML = timeText;
    return;
}

function fixedPointRoute(length) {
    var distToFixed = computeDistanceBetween(BaseLocation, fixedPoints[0].marker.getPosition());
    if (distToFixed / requestedLengthInMeters > 0.5) {
        alert("The distance requested is less than half the straight line distance to the fixed waypoint.  No way to close a route.");
    } else {
        var brngToFixed = getBearing(BaseLocation, fixedPoints[0].marker.getPosition());
        var minTurn = 20;
        var maxTurn = 160;
        var direction = Math.random() * (maxTurn - minTurn) + minTurn;
        var side = Math.floor(2 * Math.random());
        if (side == 0) direction = direction;
        if (side == 1) direction = -1 * direction;
        var newBearing = brngToFixed + direction * Math.PI / 180;
        var step = 0;
        var toHere;
        var allLegs = 0;
        while (allLegs < length) {
            step += 1;
            toHere = getNewPointAlongBearing(fixedPoints[0].marker.getPosition(), step, newBearing);
            allLegs = distToFixed + computeDistanceBetween(fixedPoints[0].marker.getPosition(), toHere) + computeDistanceBetween(toHere, BaseLocation);
        }
        var newBearing2 = newBearing + (1 - side * 2) * 5 * Math.PI / 180;
        var toHere2 = getNewPointAlongBearing(fixedPoints[0].marker.getPosition(), step, newBearing2);
        rlPoints.length = 0;
        rlPoints.push(fixedPoints[0].marker.getPosition());
        rlPoints.push(toHere);
        rlPoints.push(toHere2);
    }
    return;
}

function circleRoute(length) {
    var radius = length / 2 / Math.PI;
    var circlePoints = 4;
    var deg = [];
    if (travelHeading == 0)
        var direction = Math.random() * 2 * Math.PI;
    else if (travelHeading == 1)
        var direction = Math.random() * Math.PI / 4 + 3 * Math.PI / 8;
    else if (travelHeading == 2)
        var direction = Math.random() * Math.PI / 4 + 1 * Math.PI / 8;
    else if (travelHeading == 3)
        var direction = Math.random() * Math.PI / 4 - Math.PI / 8;
    else if (travelHeading == 4)
        var direction = Math.random() * Math.PI / 4 + 13 * Math.PI / 8;
    else if (travelHeading == 5)
        var direction = Math.random() * Math.PI / 4 + 11 * Math.PI / 8;
    else if (travelHeading == 6)
        var direction = Math.random() * Math.PI / 4 + 9 * Math.PI / 8;
    else if (travelHeading == 7)
        var direction = Math.random() * Math.PI / 4 + 7 * Math.PI / 8;
    else if (travelHeading == 8)
        var direction = Math.random() * Math.PI / 4 + 5 * Math.PI / 8;
    var dx = radius * Math.cos(direction);
    var dy = radius * Math.sin(direction);
    var delta_lat = dy / 110540;
    var delta_lng = dx / (111320 * Math.cos(BaseLocation.lat() * Math.PI / 180));
    center = new google.maps.LatLng(BaseLocation.lat() + delta_lat, BaseLocation.lng() + delta_lng);
    deg[0] = direction + Math.PI;
    if (travelDirection == 0)
        var sign = -1;
    else
        var sign = +1;
    for (var i = 1; i < circlePoints + 1; i++) {
        deg[i] = deg[i - 1] + sign * 2 * Math.PI / (circlePoints + 1);
        dx = radius * Math.cos(deg[i]);
        dy = radius * Math.sin(deg[i]);
        delta_lat = dy / 110540;
        delta_lng = dx / (111320 * Math.cos(center.lat() * Math.PI / 180));
        rlPoints[i - 1] = new google.maps.LatLng(center.lat() + delta_lat, center.lng() + delta_lng);
    }
}

function rectangleRoute(length) {
    var direction = 0;
    var angle = 0;
    rlPoints.length = 0;
    var maxRatio = 5;
    var minRatio = 1. / maxRatio;
    var deltaRatio = maxRatio - minRatio;
    var ratio = Math.random() * deltaRatio + minRatio;
    var width = length / (2 * ratio + 2);
    var height = width * ratio;
    var diagonal = Math.sqrt(width * width + height * height);
    var theta = Math.acos(height / diagonal);
    if (travelHeading == 0)
        var direction = Math.random() * 2 * Math.PI;
    else if (travelHeading == 1)
        var direction = Math.random() * Math.PI / 4 + 3 * Math.PI / 8;
    else if (travelHeading == 2)
        var direction = Math.random() * Math.PI / 4 + 1 * Math.PI / 8;
    else if (travelHeading == 3)
        var direction = Math.random() * Math.PI / 4 - Math.PI / 8;
    else if (travelHeading == 4)
        var direction = Math.random() * Math.PI / 4 + 13 * Math.PI / 8;
    else if (travelHeading == 5)
        var direction = Math.random() * Math.PI / 4 + 11 * Math.PI / 8;
    else if (travelHeading == 6)
        var direction = Math.random() * Math.PI / 4 + 9 * Math.PI / 8;
    else if (travelHeading == 7)
        var direction = Math.random() * Math.PI / 4 + 7 * Math.PI / 8;
    else if (travelHeading == 8)
        var direction = Math.random() * Math.PI / 4 + 5 * Math.PI / 8;
    if (travelDirection == 0)
        var sign = -1;
    else
        var sign = +1;
    angle = 0 + direction;
    var dx = height * Math.cos(angle);
    var dy = height * Math.sin(angle);
    var delta_lat = dy / 110540;
    var delta_lng = dx / (111320 * Math.cos(BaseLocation.lat() * Math.PI / 180));
    rlPoints[0] = new google.maps.LatLng(BaseLocation.lat() + delta_lat, BaseLocation.lng() + delta_lng);
    angle = sign * theta + direction;
    var dx = diagonal * Math.cos(angle);
    var dy = diagonal * Math.sin(angle);
    var delta_lat = dy / 110540;
    var delta_lng = dx / (111320 * Math.cos(BaseLocation.lat() * Math.PI / 180));
    rlPoints[1] = new google.maps.LatLng(BaseLocation.lat() + delta_lat, BaseLocation.lng() + delta_lng);
    angle = sign * Math.PI / 2 + direction;
    var dx = width * Math.cos(angle);
    var dy = width * Math.sin(angle);
    var delta_lat = dy / 110540;
    var delta_lng = dx / (111320 * Math.cos(BaseLocation.lat() * Math.PI / 180));
    rlPoints[2] = new google.maps.LatLng(BaseLocation.lat() + delta_lat, BaseLocation.lng() + delta_lng);
    return;
}

function fig8Route(length) {
    var radius = length / 4 / Math.PI;
    var circlePoints = 3;
    var deg = [];
    var rlpCount;
    if (travelHeading == 0)
        var direction = Math.random() * 2 * Math.PI;
    else if (travelHeading == 1)
        var direction = Math.random() * Math.PI / 4 + 3 * Math.PI / 8;
    else if (travelHeading == 2)
        var direction = Math.random() * Math.PI / 4 + 1 * Math.PI / 8;
    else if (travelHeading == 3)
        var direction = Math.random() * Math.PI / 4 - Math.PI / 8;
    else if (travelHeading == 4)
        var direction = Math.random() * Math.PI / 4 + 13 * Math.PI / 8;
    else if (travelHeading == 5)
        var direction = Math.random() * Math.PI / 4 + 11 * Math.PI / 8;
    else if (travelHeading == 6)
        var direction = Math.random() * Math.PI / 4 + 9 * Math.PI / 8;
    else if (travelHeading == 7)
        var direction = Math.random() * Math.PI / 4 + 7 * Math.PI / 8;
    else if (travelHeading == 8)
        var direction = Math.random() * Math.PI / 4 + 5 * Math.PI / 8;
    var dx = radius * Math.cos(direction);
    var dy = radius * Math.sin(direction);
    var delta_lat = dy / 110540;
    var delta_lng = dx / (111320 * Math.cos(BaseLocation.lat() * Math.PI / 180));
    center = new google.maps.LatLng(BaseLocation.lat() + delta_lat, BaseLocation.lng() + delta_lng);
    deg[0] = direction + Math.PI;
    if (travelDirection == 0)
        var sign = -1;
    else
        var sign = +1;
    rlpCount = 0;
    for (var i = 1; i < circlePoints + 1; i++) {
        deg[i] = deg[i - 1] + sign * 2 * Math.PI / (circlePoints + 1);
        dx = radius * Math.cos(deg[i]);
        dy = radius * Math.sin(deg[i]);
        delta_lat = dy / 110540;
        delta_lng = dx / (111320 * Math.cos(center.lat() * Math.PI / 180));
        rlPoints[rlpCount] = new google.maps.LatLng(center.lat() + delta_lat, center.lng() + delta_lng);
        rlpCount++;
    }
    direction = direction + Math.PI;
    var dx = radius * Math.cos(direction);
    var dy = radius * Math.sin(direction);
    var delta_lat = dy / 110540;
    var delta_lng = dx / (111320 * Math.cos(BaseLocation.lat() * Math.PI / 180));
    center = new google.maps.LatLng(BaseLocation.lat() + delta_lat, BaseLocation.lng() + delta_lng);
    deg.length = 0;
    deg[0] = direction + Math.PI;
    if (travelDirection == 0)
        var sign = +1;
    else
        var sign = -1;
    for (var i = 1; i < circlePoints + 1; i++) {
        deg[i] = deg[i - 1] + sign * 2 * Math.PI / (circlePoints + 1);
        dx = radius * Math.cos(deg[i]);
        dy = radius * Math.sin(deg[i]);
        delta_lat = dy / 110540;
        delta_lng = dx / (111320 * Math.cos(center.lat() * Math.PI / 180));
        rlPoints[rlpCount] = new google.maps.LatLng(center.lat() + delta_lat, center.lng() + delta_lng);
        rlpCount++;
    }
    return;
}

function LatLngDist(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function hours(secs) {
    return Math.floor(Math.max(secs, 0) / 3600.0);
}

function minutes(secs) {
    return Math.floor((Math.max(secs, 0) % 3600.0) / 60.0);
}

function seconds(secs) {
    return Math.round(Math.max(secs, 0) % 60.0);
}

function padZeros(theNumber, max) {
    var numStr = String(theNumber);
    while (numStr.length < max) {
        numStr = '0' + numStr;
    }
    return numStr;
}

function placeMarker(location, text) {
    var marker = new google.maps.Marker({
        position: location,
        draggable: true,
        map: map,
        title: text
    });
    return marker;
}

function createBaseMarker() {
    if (BaseMarker) BaseMarker.setMap(null);
    var Address = document.getElementById("address").value;
    BaseMarker = placeBase(BaseLocation, 'Start/End at:' + Address);
    BaseMarker.setZIndex(1000);
    BaseMarker.setIcon(homeIcon);
    google.maps.event.removeListener(BaseMarkerAction);
    BaseMarkerAction = google.maps.event.addListener(BaseMarker, 'dragend', baseLocation);
    return;
}

function placeBase(location, text) {
    var marker = new google.maps.Marker({
        position: location,
        draggable: true,
        map: map,
        title: text
    });
    return marker;
}

function baseLocation(evt) {
    BaseLocation.lat = evt.srcObject.latLng.lat;
    BaseLocation.lng = evt.srcObject.latLng.lng;
    var baseL = BaseLocation.lat + "," + BaseLocation.lng;
    document.getElementById("address").value = baseL;
    revcodeLocation();
    return;
}

function centerMap(lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    map.panTo(center);
}

function makeGPX() {
    if (currentRouteData.length <= 0) {
        alert("You must have a track before you can create a GPX output file.");
        return;
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
    if (document.getElementById("tcxName").value == "") name = name;
    else name = document.getElementById("tcxName").value;
    var ymd = year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2);
    var OutText = "";
    OutText += "<?xml version=\"1.0\"?>";
    OutText += "\n";
    OutText += "<!--\n";
    OutText += storeURL();
    OutText += "\n-->\n";
    OutText += "<gpx version=\"1.0\" creator=\"ExpertGPS 1.1 - http://www.topografix.com\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.topografix.com/GPX/1/0\" xsi:schemaLocation=\"http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd\">\n";
    OutText += "<rte>\n";
    var step = routeResult.routes[0].legs[0].steps.length;
    for (var i = 0; i < step; i++) {
        if (i == 0) {
            var Lat = routeResult.routes[0].legs[0].steps[i].start_location.lat();
            var Lng = routeResult.routes[0].legs[0].steps[i].start_location.lng();
            OutText += "   <rtept lat=\"" + Lat + "\" lon=\"" + Lng + "\">\n";
            OutText += "   <name> p" + 0 + "</name>\n";
            OutText += "   <desc><![CDATA[Start]]></desc>\n";
            OutText += "   </rtept>\n";
        }
        var Lat = routeResult.routes[0].legs[0].steps[i].end_location.lat();
        var Lng = routeResult.routes[0].legs[0].steps[i].end_location.lng();
        var instruction = cleanUp(routeResult.routes[0].legs[0].steps[i].instructions);
        var point = i + 1;
        OutText += "   <rtept lat=\"" + Lat + "\" lon=\"" + Lng + "\">\n";
        OutText += "   <name> p" + point + "</name>\n";
        OutText += "   <desc><![CDATA[" + instruction + "]]></desc>\n";
        OutText += "   </rtept>\n";
    }
    OutText += "</rte>\n";
    OutText += "</gpx>\n";
    var blob = new Blob([OutText], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".gpx");
    return;
}

function makeCue() {
    if (currentRouteData.length <= 0) {
        alert("You must have a track before you can create a cue sheet.");
        return;
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
    var ymd = year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2);
    cueText = "";
    cueText += "<html><head><title>" + name + "</title>";
    cueText += "</head><body>";
    cueText += routeResult.routes[0].legs[0].distance.text + "&nbsp;&nbsp;about&nbsp;&nbsp;" +
        routeResult.routes[0].legs[0].duration.text + "<br>";
    var step = routeResult.routes[0].legs[0].steps.length;
    cueText += "<table>";
    for (var i = 0; i < step; i++) {
        cueText += "<tr>";
        cueText += "<td>";
        cueText += i + 1 + ".";
        cueText += "</td>";
        cueText += "<td>";
        cueText += routeResult.routes[0].legs[0].steps[i].instructions;
        cueText += "</td>";
        cueText += "<td>";
        cueText += routeResult.routes[0].legs[0].steps[i].distance.text;
        cueText += "</td>";
    }
    cueText += "</table>";
    cueText += "</body></html>";
    var blob = new Blob([cueText], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".html");
    return;
}

function makeGPX2() {
    if (currentRouteData.length <= 0) {
        alert("You must have a track before you can create a GPX output file.");
        return;
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
    if (document.getElementById("tcxName").value == "") name = name;
    else name = document.getElementById("tcxName").value;
    var ymd = year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2);
    var OutText = "";
    var actualDistance = [];
    actualDistance.length = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        currentRouteData[i].write = false;
        if (currentRouteData[i].instructions.length > 0) {
            var len = currentRouteData[i].instructions.length;
            if (currentRouteData[i].instructions.charAt(len - 1) == "*") {
                currentRouteData[i].instructions.length = 0;
                currentRouteData[i].instructions = "";
            }
        }
        if (currentRouteData[i].instructions.length > 0) actualDistance.push(currentRouteData[i].dist);
    }
    OutText += "<?xml version=\"1.0\"?>\n";
    OutText += "<!--\n";
    OutText += storeURL() + "\n";
    OutText += "-->\n";
    OutText += "<gpx version=\"1.0\" creator=\"ExpertGPS 1.1 - http://www.topografix.com\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.topografix.com/GPX/1/0\" xsi:schemaLocation=\"http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd\">\n";
    OutText += "<trk>\n";
    OutText += "  <trkseg>\n";
    var countPoints = 0;
    var Dist = routeResult.routes[0].legs[0].distance.value;
    if (tcxSpeed != 0) {
        var Velocity = tcxSpeed;
        var Time = Dist / Velocity;
    } else {
        var Time = routeResult.routes[0].legs[0].duration.value;
        var Velocity = Dist / Time;
    }
    var Times = [];
    Time.length = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        Time = currentRouteData[i].dist / Velocity;
        Time = Math.round(Time);
        Times.push(Time);
        if (Times[Times.length - 1] == Times[Times.length - 2]) Times[Time.length - 1] ++;
    }
    var step = currentRouteData.length;
    for (var i = 0; i < step; i++) {
        var Lat = currentRouteData[i].lat;
        var Lng = currentRouteData[i].lng;
        OutText += "    <trkpt lat=\"" + Lat + "\" lon=\"" + Lng + "\">\n";
        OutText += "    <name> p" + i + " </name>\n";
        var Time = Times[i];
        OutText += "    <time>" + ymd + "T" + padZeros(hours(Time).toFixed(0), 2) + ":" + padZeros(minutes(Time).toFixed(0), 2) + ":" + padZeros(seconds(Time).toFixed(0), 2) + "Z</time>\n";
        OutText += "    </trkpt>\n";
    }
    OutText += "  </trkseg>\n";
    OutText += "</trk>\n";
    OutText += "<rte>\n";
    for (var i = 0; i < step; i++) {
        if (currentRouteData[i].instructions.length > 0) {
            var Lat = currentRouteData[i].lat;
            var Lng = currentRouteData[i].lng;
            OutText += "  <rtept lat=\"" + Lat + "\" lon=\"" + Lng + "\">\n";
            var instruction = cleanUp(currentRouteData[i].instructions);
            OutText += "  <desc>" + instruction + "</desc>\n";
            var type = "";
            if (currentRouteData[i].instructions.indexOf("right") >= 0) type = "RT";
            else if (currentRouteData[i].instructions.indexOf("left") >= 0) type = "LT";
            if (type.length > 0) {
                OutText += "    <extensions>\n";
                OutText += "      <turn>";
                OutText += type;
                OutText += "</turn>\n";
                OutText += "    </extensions>\n";
            }
            OutText += "  </rtept>\n";
        }
    }
    OutText += "</rte>\n";
    OutText += "</gpx>\n";
    var blob = new Blob([OutText], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".gpx");
    return;
}

function makeTCX() {
    if (currentRouteData.length <= 0) {
        alert("You must have a track before you can create a TCX output file.");
        return;
    }
    var actualDistance = [];
    actualDistance.length = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        currentRouteData[i].write = false;
        if (currentRouteData[i].instructions.length > 0) {
            var len = currentRouteData[i].instructions.length;
            if (currentRouteData[i].instructions.charAt(len - 1) == "*") {
                currentRouteData[i].instructions.length = 0;
                currentRouteData[i].instructions = "";
            }
        }
        if (currentRouteData[i].instructions.length > 0) actualDistance.push(currentRouteData[i].dist);
    }
    var offset = document.getElementById("tcxAdvance").value;
    if (document.getElementById("unitSystem").value == 0)
        offset *= 12 * 2.54 / 100;
    var inum = 0;
    for (var loop = 0; loop < currentRouteData.length; loop++) {
        if (currentRouteData[loop].instructions.length > 0) {
            if (loop == 0 || offset == 0) {
                currentRouteData[loop].write = true;
                inum++;
            } else {
                var insDist = currentRouteData[loop].dist;
                var corrDist = insDist - offset;
                if (corrDist < 0) corrDist = insDist / 2;
                if (corrDist < actualDistance[inum - 1]) {
                    corrDist = actualDistance[inum - 1] + (actualDistance[inum] - actualDistance[inum - 1]) * 0.25;
                }
                for (var i = 0; i < currentRouteData.length; i++)
                    if (currentRouteData[i].dist > corrDist)
                        break;
                var j = i;
                i--;
                var distToGo = corrDist - currentRouteData[i].dist;
                var Lat1 = currentRouteData[i].lat;
                var lat1 = Lat1 * Math.PI / 180;
                var Lon1 = currentRouteData[i].lng;
                var lon1 = Lon1 * Math.PI / 180;
                var Lat2 = currentRouteData[j].lat;
                var lat2 = Lat2 * Math.PI / 180;
                var Lon2 = currentRouteData[j].lng;
                var lon2 = Lon2 * Math.PI / 180;
                var R = 6371;
                var dLat = (lat2 - lat1);
                var dLon = (lon2 - lon1);
                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1) * Math.sin(lat2) -
                    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
                var brng = Math.atan2(y, x);
                var d = distToGo / 1000;
                var lat3 = Math.asin(Math.sin(lat1) * Math.cos(d / R) +
                    Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));
                var lon3 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat3));
                var Lat3 = lat3 * 180 / Math.PI;
                var Lon3 = lon3 * 180 / Math.PI;
                var txt = currentRouteData[loop].instructions + "*";
                var temp = new routeData(Lat3, Lon3, corrDist, 0, 0, false, false, txt, true);
                currentRouteData.splice(i + 1, 0, temp);
                loop++;
                inum++;
            }
        }
    }
    var Dist = routeResult.routes[0].legs[0].distance.value;
    if (document.getElementById("unitSystem").value == 0) {
        tcxSpeed = document.getElementById("tcxSpeed").value * (5280 * 12 * 2.54 / 100) / (60 * 60);
    } else {
        tcxSpeed = document.getElementById("tcxSpeed").value * (1000) / (60 * 60);
    }
    if (tcxSpeed != 0) {
        var Velocity = tcxSpeed;
        var Time = Dist / Velocity;
    } else {
        var Time = routeResult.routes[0].legs[0].duration.value;
        var Velocity = Dist / Time;
    }
    var Times = [];
    Time.length = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        Time = currentRouteData[i].dist / Velocity;
        Time = Math.round(Time);
        Times.push(Time);
        if (Times[Times.length - 1] == Times[Times.length - 2]) Times[Time.length - 1] ++;
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
    if (document.getElementById("tcxName").value == "") document.getElementById("tcxName").value = name;
    else name = document.getElementById("tcxName").value;
    var ymd = year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2);
    var OutText = "";
    OutText += "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n";
    OutText += "<!--\n";
    OutText += storeURL() + "\n";
    OutText += "-->\n";
    OutText += "<TrainingCenterDatabase xmlns=\"http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd\">\n";
    OutText += "<Courses>\n";
    OutText += "  <Course>\n";
    OutText += "  <Name>" + name + "</Name>\n";
    OutText += "  <Lap>\n";
    OutText += "    <TotalTimeSeconds>" + Time + "</TotalTimeSeconds>\n";
    OutText += "    <DistanceMeters>" + Dist + "</DistanceMeters>\n";
    OutText += "    <BeginPosition>\n";
    var Lat = routeResult.routes[0].legs[0].start_location.lat();
    OutText += "      <LatitudeDegrees>" + Lat + "</LatitudeDegrees>\n";
    var Lng = routeResult.routes[0].legs[0].start_location.lng();
    OutText += "      <LongitudeDegrees>" + Lng + "</LongitudeDegrees>\n";
    OutText += "    </BeginPosition>\n";
    OutText += "    <EndPosition>\n";
    var Lat = routeResult.routes[0].legs[0].start_location.lat();
    OutText += "      <LatitudeDegrees>" + Lat + "</LatitudeDegrees>\n";
    var Lng = routeResult.routes[0].legs[0].start_location.lng();
    OutText += "      <LongitudeDegrees>" + Lng + "</LongitudeDegrees>\n";
    OutText += "    </EndPosition>\n";
    OutText += "    <Intensity>Active</Intensity>\n";
    OutText += "    <Cadence>65</Cadence>\n";
    OutText += "  </Lap>\n";
    OutText += "  <Track>\n";
    var step = currentRouteData.length;
    for (var i = 0; i < step; i++) {
        OutText += "    <Trackpoint>\n";
        OutText += "      <Position>\n";
        var Lat = currentRouteData[i].lat;
        OutText += "        <LatitudeDegrees>" + Lat + "</LatitudeDegrees>\n";
        var Lng = currentRouteData[i].lng;
        OutText += "        <LongitudeDegrees>" + Lng + "</LongitudeDegrees>\n";
        var Dist = currentRouteData[i].dist;
        var Time = Times[i];
        OutText += "      </Position>\n";
        OutText += "      <DistanceMeters>" + Dist.toFixed(0) + "</DistanceMeters>\n";
        OutText += "      <Time>" + ymd + "T" + padZeros(hours(Time).toFixed(0), 2) + ":" + padZeros(minutes(Time).toFixed(0), 2) + ":" + padZeros(seconds(Time).toFixed(0), 2) + "Z</Time>\n";
        OutText += "    </Trackpoint>\n";
    }
    OutText += "  </Track>\n";
    var alerts = markerPosition.length;
    var walk = 0;
    var inum = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        if (currentRouteData[i].write) {
            var instruct = currentRouteData[i].instructions;
            var len = instruct.length;
            if (instruct.charAt(len - 1) == "*") instruct = instruct.substring(0, len - 1); {
                if (instruct.indexOf("left") >= 0) var type = "Left";
                else if (instruct.indexOf("right") >= 0) var type = "Right";
                else if (instruct.indexOf("Continue") >= 0) var type = "Straight";
                else var type = "Generic";
            } {
                if (instruct.indexOf(" at ") >= 0) {
                    var point = instruct.indexOf(" at ");
                    var road = instruct.substring(point + 3);
                } else if (instruct.indexOf(" onto ") >= 0) {
                    var point = instruct.indexOf(" onto ");
                    var road = instruct.substring(point + 5);
                } else if (instruct.indexOf(" on ") >= 0) {
                    var point = instruct.indexOf(" on ");
                    var road = instruct.substring(point + 3);
                }
            }
            var Lat = currentRouteData[i].lat;
            var Lng = currentRouteData[i].lng;
            var Tym = Times[i];
            var CPloc = new google.maps.LatLng(Lat, Lng);
            var marker = new google.maps.Marker({
                position: CPloc,
                map: map,
                visible: false,
                icon: 'RLimages/iconb.png',
                draggable: true
            });
            attachInstructionText(marker, inum + ": " + instruct);
            inum++;
            OutText += "  <CoursePoint>\n";
            var roadOut = cleanUp(road);
            OutText += "    <Name>" + roadOut + "</Name>\n";
            OutText += "    <Time>" + ymd + "T" + padZeros(hours(Tym).toFixed(0), 2) + ":" + padZeros(minutes(Tym).toFixed(0), 2) + ":" + padZeros(seconds(Tym).toFixed(0), 2) + "Z</Time>\n";
            OutText += "    <Position>\n";
            OutText += "      <LatitudeDegrees>" + Lat + "</LatitudeDegrees>\n";
            OutText += "      <LongitudeDegrees>" + Lng + "</LongitudeDegrees>\n";
            OutText += "    </Position>\n";
            OutText += "    <PointType>" + type + "</PointType>\n";
            var instructions = cleanUp(currentRouteData[i].instructions);
            OutText += "    <Notes><![CDATA[" + instructions + "]]></Notes>\n";
            OutText += "  </CoursePoint>\n";
        }
    }
    OutText += "  <Creator xsi:type=\"Device_t\">\n";
    OutText += "    <Name>EDGE705</Name>\n";
    OutText += "    <UnitId>3670860026</UnitId>\n";
    OutText += "    <ProductID>625</ProductID>\n";
    OutText += "    <Version>\n";
    OutText += "      <VersionMajor>2</VersionMajor>\n";
    OutText += "      <VersionMinor>90</VersionMinor>\n";
    OutText += "      <BuildMajor>0</BuildMajor>\n";
    OutText += "      <BuildMinor>0</BuildMinor>\n";
    OutText += "    </Version>\n";
    OutText += "  </Creator>\n";
    OutText += "</Course>\n";
    OutText += "</Courses>\n";
    OutText += "<Author xsi:type=\"Application_t\">\n";
    OutText += "  <Name>EDGE705</Name>\n";
    OutText += "  <Build>\n";
    OutText += "    <Version>\n";
    OutText += "      <VersionMajor>2</VersionMajor>\n";
    OutText += "      <VersionMinor>90</VersionMinor>\n";
    OutText += "      <BuildMajor>0</BuildMajor>\n";
    OutText += "      <BuildMinor>0</BuildMinor>\n";
    OutText += "    </Version>\n";
    OutText += "    <Type>Release</Type>\n";
    OutText += "  </Build>\n";
    OutText += "  <LangID>EN</LangID>\n";
    OutText += "  <PartNumber>006-B0625-00</PartNumber>\n";
    OutText += "</Author>\n";
    OutText += "</TrainingCenterDatabase>\n";
    var blob = new Blob([OutText], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".tcx");
    return;
}

function makeTCX_tryNew() {
    if (currentRouteData.length <= 0) {
        alert("You must have a track before you can create a TCX output file.");
        return;
    }
    var actualDistance = [];
    actualDistance.length = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        currentRouteData[i].write = false;
        if (currentRouteData[i].instructions.length > 0) {
            var len = currentRouteData[i].instructions.length;
            if (currentRouteData[i].instructions.charAt(len - 1) == "*") {
                currentRouteData[i].instructions.length = 0;
                currentRouteData[i].instructions = "";
            }
        }
        if (currentRouteData[i].instructions.length > 0) actualDistance.push(currentRouteData[i].dist);
    }
    var offset = document.getElementById("tcxAdvance").value;
    if (document.getElementById("unitSystem").value == 0)
        offset *= 12 * 2.54 / 100;
    var inum = 0;
    for (var loop = 0; loop < currentRouteData.length; loop++) {
        if (currentRouteData[loop].instructions.length > 0) {
            if (loop == 0 || offset == 0) {
                currentRouteData[loop].write = true;
                inum++;
            } else {
                var insDist = currentRouteData[loop].dist;
                var corrDist = insDist - offset;
                if (corrDist < 0) corrDist = insDist / 2;
                if (corrDist < actualDistance[inum - 1]) {
                    corrDist = actualDistance[inum - 1] + (actualDistance[inum] - actualDistance[inum - 1]) * 0.25;
                }
                for (var i = 0; i < currentRouteData.length; i++)
                    if (currentRouteData[i].dist > corrDist)
                        break;
                var j = i;
                i--;
                var distToGo = corrDist - currentRouteData[i].dist;
                var Lat1 = currentRouteData[i].lat;
                var lat1 = Lat1 * Math.PI / 180;
                var Lon1 = currentRouteData[i].lng;
                var lon1 = Lon1 * Math.PI / 180;
                var Lat2 = currentRouteData[j].lat;
                var lat2 = Lat2 * Math.PI / 180;
                var Lon2 = currentRouteData[j].lng;
                var lon2 = Lon2 * Math.PI / 180;
                var R = 6371;
                var dLat = (lat2 - lat1);
                var dLon = (lon2 - lon1);
                var y = Math.sin(dLon) * Math.cos(lat2);
                var x = Math.cos(lat1) * Math.sin(lat2) -
                    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
                var brng = Math.atan2(y, x);
                var d = distToGo / 1000;
                var lat3 = Math.asin(Math.sin(lat1) * Math.cos(d / R) +
                    Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));
                var lon3 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat3));
                var Lat3 = lat3 * 180 / Math.PI;
                var Lon3 = lon3 * 180 / Math.PI;
                var txt = currentRouteData[loop].instructions + "*";
                var temp = new routeData(Lat3, Lon3, corrDist, 0, 0, false, false, txt, true);
                currentRouteData.splice(i + 1, 0, temp);
                loop++;
                inum++;
            }
        }
    }
    var Dist = routeResult.routes[0].legs[0].distance.value;
    if (document.getElementById("unitSystem").value == 0) {
        tcxSpeed = document.getElementById("tcxSpeed").value * (5280 * 12 * 2.54 / 100) / (60 * 60);
    } else {
        tcxSpeed = document.getElementById("tcxSpeed").value * (1000) / (60 * 60);
    }
    if (tcxSpeed != 0) {
        var Velocity = tcxSpeed;
        var Time = Dist / Velocity;
    } else {
        var Time = routeResult.routes[0].legs[0].duration.value;
        var Velocity = Dist / Time;
    }
    var Times = [];
    Time.length = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        Time = currentRouteData[i].dist / Velocity;
        Time = Math.round(Time);
        Times.push(Time);
        if (Times[Times.length - 1] == Times[Times.length - 2]) Times[Time.length - 1] ++;
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
    if (document.getElementById("tcxName").value == "") document.getElementById("tcxName").value = name;
    else name = document.getElementById("tcxName").value;
    var ymd = year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2);
    var OutText = "";
    OutText += "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n";
    OutText += "<!--\n";
    OutText += storeURL() + "\n";
    OutText += "-->\n";
    OutText += "<TrainingCenterDatabase xmlns=\"http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd\">\n";
    OutText += "<Activities>\n";
    OutText += "  <Activity>\n";
    var timeString = year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "T" + padZeros(hour, 2) + ":" + padZeros(minute, 2) + ":00.000Z";
    OutText += "    <Id>" + timeString + "</Id>\n"
    OutText += "    <Lap StartTime=\"" + timeString + "\">\n";
    OutText += "    <TotalTimeSeconds>" + Time + "</TotalTimeSeconds>\n";
    OutText += "    <DistanceMeters>" + Dist + "</DistanceMeters>\n";
    OutText += "    <MaximumSpeed>" + Velocity + "</MaximumSpeed>\n";
    OutText += "    <Intensity>Active</Intensity>\n";
    OutText += "    <Cadence>65</Cadence>\n";
    OutText += "    <TriggerMethod>Manual</TriggerMethod>\n";
    OutText += "    <Track>\n";
    var step = currentRouteData.length;
    for (var i = 0; i < step; i++) {
        OutText += "      <Trackpoint>\n";
        OutText += "        <Position>\n";
        var Lat = currentRouteData[i].lat;
        OutText += "          <LatitudeDegrees>" + Lat + "</LatitudeDegrees>\n";
        var Lng = currentRouteData[i].lng;
        OutText += "          <LongitudeDegrees>" + Lng + "</LongitudeDegrees>\n";
        var Dist = currentRouteData[i].dist;
        var Time = Times[i];
        OutText += "        </Position>\n";
        OutText += "        <DistanceMeters>" + Dist.toFixed(0) + "</DistanceMeters>\n";
        OutText += "        <Time>" + ymd + "T" + padZeros(hours(Time).toFixed(0), 2) + ":" + padZeros(minutes(Time).toFixed(0), 2) + ":" + padZeros(seconds(Time).toFixed(0), 2) + "Z</Time>\n";
        OutText += "      </Trackpoint>\n";
    }
    OutText += "      </Track>\n";
    OutText += "    </Lap>\n";
    var alerts = markerPosition.length;
    var walk = 0;
    var inum = 0;
    for (var i = 0; i < currentRouteData.length; i++) {
        if (currentRouteData[i].write) {
            var instruct = currentRouteData[i].instructions;
            var len = instruct.length;
            if (instruct.charAt(len - 1) == "*") instruct = instruct.substring(0, len - 1); {
                if (instruct.indexOf("left") >= 0) var type = "Left";
                else if (instruct.indexOf("right") >= 0) var type = "Right";
                else if (instruct.indexOf("Continue") >= 0) var type = "Straight";
                else var type = "Generic";
            } {
                if (instruct.indexOf(" at ") >= 0) {
                    var point = instruct.indexOf(" at ");
                    var road = instruct.substring(point + 3);
                } else if (instruct.indexOf(" onto ") >= 0) {
                    var point = instruct.indexOf(" onto ");
                    var road = instruct.substring(point + 5);
                } else if (instruct.indexOf(" on ") >= 0) {
                    var point = instruct.indexOf(" on ");
                    var road = instruct.substring(point + 3);
                }
            }
            var Lat = currentRouteData[i].lat;
            var Lng = currentRouteData[i].lng;
            var Tym = Times[i];
            var CPloc = new google.maps.LatLng(Lat, Lng);
            var marker = new google.maps.Marker({
                position: CPloc,
                map: map,
                visible: false,
                icon: 'RLimages/iconb.png',
                draggable: true
            });
            attachInstructionText(marker, inum + ": " + instruct);
            inum++;
            OutText += "       <CoursePoint>\n";
            var roadOut = cleanUp(road);
            OutText += "         <Name>" + roadOut + "</Name>\n";
            OutText += "         <Time>" + ymd + "T" + padZeros(hours(Tym).toFixed(0), 2) + ":" + padZeros(minutes(Tym).toFixed(0), 2) + ":" + padZeros(seconds(Tym).toFixed(0), 2) + "Z</Time>\n";
            OutText += "         <Position>\n";
            OutText += "           <LatitudeDegrees>" + Lat + "</LatitudeDegrees>\n";
            OutText += "           <LongitudeDegrees>" + Lng + "</LongitudeDegrees>\n";
            OutText += "         </Position>\n";
            OutText += "         <PointType>" + type + "</PointType>\n";
            var instructions = cleanUp(currentRouteData[i].instructions);
            OutText += "         <Notes><![CDATA[" + instructions + "]]></Notes>\n";
            OutText += "       </CoursePoint>\n";
        }
    }
    OutText += "  <Creator xsi:type=\"Device_t\">\n";
    OutText += "    <Name>EDGE705</Name>\n";
    OutText += "    <UnitId>3670860026</UnitId>\n";
    OutText += "    <ProductID>625</ProductID>\n";
    OutText += "    <Version>\n";
    OutText += "      <VersionMajor>2</VersionMajor>\n";
    OutText += "      <VersionMinor>90</VersionMinor>\n";
    OutText += "      <BuildMajor>0</BuildMajor>\n";
    OutText += "      <BuildMinor>0</BuildMinor>\n";
    OutText += "    </Version>\n";
    OutText += "  </Creator>\n";
    OutText += "  </Activity>\n";
    OutText += "</Activities>\n";
    OutText += "<Author xsi:type=\"Application_t\">\n";
    OutText += "  <Name>EDGE705</Name>\n";
    OutText += "  <Build>\n";
    OutText += "    <Version>\n";
    OutText += "      <VersionMajor>2</VersionMajor>\n";
    OutText += "      <VersionMinor>90</VersionMinor>\n";
    OutText += "      <BuildMajor>0</BuildMajor>\n";
    OutText += "      <BuildMinor>0</BuildMinor>\n";
    OutText += "    </Version>\n";
    OutText += "    <Type>Release</Type>\n";
    OutText += "  </Build>\n";
    OutText += "  <LangID>EN</LangID>\n";
    OutText += "  <PartNumber>006-B0625-00</PartNumber>\n";
    OutText += "</Author>\n";
    OutText += "</TrainingCenterDatabase>\n";
    var blob = new Blob([OutText], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".tcx");
    return;
}

function cleanUp(text) {
    var cleaned;
    cleaned = text;
    if (typeof cleaned == "undefined") cleaned = "";
    while (cleaned.indexOf("<") >= 0) {
        var from = cleaned.indexOf("<");
        var to = cleaned.indexOf(">");
        var end = from;
        var start = to + 1;
        var first = cleaned.slice(0, end);
        var last = cleaned.slice(start, cleaned.length);
        cleaned = first + last;
    }
    while (cleaned.indexOf("*") >= 0) {
        var end = cleaned.indexOf("*");
        var first = cleaned.slice(0, end);
        var last = cleaned.slice(end + 1, cleaned.length);
        cleaned = first + last;
    }
    return cleaned;
}

function makeKML() {
    var OutText;
    var SPC = "  ";
    var opts = 2;
    if (opts == 1) {
        var LFT = "&lt;";
        var RGT = "&gt;";
        var Break = "<br>";
    } else if (opts == 2) {
        var LFT = "<";
        var RGT = ">";
        var Break = "\n";
    }
    OutText = "";
    OutText += LFT + "?xml version=\"1.0\" ?" + RGT + Break;
    OutText += LFT + "kml xmlns=\"http://www.opengis.net/kml/2.2\"" + RGT + Break;
    OutText += SPC + LFT + "Document" + RGT + Break;
    OutText += SPC + LFT + "Folder" + RGT + Break;
    OutText += SPC + LFT + "name" + RGT + "RouteLoops Route" + LFT + "/name" + RGT + Break;
    OutText += LFT + "Style id=\"BlueLine\"" + RGT + Break;
    OutText += LFT + "LineStyle" + RGT + LFT + "color" + RGT + "77ff0000" + LFT + "/color" + RGT + LFT + "width" + RGT + "20" + LFT + "/width" + RGT + LFT + "/LineStyle" + RGT + Break;
    OutText += LFT + "/Style" + RGT + Break;
    OutText += SPC + LFT + "Placemark" + RGT + Break;
    OutText += SPC + LFT + "name" + RGT + "RouteLoops Route" + LFT + "/name" + RGT + Break;
    OutText += LFT + "styleUrl" + RGT + "#BlueLine" + LFT + "/styleUrl" + RGT + Break;
    OutText += SPC + LFT + "description" + RGT + "The RouteLoops route" + LFT + "/description" + RGT + Break;
    OutText += SPC + SPC + LFT + "LineString" + RGT + Break;
    OutText += SPC + SPC + SPC + LFT + "extrude" + RGT + "1" + LFT + "/extrude" + RGT + Break;
    OutText += SPC + SPC + SPC + LFT + "tessellate" + RGT + "0" + LFT + "/tessellate" + RGT + Break;
    OutText += SPC + SPC + SPC + LFT + "altitudeMode" + RGT + "relativeToGround" + LFT + "/altitudeMode" + RGT + Break;
    OutText += SPC + SPC + SPC + SPC + SPC + LFT + "coordinates" + RGT + Break;
    for (var j = 0; j < currentRouteData.length; j++) {
        OutText += SPC + SPC + SPC + SPC + SPC + SPC + currentRouteData[j].lng + "," + currentRouteData[j].lat + "," + "1" + Break;
    }
    OutText += SPC + SPC + SPC + SPC + SPC + SPC + currentRouteData[0].lng + "," + currentRouteData[0].lat + "," + "1" + Break;
    OutText += SPC + SPC + SPC + SPC + SPC + LFT + "/coordinates" + RGT + Break;
    OutText += SPC + SPC + LFT + "/LineString" + RGT + Break;
    OutText += SPC + LFT + "/Placemark" + RGT + Break;
    OutText += SPC + LFT + "/Folder" + RGT + Break;
    OutText += SPC + LFT + "/Document" + RGT + Break;
    OutText += LFT + "/kml" + RGT + Break;
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
    if (document.getElementById("tcxName").value == "") name = name;
    else name = document.getElementById("tcxName").value;
    var blob = new Blob([OutText], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, name + ".kml");
}

function showSteps(result) {
    var myRoute = result.routes[0].legs[0];
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    var offset = document.getElementById("tcxAdvance").value;
    if (document.getElementById("unitSystem").value == 0)
        offset *= 12 * 2.54 / 100;
    var Time = myRoute.duration.value;
    var Dist = myRoute.distance.value;
    var Velocity = Dist / Time;
    var lastTime;
    markerLabel.length = 0;
    markerArray.length = 0;
    markerPosition.length = 0;
    for (var i = 0; i < myRoute.steps.length; i++) {
        latOffset = myRoute.steps[i].path[0].lat();
        lngOffset = myRoute.steps[i].path[0].lng();
        if (offset > 0 && i < myRoute.steps.length - 1) {
            var next = i + 1;
            var latActual = myRoute.steps[next].start_point.lat();
            var lngActual = myRoute.steps[next].start_point.lng();
            var previous = next - 1;
            if (myRoute.steps[previous].path.length == 2) {
                var j = 0;
                latOffset = myRoute.steps[previous].path[j].lat();
                lngOffset = myRoute.steps[previous].path[j].lng();
            } else {
                for (var j = 0; j < myRoute.steps[previous].path.length; j++) {
                    var latOffset = myRoute.steps[previous].path[j].lat();
                    var lngOffset = myRoute.steps[previous].path[j].lng();
                    var sep = LatLngDist(latActual, lngActual, latOffset, lngOffset) * 1000;
                    if (sep < offset) {
                        if (j == myRoute.steps[previous].path.length - 1) {
                            j = myRoute.steps[previous].path.length - 2;
                            latOffset = myRoute.steps[previous].path[j].lat();
                            lngOffset = myRoute.steps[previous].path[j].lng();
                            sep = LatLngDist(latActual, lngActual, latOffset, lngOffset) * 1000;
                        }
                        break;
                    }
                }
                if (j > 0) {
                    var XlatOffset = myRoute.steps[previous].path[j - 1].lat();
                    var XlngOffset = myRoute.steps[previous].path[j - 1].lng();
                    var Xsep = LatLngDist(latActual, lngActual, XlatOffset, XlngOffset) * 1000;
                    if (Math.abs(Xsep - offset) < Math.abs(sep - offset)) {
                        latOffset = XlatOffset;
                        lngOffset = XlngOffset;
                        j = j - 1;
                    }
                }
            }
            if (j != myRoute.steps[previous].path - 1) {
                var markTemp = new google.maps.LatLng(latOffset, lngOffset);
                markerPosition.push(markTemp);
                var marker = new google.maps.Marker({
                    position: markTemp,
                    map: map,
                    visible: false,
                    draggable: true
                });
                attachInstructionText(marker, myRoute.steps[next].instructions);
                markerLabel.push(myRoute.steps[next].instructions);
                markerArray.push(marker);
            }
            if (j < myRoute.steps[previous].path.length - 2 && myRoute.steps[previous].path.length > 3) {
                j = myRoute.steps[previous].path.length - 2;
                latOffset = myRoute.steps[previous].path[j].lat();
                lngOffset = myRoute.steps[previous].path[j].lng();
                markTemp = new google.maps.LatLng(latOffset, lngOffset);
                markerPosition.push(markTemp);
                var marker = new google.maps.Marker({
                    position: markTemp,
                    map: map,
                    visible: false,
                    draggable: true
                });
                attachInstructionText(marker, myRoute.steps[next].instructions);
                markerLabel.push(myRoute.steps[next].instructions);
                markerArray.push(marker);
            }
        }
    }
    buildDirections(result);
    return;
}

function reverseOrNew() {
    if (rlPoints.length == 0) {
        getRLpoints();
        calcRoute();
    } else {
        rlPoints.reverse();
        calcRoute();
    }
}

function redrawOrNew(flag) {
    if (flag == -1) rlPoints.length = 0;
    if (rlPoints.length == 0) {
        getRLpoints();
        calcRoute();
    } else {
        calcRoute();
    }
    return;
}

function switchUnits() {
    if (rlPoints.length == 0) {
        if (document.getElementById("unitSystem").value == 0) {
            document.getElementById("inputUnits").innerHTML = "miles";
            var temp = document.getElementById("length").value * 1000 * 100 / 2.54 / 12 / 5280;
            document.getElementById("length").value = temp.toFixed(2);
            document.getElementById("tcxUnits").innerHTML = "feet";
            document.getElementById("tcxAdvance").value *= 100 / 2.54 / 12;
            temp = document.getElementById("tcxSpeed").value * 1000 * 100 / 2.54 / 12 / 5280;
            document.getElementById("tcxSpeed").value = temp.toFixed(2);
            document.getElementById("tcxSpeedUnits").innerHTML = "mph";
        } else {
            document.getElementById("inputUnits").innerHTML = "kilometers";
            var temp = document.getElementById("length").value * 5280 * 12 * 2.54 / 100 / 1000;
            document.getElementById("length").value = temp.toFixed(2);
            document.getElementById("tcxUnits").innerHTML = "meters";
            document.getElementById("tcxAdvance").value *= 12 * 2.54 / 100;
            temp = document.getElementById("tcxSpeed").value * 5280 * 12 * 2.54 / 100 / 1000;
            document.getElementById("tcxSpeed").value = temp.toFixed(2);
            document.getElementById("tcxSpeedUnits").innerHTML = "kph";
        }
        calcRoute();
    } else {
        if (document.getElementById("unitSystem").value == 0) {
            document.getElementById("inputUnits").innerHTML = "miles";
            var temp = document.getElementById("length").value * 1000 * 100 / 2.54 / 12 / 5280;
            document.getElementById("length").value = temp.toFixed(2);
            document.getElementById("tcxUnits").innerHTML = "feet";
            document.getElementById("tcxAdvance").value *= 100 / 2.54 / 12;
            temp = document.getElementById("tcxSpeed").value * 1000 * 100 / 2.54 / 12 / 5280;
            document.getElementById("tcxSpeed").value = temp.toFixed(2);
            document.getElementById("tcxSpeedUnits").innerHTML = "mph";
        } else {
            document.getElementById("inputUnits").innerHTML = "kilometers";
            var temp = document.getElementById("length").value * 5280 * 12 * 2.54 / 100 / 1000;
            document.getElementById("length").value = temp.toFixed(2);
            document.getElementById("tcxUnits").innerHTML = "meters";
            document.getElementById("tcxAdvance").value *= 12 * 2.54 / 100;
            temp = document.getElementById("tcxSpeed").value * 5280 * 12 * 2.54 / 100 / 1000;
            document.getElementById("tcxSpeed").value = temp.toFixed(2);
            document.getElementById("tcxSpeedUnits").innerHTML = "kph";
        }
    }
    writeCookies();
    return;
}

function autoFit() {
    map.setCenter(routeResult.routes[0].bounds.getCenter());
    map.fitBounds(routeResult.routes[0].bounds);
}

function toggleAutoClean() {
    if (DoClean) {
        DoClean = false;
        if (Language == "JP")
            document.getElementById("toggleClean").value = "ã‚ªãƒ¼ãƒˆã‚¯ãƒªãƒ¼ãƒ³ã‚’ã‚ªãƒ³ã«ã™ã‚‹";
        else if (Language == "FR")
            document.getElementById("toggleClean").value = "Activer AutoClean";
        else
            document.getElementById("toggleClean").value = "Turn AutoClean On";
        document.getElementById("toggleClean").className = "butt3";
    } else if (!DoClean) {
        DoClean = true;
        if (Language == "JP")
            document.getElementById("toggleClean").value = "ã‚ªãƒ¼ãƒˆã‚¯ãƒªãƒ¼ãƒ³ã‚’ã‚ªãƒ•ã«ã™ã‚‹";
        else if (Language == "FR")
            document.getElementById("toggleClean").value = "DÃ©sactiver AutoClean";
        else
            document.getElementById("toggleClean").value = "Turn AutoClean Off";
        document.getElementById("toggleClean").className = "butt1";
    }
    var CookieClean = document.getElementById("toggleClean").value;
    createCookie("Clean", CookieClean);
}

function toggleElevation() {
    if (!ePlot) {
        ePlot = true;
        if (Language == "JP")
            document.getElementById("toggleButton").value = "ã‚°ãƒ©ãƒ•:ã‚ªãƒ•";
        else if (Language == "FR")
            document.getElementById("toggleButton").value = "DÃ©sactiver graphe";
        else
            document.getElementById("toggleButton").value = "Turn Plot Off";
        document.getElementById("elevation_chart").style.visibility = "visible";
        document.getElementById("elevation_chart").style.display = "block";
        document.getElementById("ecButton").style.visibility = "visible";
        document.getElementById("ecButton").style.display = "block";
        drawElevationPlot();
    } else {
        ePlot = false;
        if (Language == "JP")
            document.getElementById("toggleButton").value = "ã‚°ãƒ©ãƒ•:ã‚ªãƒ³";
        else if (Language == "FR")
            document.getElementById("toggleButton").value = "Activer graphe";
        else
            document.getElementById("toggleButton").value = "Turn Plot On";
        document.getElementById("elevation_chart").style.visibility = "hidden";
        document.getElementById("elevation_chart").style.display = "none";
        document.getElementById("ecButton").style.visibility = "hidden";
        document.getElementById("ecButton").style.display = "none";
    }
    return;
}

function toggleTraffic() {
    if (!trafficLayer.getMap()) {
        rtTraffic = true;
        if (Language == "JP")
            document.getElementById("toggleTraffic").value = "ãƒªã‚¢ãƒ«ã‚¿ã‚¤ãƒ ã®äº¤é€šæƒ…å ±ã‚’ã‚ªãƒ•ã«ã™ã‚‹";
        else if (Language == "FR")
            document.getElementById("toggleTraffic").value = "DÃ©sactiver le trafic en temps rÃ©el";
        else
            document.getElementById("toggleTraffic").value = "Turn real-time traffic Off";
        trafficLayer.setMap(map);
    } else {
        rtTraffic = false;
        if (Language == "JP")
            document.getElementById("toggleTraffic").value = "ãƒªã‚¢ãƒ«ã‚¿ã‚¤ãƒ ã®äº¤é€šæƒ…å ±ã‚’ã‚ªãƒ³ã«ã™ã‚‹";
        else if (Language == "FR")
            document.getElementById("toggleTraffic").value = "Activer le trafic en temps rÃ©el";
        else
            document.getElementById("toggleTraffic").value = "Turn real-time traffic On";
        trafficLayer.setMap(null);
    }
    return;
}

function toggleWeather() {
    if (!weatherLayer.getMap()) {
        rtWeather = true;
        document.getElementById("toggleWeather").value = "Turn weather information Off";
        weatherLayer.setMap(map);
        cloudLayer.setMap(map);
    } else {
        rtWeather = false;
        document.getElementById("toggleWeather").value = "Turn weather information On";
        weatherLayer.setMap(null);
        cloudLayer.setMap(null);
    }
    return;
}

function toggleFerries() {
    if (document.getElementById("ferryButton").value == 0) {
        allowFerries = false;
        redrawOrNew();
    } else {
        allowFerries = true;
        redrawOrNew();
    }
    return;
}

function toggleMap() {
    if (document.getElementById("toggleMap").value == "Bigger Map") {
        document.getElementById("middle").style.height = "120%";
        document.getElementById("middle").style.width = "150%";
        document.getElementById("toggleMap").value = "Smaller Map";
        google.maps.event.trigger(map, 'resize');
    } else {
        document.getElementById("middle").style.height = "70%";
        document.getElementById("middle").style.width = "100%";
        document.getElementById("toggleMap").value = "Bigger Map";
        google.maps.event.trigger(map, 'resize');
    }
}

function drawElevationPlot() {
    var allPoints = [];
    elevator = new google.maps.ElevationService();
    chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
    var step = routeResult.routes[0].legs[0].steps.length;
    var countPoints = 0;
    for (var i = 0; i < step; i++) {
        var path = routeResult.routes[0].legs[0].steps[i].path.length;
        for (var j = 0; j < path; j++) {
            if (i > 0 && j == 0) continue;
            var Lat = routeResult.routes[0].legs[0].steps[i].path[j].lat();
            var Lng = routeResult.routes[0].legs[0].steps[i].path[j].lng();
            allPoints[countPoints] = new google.maps.LatLng(Lat, Lng);
            countPoints++;
        }
    }
    var thinnedArray = [];
    var pointLimit = 250;
    var ratio = pointLimit / allPoints.length;
    if (ratio > 1) ratio = 1;
    var track = 0;
    var last = -1;
    for (var i = 0; i < allPoints.length; i++) {
        track += ratio;
        if (Math.floor(track) > last) {
            thinnedArray.push(allPoints[i]);
            last = Math.floor(track);
        }
    }
    var pathRequest = {
        'path': thinnedArray,
        'samples': 256
    }
    elevator.getElevationAlongPath(pathRequest, plotElevation);
}

function plotElevation(results, status) {
    if (status == google.maps.ElevationStatus.OK) {
        elevations = results;
        var units;
        if (document.getElementById("unitSystem").value == 0) units = 0;
        else units = 1;
        elevDist.length = 0;
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Distance');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < results.length; i++) {
            var scaledDistance = (totalDistanceInCurrentUnits * i / results.length);
            elevDist.push(scaledDistance);
            data.addRow([scaledDistance.toFixed(1).toString(), elevations[i].elevation]);
        }
        document.getElementById('elevation_chart').style.display = 'block';
        document.getElementById('ecButton').style.display = 'block';
        if (units == 0) var tx = "Distance (mi)";
        else var tx = "Distance (km)";
        chart.draw(data, {
            width: 640,
            title: 'Move the cursor over the elevation plot to see the location on the route',
            height: 200,
            legend: 'none',
            titleY: 'Elevation (m)',
            titleX: tx
        });
        google.visualization.events.addListener(chart, 'onmouseover', myMouseOverHandler);
        google.visualization.events.addListener(chart, 'onmouseout', myMouseOutHandler);
    } else {
        alert("The Elevation Service did not return OK, for some reason.  Returned: " + status);
    }
}

function myClickHandler() {
    var selection = chart.getSelection();
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        var marker = new google.maps.Marker({
            position: elevations[item.row].location,
            map: map
        });
        if (document.getElementById("unitSystem").value == 0)
            var mText = "Elevation at distance " + elevDist[item.row].toFixed(1) + " miles is " + elevations[item.row].elevation.toFixed(1).toString() + " meters";
        else
            var mText = "Elevation at distance " + elevDist[item.row].toFixed(1) + " kilometers is " + elevations[item.row].elevation.toFixed(1).toString() + " meters";
        attachInstructionText(marker, mText);
    }
}

function myMouseOverHandler(mE) {
    if (document.getElementById("unitSystem").value == 0) {
        var Grade;
        if (mE.row > 0) {
            var x1 = elevDist[mE.row - 1];
            var x2 = elevDist[mE.row];
            var y1 = elevations[mE.row - 1].elevation;
            var y2 = elevations[mE.row].elevation;
            x1 *= 5280 * 12 * 2.54 / 100;
            x2 *= 5280 * 12 * 2.54 / 100;
            Grade = (y2 - y1) / (x2 - x1);
        } else Grade = 0;
        var mText = "Elevation at distance " + elevDist[mE.row].toFixed(1) + " miles is " + elevations[mE.row].elevation.toFixed(1).toString() + " meters" + "\n" + "Grade at this point is about " + (Grade * 100).toFixed(1) + "%";
    } else {
        var Grade;
        if (mE.row > 0) {
            var x1 = elevDist[mE.row - 1];
            var x2 = elevDist[mE.row];
            var y1 = elevations[mE.row - 1].elevation;
            var y2 = elevations[mE.row].elevation;
            x1 *= 1000;
            x2 *= 1000;
            Grade = (y2 - y1) / (x2 - x1);
        } else Grade = 0;
        var mText = "Elevation at distance " + elevDist[mE.row].toFixed(1) + " kilometers is " + elevations[mE.row].elevation.toFixed(1).toString() + " meters" + "\n" + "Grade at this point is about " + (Grade * 100).toFixed(1) + "%";
    }
    stepDisplay.setContent(mText);
    stepDisplay.setPosition(elevations[mE.row].location);
    stepDisplay.open(map);
    bikeMarker = new google.maps.Marker({
        position: elevations[mE.row].location,
        map: map,
        icon: 'RLimages/OldBike2.png'
    });
}

function myMouseOutHandler(mE) {
    bikeMarker.setMap(null);
}

function showDirectionFlag(index) {
    var Text = routeResult.routes[0].legs[0].steps[index].instructions;
    var Location = routeResult.routes[0].legs[0].steps[index].start_location;
    stepDisplay.setContent(Text);
    stepDisplay.setPosition(Location);
    stepDisplay.open(map);
}

function placeMileMarkers() {
    var Dist;
    var LastDist;
    var WriteDist;
    if (!showingMarkers) {
        showingMarkers = true;
        if (Language == "JP")
            document.getElementById("toggleMileMarkers").value = "è·é›¢ãƒžãƒ¼ã‚«ãƒ¼ã‚’ã‚ªãƒ•ã«ã™ã‚‹";
        else if (Language == "FR")
            document.getElementById("toggleMileMarkers").value = "DÃ©sactiver les marqueurs de distance";
        else
            document.getElementById("toggleMileMarkers").value = "Turn distance markers off";
        for (var i = 0; i < mileMarkers.length; i++) {
            mileMarkers[i].setMap(null);
        }
        var numMM = Math.floor(totalDistanceInCurrentUnits);
        if (numMM >= 1) var next = 1;
        var step = routeResult.routes[0].legs[0].steps.length;
        for (var i = 0; i < step; i++) {
            var path = routeResult.routes[0].legs[0].steps[i].path.length;
            for (var j = 0; j < path; j++) {
                var Lat = routeResult.routes[0].legs[0].steps[i].path[j].lat();
                var Lng = routeResult.routes[0].legs[0].steps[i].path[j].lng();
                if (i == 0 && j == 0) {
                    Dist = 0;
                } else {
                    var pathlength = LatLngDist(Lat, Lng, Last.lat(), Last.lng()) * 1000;
                    if (document.getElementById("unitSystem").value == 0) {
                        pathlength *= 100 / 2.54 / 12 / 5280;
                    } else if (document.getElementById("unitSystem").value == 1) {
                        pathlength /= 1000;
                    }
                    Dist += pathlength;
                }
                if (Dist >= next) {
                    if (Math.abs(LastDist - next) < Math.abs(Dist - next)) {
                        WriteLat = Last.lat();
                        WriteLng = Last.lng();
                        WriteDist = LastDist;
                    } else {
                        WriteLat = Lat;
                        WriteLng = Lng;
                        WriteDist = Dist;
                    }
                    var markerPosition = new google.maps.LatLng(WriteLat, WriteLng);
                    if (next <= 100) {
                        var marker = new google.maps.Marker({
                            position: markerPosition,
                            map: map,
                            icon: 'RLimages/icong' + next + '.png',
                            shadow: 'RLimages/shadow.png'
                        });
                    } else {
                        var marker = new google.maps.Marker({
                            position: markerPosition,
                            map: map,
                            icon: 'RLimages/icong.png',
                            shadow: 'RLimages/shadow.png'
                        });
                    }
                    var flagText = new String();
                    if (document.getElementById("unitSystem").value == 0) flagText = next + " mile marker" + "  (" + WriteDist.toFixed(2) + " miles." + ")";
                    if (document.getElementById("unitSystem").value == 1) flagText = next + " kilometer marker" + "  (" + WriteDist.toFixed(2) + " km." + ")";
                    attachInstructionText(marker, flagText);
                    mileMarkers[next - 1] = marker;
                    next++;
                }
                var Last = new google.maps.LatLng(Lat, Lng);
                var LastDist = Dist;
            }
        }
    } else if (showingMarkers) {
        showingMarkers = false;
        if (Language == "JP")
            document.getElementById("toggleMileMarkers").value = "è·é›¢ãƒžãƒ¼ã‚«ãƒ¼ã‚’ã‚ªãƒ³ã«ã™ã‚‹";
        else if (Language == "FR")
            document.getElementById("toggleMileMarkers").value = "Activer les marqueurs de distance";
        else
            document.getElementById("toggleMileMarkers").value = "Turn distance markers on";
        for (var i = 0; i < mileMarkers.length; i++) {
            mileMarkers[i].setMap(null);
        }
    }
}

function pathPoint(lat, lng, time) {
    this.lat = lat;
    this.lng = lng;
    this.time = time;
}

function routeData(lat, lng, dist, height, pitch, peak, trough, instructions, write) {
    this.lat = lat;
    this.lng = lng;
    this.dist = dist;
    this.height = height;
    this.pitch = pitch;
    this.peak = peak;
    this.trough = trough;
    this.instructions = instructions;
    this.write = write;
}

function storeRouteData() {
    currentRouteData.length = 0;
    var thisRoute = routeResult.routes[0].legs[0];
    var step = thisRoute.steps.length;
    for (var i = 0; i < step; i++) {
        var path = thisRoute.steps[i].path.length;
        for (var j = 0; j < path; j++) {
            var txt = new String();
            if (j == 0) {
                txt = thisRoute.steps[i].instructions;
            }
            if (i > 0 && j == 0) {
                var cRDlen = currentRouteData.length;
                currentRouteData[cRDlen - 1].instructions = txt;
                continue;
            }
            var Lat = thisRoute.steps[i].path[j].lat();
            var Lng = thisRoute.steps[i].path[j].lng();
            var temp = new routeData(Lat, Lng, 0, 0, 0, false, false, txt, false);
            currentRouteData.push(temp);
        }
    }
    currentRouteData[0].dist = 0;
    var dist = 0;
    for (var i = 0; i < currentRouteData.length - 1; i++) {
        var j = i + 1;
        var distMeters = LatLngDist(currentRouteData[i].lat, currentRouteData[i].lng, currentRouteData[j].lat, currentRouteData[j].lng) * 1000;
        dist += distMeters;
        currentRouteData[j].dist = dist;
    }
    for (var i = 0; i < currentRouteData.length - 1; i++) {
        if (currentRouteData[i].instructions.length > 0) {
            var turnLoc = new google.maps.LatLng(currentRouteData[i].lat, currentRouteData[i].lng);
            var turnTxt = currentRouteData[i].instructions;
            var turnMarker = new google.maps.Marker({
                position: turnLoc,
                map: map,
                draggable: true,
                visible: false,
                title: turnTxt
            });
        }
    }
    makePermalink();
    createSpacedPath();
    return;
}

function getElevations() {
    if (Country != "United States") {
        alert("You are not in the United States.");
        document.getElementById("Climb").style.color = "black";
        document.getElementById("Grade").style.color = "black";
        document.getElementById("Climb").innerHTML = "Outside";
        document.getElementById("Grade").innerHTML = "US";
        return;
    }
    document.getElementById("Climb").style.color = "black";
    document.getElementById("Grade").style.color = "black";
    document.getElementById("Climb").innerHTML = "...";
    document.getElementById("Grade").innerHTML = "...";
    $('body').append('<div id="progress">Profiling...</div>');
    retrieved = 0;
    for (var i = 0; i < useThis.length; i++) {
        getSingleElevation(i);
    }
    return;
}

function getSingleElevation(i) {
    var URL = "http://www.routeloops.com/altitude.php";
    var Lat = useThis[i].lat;
    var Lng = useThis[i].lng;
    URL += "?lat=" + Lat + "&lng=" + Lng;
    var html = $.ajax({
        url: URL,
        async: true,
        dataType: 'html',
        success: function(result) {
            var istart = result.indexOf("double>");
            istart += 7;
            var iend = result.indexOf("</double");
            iend -= 0;
            alt = result.substring(istart, iend);
            useThis[i].height = parseFloat(alt);
            retrieved++;
            if (retrieved == useThis.length) {
                $('#progress').remove();
                profileRoute();
            }
        }
    }).responseText;
    return;
}

function profileRoute() {
    var Profile = new String();
    for (var i = 0; i < useThis.length; i++) {
        Profile += useThis[i].dist + "\n";
    }
    var Profile = new String();
    for (var i = 0; i < useThis.length; i++) {
        Profile += useThis[i].height + "\n";
    }
    var runAve = 7;
    var istart;
    var iend;
    var aveArray = [];
    aveArray.length = 0;
    for (i = 0; i < useThis.length; i++) {
        if (useThis.length < runAve) {
            istart = 0;
            iend = useThis.length - 1;
            runAve = iend - istart + 1;
        } else {
            istart = i - Math.floor(runAve / 2);
            iend = istart + runAve - 1;
            while (istart < 0) {
                istart++;
                iend++;
            }
            while (iend > useThis.length - 1) {
                istart--;
                iend--;
            }
            var Average = 0;
            for (var j = istart; j < iend + 1; j++) {
                Average += useThis[j].height;
            }
            Average /= runAve;
            aveArray.push(Average);
        }
    }
    var Profile = new String();
    for (var i = 0; i < aveArray.length; i++) {
        Profile += aveArray[i] + "\n";
    }
    var averageElevation = 0;
    var maxElevation = 0;
    var minElevation = 1000000;
    var pitch = 0;
    var maxPitch = -100;
    var maxPindex = 0;
    var minPitch = 0;
    var countPeaks = 0;
    var countTroughs = 0;
    var delta = 2;
    for (var i = 0; i < useThis.length; i++) {
        averageElevation += aveArray[i];
        maxElevation = Math.max(maxElevation, aveArray[i]);
        minElevation = Math.min(minElevation, aveArray[i]);
        var minDist = 30;
        if (i < useThis.length - 1) {
            var distMeters = 0;
            var j = i;
            while (distMeters < minDist) {
                j++;
                if (j > useThis.length - 1) break;
                distMeters = useThis[j].dist - useThis[i].dist;
            }
            if (distMeters >= minDist)
                pitch = (useThis[j].height - useThis[i].height) / distMeters;
            else
                pitch = 0;
            useThis[i].pitch = pitch;
        } else if (i == useThis.length - 1) {
            useThis[i].pitch = useThis[i - 1].pitch;
        }
        if (useThis[i].pitch > maxPitch) maxPindex = i;
        maxPitch = Math.max(maxPitch, useThis[i].pitch);
        minPitch = Math.min(minPitch, useThis[i].pitch);
        if (i > 0 && i < useThis.length - 1) {
            var h = i - 1;
            var j = i + 1;
            if (aveArray[i] - aveArray[h] > delta && aveArray[i] - aveArray[j] > delta)
                useThis[i].peak = true;
            if (aveArray[h] - aveArray[i] > delta && aveArray[j] - aveArray[i] > delta)
                useThis[i].trough = true;
        }
        if (useThis[i].peak) countPeaks++;
        if (useThis[i].trough) countTroughs++;
    }
    averageElevation /= useThis.length;
    if (pitchMarker) pitchMarker.setMap(null);
    var location = new google.maps.LatLng(useThis[maxPindex].lat, useThis[maxPindex].lng);
    pitchMarker = new google.maps.Marker({
        position: location,
        map: map,
        icon: 'RLimages/steep.png',
        title: "Steepest Climb"
    });
    var ClimbRange = maxElevation - minElevation;
    document.getElementById("Climb").style.color = "red";
    document.getElementById("Grade").style.color = "red";
    if (ClimbRange > 0 && ClimbRange < 20)
        document.getElementById("Climb").innerHTML = "Easy(" + ClimbRange.toFixed(0) + "m)";
    if (ClimbRange > 20 && ClimbRange < 100)
        document.getElementById("Climb").innerHTML = "Ave(" + ClimbRange.toFixed(0) + "m)";
    if (ClimbRange > 100 && ClimbRange < 20000)
        document.getElementById("Climb").innerHTML = "Hard(" + ClimbRange.toFixed(0) + "m)";
    if (maxPitch * 100 > 0 && maxPitch * 100 < 7)
        document.getElementById("Grade").innerHTML = "Easy(" + (maxPitch * 100).toFixed(1) + "%)";
    if (maxPitch * 100 > 7 && maxPitch * 100 < 12)
        document.getElementById("Grade").innerHTML = "Ave(" + (maxPitch * 100).toFixed(1) + "%)";
    if (maxPitch * 100 > 12 && maxPitch * 100 < 500)
        document.getElementById("Grade").innerHTML = "Hard(" + (maxPitch * 100).toFixed(1) + "%)";
}

function attachInstructionText(marker, text) {
    google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
    return;
}

function useImport() {
    var baseL;
    baseL = pointArray[0].lat.toString();
    baseL = baseL + ",";
    baseL = baseL + pointArray[0].lng.toString();
    document.getElementById("address").value = baseL;
    createBaseMarker();
    codeAddress();
    baseSet = true;
    var polyline = [];
    importedPolyline.length = 0;
    var TotalLength;
    var CumDist = [];
    var nL = pointArray.length;
    for (var j = 0; j < nL; j++) {
        var LL = new google.maps.LatLng(pointArray[j].lat, pointArray[j].lng);
        polyline.push(LL);
        importedPolyline.push(LL);
    }
    TotalLength = 0;
    CumDist.push(TotalLength);
    for (var i = 1; i < polyline.length; i++) {
        var dist = LatLngDist(polyline[i - 1].lat(), polyline[i - 1].lng(), polyline[i].lat(), polyline[i].lng());
        TotalLength += dist;
        CumDist.push(TotalLength);
    }
    var nPoints = 4;
    var chunk = TotalLength / (nPoints + 0.99);
    rlPoints.length = 0;
    var point = 1;
    for (var i = 0; i < polyline.length; i++) {
        if (CumDist[i] >= point * chunk) {
            rlPoints.push(polyline[i]);
            point++;
        }
    }
    if (travelDirection == 0)
        var i = 0;
    else
        rlPoints.reverse();
    if (document.getElementById("unitSystem").value == 0)
        document.getElementById("length").value = (TotalLength * 1000 * 100 / 2.54 / 12 / 5280).toFixed(2);
    else if (document.getElementById("unitSystem").value == 1)
        document.getElementById("length").value = TotalLength.toFixed(2);
    alert("Rainbow line -- your imported route. (red>orange>green>violet\nBlue line -- your current RouteLoop.\nYou can drag the RouteLoop to match the imported route as closely as desired.");
    drawTrack();
    return;
}

function drawTrack() {
    importedTracks.length = 0;
    if (importedPolyline.length > 0) {
        var chunk = Math.floor(importedPolyline.length / 4);
        var iP1 = [];
        iP1.length = 0;
        for (var i = 0 * chunk; i < 1 * chunk; i++) iP1.push(importedPolyline[i]);
        var iP2 = [];
        iP2.length = 0;
        for (var i = 1 * chunk; i < 2 * chunk; i++) iP2.push(importedPolyline[i]);
        var iP3 = [];
        iP3.length = 0;
        for (var i = 2 * chunk; i < 3 * chunk; i++) iP3.push(importedPolyline[i]);
        var iP4 = [];
        iP4.length = 0;
        for (var i = 3 * chunk; i < importedPolyline.length; i++) iP4.push(importedPolyline[i]);
        importedTrack1 = new google.maps.Polyline({
            strokeColor: "#FF0000",
            strokeOpacity: 0.5,
            strokeWeight: 10,
            path: iP1
        });
        importedTrack1.setMap(map);
        importedTracks.push(importedTrack1);
        importedTrack2 = new google.maps.Polyline({
            strokeColor: "#FFAD00",
            strokeOpacity: 0.5,
            strokeWeight: 10,
            path: iP2
        });
        importedTrack2.setMap(map);
        importedTracks.push(importedTrack2);
        importedTrack3 = new google.maps.Polyline({
            strokeColor: "#06FF00",
            strokeOpacity: 0.5,
            strokeWeight: 10,
            path: iP3
        });
        importedTrack3.setMap(map);
        importedTracks.push(importedTrack3);
        importedTrack4 = new google.maps.Polyline({
            strokeColor: "#B400FF",
            strokeOpacity: 0.5,
            strokeWeight: 10,
            path: iP4
        });
        importedTrack4.setMap(map);
        importedTracks.push(importedTrack4);
        calcRoute();
    }
    return;
}

function clearTrack() {
    for (var i = 0; i < importedTracks.length; i++)
        if (importedTracks[i]) importedTracks[i].setMap(null);
    return;
}

function parseText(textStuff) {
    var textStuff;
    pointArray.length = 0;
    var trackPos = textStuff.indexOf("<trkpt");
    if (trackPos > 0) {
        var point = trackPos + 1;
        pointArray.length = 0;
        while (point > 0) {
            point = trackPos + 1;
            var latStartPos = textStuff.indexOf("lat", trackPos + 1);
            latStartPos = textStuff.indexOf("\"", latStartPos + 1);
            var latEndPos = textStuff.indexOf("\"", latStartPos + 1);
            var holdLat = textStuff.slice(latStartPos + 1, latEndPos);
            var Lat = parseFloat(holdLat);
            var lonStartPos = textStuff.indexOf("lon", trackPos + 1);
            lonStartPos = textStuff.indexOf("\"", lonStartPos + 1);
            var lonEndPos = textStuff.indexOf("\"", lonStartPos + 1);
            var holdLon = textStuff.slice(lonStartPos + 1, lonEndPos);
            var Lon = parseFloat(holdLon);
            pointArray.push(new LatLng(Lat, Lon));
            trackPos = textStuff.indexOf("<trkpt", point);
            point = trackPos + 1;
        }
    }
    var trackPos = textStuff.indexOf("<rtept");
    if (trackPos > 0) {
        var point = trackPos + 1;
        pointArray.length = 0;
        while (point > 0) {
            point = trackPos + 1;
            var latStartPos = textStuff.indexOf("lat", trackPos + 1);
            latStartPos = textStuff.indexOf("\"", latStartPos + 1);
            var latEndPos = textStuff.indexOf("\"", latStartPos + 1);
            var holdLat = textStuff.slice(latStartPos + 1, latEndPos);
            var Lat = parseFloat(holdLat);
            var lonStartPos = textStuff.indexOf("lon", trackPos + 1);
            lonStartPos = textStuff.indexOf("\"", lonStartPos + 1);
            var lonEndPos = textStuff.indexOf("\"", lonStartPos + 1);
            var holdLon = textStuff.slice(lonStartPos + 1, lonEndPos);
            var Lon = parseFloat(holdLon);
            pointArray.push(new LatLng(Lat, Lon));
            trackPos = textStuff.indexOf("<rtept", point);
            point = trackPos + 1;
        }
    }
    var trackPos = textStuff.indexOf("<Trackpoint>");
    if (trackPos > 0) {
        var point = trackPos + 1;
        pointArray.length = 0;
        while (point > 0) {
            point = trackPos + 1;
            var latStartPos = textStuff.indexOf("LatitudeDegrees", trackPos + 1);
            latStartPos = textStuff.indexOf(">", latStartPos + 1);
            var latEndPos = textStuff.indexOf("<", latStartPos + 1);
            var holdLat = textStuff.slice(latStartPos + 1, latEndPos);
            var Lat = parseFloat(holdLat);
            var lonStartPos = textStuff.indexOf("LongitudeDegrees", trackPos + 1);
            lonStartPos = textStuff.indexOf(">", lonStartPos + 1);
            var lonEndPos = textStuff.indexOf("<", lonStartPos + 1);
            var holdLon = textStuff.slice(lonStartPos + 1, lonEndPos);
            var Lon = parseFloat(holdLon);
            pointArray.push(new LatLng(Lat, Lon));
            trackPos = textStuff.indexOf("<Trackpoint>", point);
            point = trackPos + 1;
        }
    }
    if (pointArray.length > 1) {
        useImport();
    } else if (pointArray.length < 1) {
        alert("Import of only " + pointArray.length + " points.  Not enough for a route.");
    }
    return;
}

function makePermalink() {
    var currentURL = location.href;
    var permalink;
    var protocol = location.protocol;
    var host = location.host;
    var path = location.pathname;
    var extra;
    var wptString;
    wptString = "numWpts=" + routeResult.routes[0].legs[0].via_waypoint.length + "&";
    for (var i = 0; i < routeResult.routes[0].legs[0].via_waypoint.length; i++)
        wptString = wptString + "wpt[" + i + "]=" + routeResult.routes[0].legs[0].via_waypoint[i].location.lat() + ":" + routeResult.routes[0].legs[0].via_waypoint[i].location.lng() + "&";
    extra = "?Base=" + BaseLocation.lat() + ":" + BaseLocation.lng() + "&" + wptString;
    extra = extra + "tM=" + travelMode;
    extra = extra + "&len=" + document.getElementById("length").value;
    extra = extra + "&unitS=" + document.getElementById("unitSystem").value;
    extra = extra + "&doClean=" + DoClean;
    permalink = protocol + "//" + host + path + extra;
    document.getElementById("permalink").href = permalink;
    permalink = protocol + "//" + host + path + "/OSM" + extra;
    document.getElementById("OSMversion").href = permalink;
    return;
}

function writeCookies() {
    var CookieAddress = document.getElementById("address").value;
    var CookieLength = document.getElementById("length").value;
    var CookieTM = document.getElementById("travelMode").value;
    var CookieTD = document.getElementById("travelDirection").value;
    var CookieUS = document.getElementById("unitSystem").value;
    var CookieClean = document.getElementById("toggleClean").value;
    createCookie("address", CookieAddress);
    createCookie("length", CookieLength);
    createCookie("TM", CookieTM);
    createCookie("TD", CookieTD);
    createCookie("US", CookieUS);
    createCookie("Clean", CookieClean);
    return;
}

function storeURL() {
    var storedURL;
    var protocol = location.protocol;
    var host = location.host;
    var path = location.pathname;
    var extra;
    var wptString;
    wptString = "numWpts=" + routeResult.routes[0].legs[0].via_waypoint.length + "&";
    for (var i = 0; i < routeResult.routes[0].legs[0].via_waypoint.length; i++)
        wptString = wptString + "wpt[" + i + "]=" + routeResult.routes[0].legs[0].via_waypoint[i].location.lat() + ":" + routeResult.routes[0].legs[0].via_waypoint[i].location.lng() + "&";
    extra = "?Base=" + BaseLocation.lat() + ":" + BaseLocation.lng() + "&" + wptString;
    extra = extra + "tM=" + travelMode;
    extra = extra + "&len=" + document.getElementById("length").value;
    extra = extra + "&unitS=" + document.getElementById("unitSystem").value;
    storedURL = protocol + "//" + host + path + extra;
    return storedURL;
}

function parseUrl(currentURL) {
    var returnStatus = new Boolean();
    var urlInputsName = [];
    var urlInputsValue = [];
    var p1, p2, val;
    returnStatus = false;
    haveEmbedded = false;
    p1 = currentURL.indexOf("URLformat");
    if (p1 > 0) {
        p1 = currentURL.indexOf("=", p1) + 1;
        p2 = currentURL.indexOf("&", p1);
        val = currentURL.substring(p1, p2);
        if (val == "embed") {
            p1 = currentURL.indexOf("&", p2) + 1;
            p2 = currentURL.indexOf("=", p1) + 1;
            val = currentURL.substring(p1, p2);
            if (val == "Base=") {
                p1 = p2;
                p2 = currentURL.indexOf("&", p1);
                val = currentURL.substring(p1, p2);
                var Eaddress = val.replace(/%20/g, " ");
            } else return;
            p1 = p2 + 1;
            p2 = currentURL.indexOf("=", p1) + 1;
            val = currentURL.substring(p1, p2);
            if (val == "len=") {
                p1 = p2;
                p2 = currentURL.length;
                val = currentURL.substring(p1, p2);
                var Elength = parseFloat(val);
                haveEmbedded = true;
                document.getElementById("address").value = Eaddress;
                codeAddress();
                document.getElementById("length").value = Elength.toFixed(2);
                return;
            } else return;
        } else return;
    }
    if (currentURL.indexOf("zoom") > 0) {
        haveOldUrl = false;
        p1 = currentURL.indexOf("ll=") + 3;
        p2 = currentURL.indexOf("%20", p1);
        val = currentURL.substring(p1, p2);
        if (val.length > 0) {
            oldUrlLng = parseFloat(val);
        } else return;
        p1 = p2 + 3;
        p2 = currentURL.indexOf("&", p1);
        val = currentURL.substring(p1, p2);
        if (val.length > 0) {
            oldUrlLat = parseFloat(val);
        } else return;
        p1 = p2 + 5;
        p2 = currentURL.indexOf("&", p1);
        val = currentURL.substring(p1, p2);
        if (val.length > 0) {
            oldUrlLen = parseFloat(val) * 5280 * 12 * 2.54 / 100;
        } else return;
        p1 = p2 + 4;
        p2 = currentURL.indexOf("&", p1);
        val = currentURL.substring(p1, p2);
        if (val.length > 0) {
            oldUrlRnd = parseFloat(val);
        } else return;
        p1 = p2 + 4;
        p2 = currentURL.indexOf("&", p1);
        val = currentURL.substring(p1, p2);
        if (val.length > 0) {
            oldUrlAllow = val;
        } else return;
        haveOldUrl = true;
        return;
    }
    var firstSplit = currentURL.split("?");
    if (firstSplit.length == 2) {
        var secondSplit = firstSplit[1].split("&");
        for (var i = 0; i < secondSplit.length; i++) {
            var hold = secondSplit[i].split("=");
            urlInputsName[i] = hold[0];
            urlInputsValue[i] = hold[1];
        }
        if (urlInputsName[0] == "Base") {
            var hold = urlInputsValue[0].split(":");
            var Lat = parseFloat(hold[0]);
            var Lng = parseFloat(hold[1]);
            uBase = new google.maps.LatLng(Lat, Lng);
        } else {
            return returnStatus;
        }
        if (urlInputsName[1] == "numWpts") {
            var numWpts = parseInt(urlInputsValue[1]);
        } else {
            return returnStatus;
        }
        for (var i = 0; i < numWpts; i++) {
            if (urlInputsName[i + 2] == "wpt[" + i + "]") {
                var hold = urlInputsValue[i + 2].split(":");
                var Lat = parseFloat(hold[0]);
                var Lng = parseFloat(hold[1]);
                urlPoints[i] = new google.maps.LatLng(Lat, Lng);
            } else {
                return returnStatus;
            }
        }
        if (urlInputsName[numWpts + 2] == "tM") {
            utM = parseInt(urlInputsValue[numWpts + 2]);
        } else {
            return returnStatus;
        }
        if (urlInputsName[numWpts + 3] == "len") {
            ulen = parseFloat(urlInputsValue[numWpts + 3]);
        } else {
            return returnStatus;
        }
        if (urlInputsName[numWpts + 4] == "unitS") {
            uuS = parseInt(urlInputsValue[numWpts + 4]);
        } else {
            return returnStatus;
        }
        if (urlInputsName[numWpts + 5] == "doClean") {
            uClean = parseInt(urlInputsValue[numWpts + 5]);
        } else {
            return returnStatus;
        }
        returnStatus = true;
        return returnStatus;
    } else {
        return returnStatus;
    }
}

function buildDirections(directionResult) {
    var myRoute = directionResult.routes[0].legs[0];
    var step = myRoute.steps.length;
    var cumulative = 0;
    var cumWrite;
    Directions = "<table border=1 rules=1>";
    Directions += "<tbody>";
    Directions += "<tr>";
    Directions += "<th colspan=4 align=left bgcolor='#ffec8b'>";
    Directions += "Start: " + myRoute.start_address;
    Directions += "</th>";
    Directions += "</tr>";
    Directions += "<tr>";
    Directions += "<td colspan=4 align=left>";
    Directions += "Total distance is " + totalDistanceInCurrentUnits.toFixed(2);
    if (document.getElementById("unitSystem").value == 0)
        Directions += " mi.";
    else
        Directions += " km.";
    Directions += "</td>";
    Directions += "</tr>";
    if (directionResult.routes[0].warnings.length > 0) {
        Directions += "<tr>";
        Directions += "<td colspan=4 align=left>";
        Directions += "<strong><i>" + directionResult.routes[0].warnings[0] + "</i></strong>";
        Directions += "</td>";
        Directions += "</tr>";
    }
    Directions += "<tr>";
    Directions += "<td></td> <td>Instruction</td> <td>Dist.</td> <td>Cum.<br>Dist.</td>";
    Directions += "</tr>";
    for (var i = 0; i < step; i++) {
        Directions += "<tr>";
        cumulative += myRoute.steps[i].distance.value;
        if (document.getElementById("unitSystem").value == 0)
            cumWrite = cumulative * 100 / 2.54 / 12 / 5280.;
        else
            cumWrite = cumulative / 1000;
        Directions += "<td>";
        Directions += i + 1 + ".";
        Directions += "</td>";
        Directions += "<td>";
        Directions += "<a href=\"javascript:showDirectionFlag(" + i + ")\">";
        Directions += myRoute.steps[i].instructions;
        Directions += "</a>";
        Directions += "</td>";
        Directions += "<td width='15%'>";
        Directions += myRoute.steps[i].distance.text;
        Directions += "</td>";
        Directions += "<td width='15%'>";
        if (document.getElementById("unitSystem").value == 0)
            Directions += cumWrite.toFixed(2) + "mi";
        else
            Directions += cumWrite.toFixed(2) + "km";
        Directions += "</td>";
        Directions += "</tr>";
    }
    Directions += "<tr>";
    Directions += "<th colspan=4 align=left bgcolor='#ffec8b'>";
    if (myRoute.end_address != null) Directions += "End: " + myRoute.end_address;
    else Directions += "End: " + myRoute.start_address;
    Directions += "</th>";
    Directions += "</tr>";
    Directions += "<tr>";
    Directions += "<td colspan=4 align=left>";
    Directions += "<strong>" + directionResult.routes[0].copyrights + "</strong>";
    Directions += "</td>";
    Directions += "</tr>";
    Directions += "</tbody>";
    Directions += "</table>";
    document.getElementById("mydirectionsPanel").innerHTML = Directions;
}

function buildRlUrl() {
    RlUrl = new String();
    RlUrl += "http://www.routeloops.com/routeloops.php";
    RlUrl += "?";
    if (haveOldUrl) {
        haveOldUrl = false;
        RlUrl += "x=" + oldUrlLng;
        RlUrl += "&";
        RlUrl += "y=" + oldUrlLat;
        RlUrl += "&";
        RlUrl += "length=" + oldUrlLen;
        RlUrl += "&";
        RlUrl += "heading=-1";
        RlUrl += "&";
        RlUrl += "shape=-1";
        RlUrl += "&";
        RlUrl += "rand=" + oldUrlRnd;
        RlUrl += "&";
        RlUrl += "allow=" + oldUrlAllow;
        return;
    }
    RlUrl += "x=" + BaseLocation.lng();
    RlUrl += "&";
    RlUrl += "y=" + BaseLocation.lat();
    var length = document.getElementById("length").value;
    if (document.getElementById("unitSystem").value == 0)
        length = length * 5280 * 12 * 2.54 / 100;
    else
        length = length * 1000;
    RlUrl += "&";
    RlUrl += "length=" + length;
    if (travelHeading == 0)
        var heading = Math.random() * 2 * 180;
    else if (travelHeading == 1) {
        var heading = Math.random() * 180 / 4 - 1 * 180 / 8;
        if (heading < 0) heading += 360;
    } else if (travelHeading == 2)
        var heading = Math.random() * 180 / 4 + 180 / 8;
    else if (travelHeading == 3)
        var heading = Math.random() * 180 / 4 + 3 * 180 / 8;
    else if (travelHeading == 4)
        var heading = Math.random() * 180 / 4 + 5 * 180 / 8;
    else if (travelHeading == 5)
        var heading = Math.random() * 180 / 4 + 7 * 180 / 8;
    else if (travelHeading == 6)
        var heading = Math.random() * 180 / 4 + 9 * 180 / 8;
    else if (travelHeading == 7)
        var heading = Math.random() * 180 / 4 + 11 * 180 / 8;
    else if (travelHeading == 8)
        var heading = Math.random() * 180 / 4 + 13 * 180 / 8;
    RlUrl += "&";
    RlUrl += "heading=" + heading;
    RlUrl += "&";
    RlUrl += "shape=-1";
    RlUrl += "&";
    rnd = Math.random();
    RlUrl += "rand=" + rnd;
    if (travelMode == 0)
        var allow = "0%2C1%2C2%2C3";
    else if (travelMode == 1)
        var allow = "0%2C1%2C4%2C5";
    else if (travelMode == 2)
        var allow = "0%2C1%2C4%2C5%2C6";
    RlUrl += "&";
    RlUrl += "allow=" + allow;
    return;
}

function revertToPreviousRoute() {
    historyPointer--;
    historyPointer = Math.max(historyPointer, 0);
    thisRoute = resultHistory[historyPointer].RouteData.routes[0].legs[0];
    putTheseSettings(resultHistory[historyPointer].Settings);
    BaseLocation = new google.maps.LatLng(thisRoute.start_location.lat(), thisRoute.start_location.lng());
    document.getElementById("address").value = BaseLocation.toString();
    createBaseMarker();
    codeAddress();
    rlPoints.length = 0;
    for (var i = 0; i < thisRoute.via_waypoint.length; i++)
        rlPoints.push(thisRoute.via_waypoint[i].location);
    document.getElementById("travelMode").value == resultHistory[historyPointer].Settings.travelMode;
    storeInHistory = false;
    if (pitchMarker) pitchMarker.setMap(null);
    calcRoute();
    return;
}

function advanceToNextRoute() {
    historyPointer++;
    historyPointer = Math.min(historyPointer, resultHistory.length - 1);
    thisRoute = resultHistory[historyPointer].RouteData.routes[0].legs[0];
    putTheseSettings(resultHistory[historyPointer].Settings);
    BaseLocation = new google.maps.LatLng(thisRoute.start_location.lat(), thisRoute.start_location.lng());
    document.getElementById("address").value = BaseLocation.toString();
    createBaseMarker();
    codeAddress();
    rlPoints.length = 0;
    for (var i = 0; i < thisRoute.via_waypoint.length; i++)
        rlPoints.push(thisRoute.via_waypoint[i].location);
    document.getElementById("travelMode").value == resultHistory[historyPointer].Settings.travelMode;
    storeInHistory = false;
    if (pitchMarker) pitchMarker.setMap(null);
    calcRoute();
    return;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/ ";
    return;
}

function readCookie(name) {
    var ca = document.cookie.split(';');
    var nameEQ = name + "=";
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function checkCookie() {
    createCookie("cookieTest", 1);
    if (readCookie("cookieTest") == 1) return true;
    else return false;
}

function cleanTails(response) {
    var pLpoints = new Array();
    var pLdist = new Array();
    var pLclose = new Array();
    var pLsep = new Array();
    var newPath = new Array();
    var pLuse = new Array();
    for (var i = 0; i < routeLatLng.length; i++) {
        pLpoints.push(routeLatLng[i].location);
    }
    pLdist.push(0);
    var cumulative = 0;
    for (var i = 0; i < pLpoints.length - 1; i++) {
        pLuse[i] = false;
        cumulative += LatLngDist(pLpoints[i].lat(), pLpoints[i].lng(), pLpoints[i + 1].lat(), pLpoints[i + 1].lng());
        pLdist.push(cumulative);
        newPath.push(pLpoints[i]);
    }
    newPath.push(pLpoints[pLpoints.length - 1]);
    var closest;
    var point;
    var dist;
    for (var i = 0; i < pLpoints.length; i++) {
        var thisOne = pLpoints[i];
        for (var j = i + 1; j < pLpoints.length; j++) {
            thatOne = pLpoints[j];
            dist = LatLngDist(thisOne.lat(), thisOne.lng(), thatOne.lat(), thatOne.lng());
            if (j == i + 1) {
                closest = dist;
                point = j;
            } else {
                if (dist < closest) {
                    closest = dist;
                    point = j;
                }
            }
        }
        pLclose[i] = point;
        pLsep[i] = closest;
    }
    var tailSize;
    for (var i = 0; i < pLpoints.length; i++) {
        pLuse[i] = true;
        if (pLclose[i] - i != 1) {
            tailSize = (pLdist[pLclose[i]] - pLdist[i]) / cumulative;
            if (tailSize < 0.2) {
                i = pLclose[i];
            }
        }
    }
    newPath.length = 0;
    for (var i = 0; i < pLpoints.length; i++)
        if (pLuse[i])
            newPath.push(pLpoints[i]);
    var cleanedUp = pLpoints.length - newPath.length;
    thisRoute = response.routes[0].legs[0];
    rlPointsNew.length = 0;
    for (var i = 0; i < thisRoute.via_waypoint.length; i++) {
        for (var j = 0; j < newPath.length; j++) {
            dist = LatLngDist(thisRoute.via_waypoint[i].location.lat(), thisRoute.via_waypoint[i].location.lng(), newPath[j].lat(), newPath[j].lng());
            if (j == 0) {
                closest = dist;
                point = j;
            } else {
                if (dist < closest) {
                    closest = dist;
                    point = j;
                }
            }
        }
        rlPointsNew.push(newPath[point]);
    }
    rlPoints.length = 0;
    for (var i = 0; i < rlPointsNew.length; i++) rlPoints.push(rlPointsNew[i]);
    for (var i = 0; i < fixedPoints.length; i++) rlPoints[i] = fixedPoints[i].marker.getPosition();
    return cleanedUp;
}

function compareToPlan(response) {
    retflag = true;
    var myRoute = response.routes[0].legs[0];
    var length = document.getElementById("length").value;
    if (document.getElementById("unitSystem").value == 0)
        length = length * 5280 * 12 * 2.54 / 100;
    else
        length = length * 1000;
    var ratio = myRoute.distance.value / length;
    if (ratio > 2) {
        if (document.getElementById("unitSystem").value == 0) {
            var have = myRoute.distance.value * 100 / 2.54 / 12 / 5280;
            var want = length * 100 / 2.54 / 12 / 5280;
        } else {
            var have = myRoute.distance.value / 1000;
            var want = length / 1000;
        }
        var answer = confirm("The current route length (" + have.toFixed(2) + ") is too far from the requested distance (" + want.toFixed(2) + "). \nClick 'OK' to update the desired route length and use this route. \nClick 'Cancel' to delete this route and generate a new one.");
        if (answer) {
            document.getElementById("length").value = have;
            length = have;
            retflag = true;
        } else
            retflag = false;
    } else {
        retflag = true;
    }
    if (!allowFerries) {
        for (var i = 0; i < myRoute.steps.length; i++) {
            var tmp = myRoute.steps[i].instructions.toLowerCase();
            if (tmp.indexOf("take the") > -1 && tmp.indexOf("ferry") > -1) {
                retflag = false;
            }
        }
    }
    return retflag;
}

function getLength() {
    var length = document.getElementById("length").value;
    if (document.getElementById("unitSystem").value == 0) {
        length = length * 5280 * 12 * 2.54 / 100;
        tcxSpeed = document.getElementById("tcxSpeed").value * (5280 * 12 * 2.54 / 100) / (60 * 60);
    } else {
        length = length * 1000;
        tcxSpeed = document.getElementById("tcxSpeed").value * (1000) / (60 * 60);
    }
    requestedLengthInMeters = length;
    targetLengthInMeters = length;
    resetScale();
    return;
}

function resetScale() {
    scaleCount = 0;
    scaleFactor = 0.80;
    tooLong = 0;
    tooShort = 0;
    return;
}

function adjustScale() {
    if (totalDistanceInCurrentUnits == 0) {
        scaleFactor = 0.80;
        scaleCount++;
        tooLong = 0;
        tooShort = 0;
    } else if (totalDistanceInCurrentUnits != 0 && scaleCount == 0) {
        scaleCount++;
        tooLong = 0;
        tooShort = 0;
    } else if (totalDistanceInCurrentUnits != 0 && scaleCount != 0) {
        var lWanted = document.getElementById("length").value;
        if (totalDistanceInCurrentUnits < lWanted * 0.9) {
            tooLong = 0;
            tooShort++;
        } else if (totalDistanceInCurrentUnits > lWanted * 1.1) {
            tooShort = 0;
            tooLong++;
        } else {
            tooLong = 0;
            tooShort = 0;
        }
        if (tooShort > 2) {
            scaleFactor += 0.02;
            scaleFactor = Math.min(scaleFactor, 1.3);
            tooShort = 0;
            targetLengthInMeters *= scaleFactor;
        }
        if (tooLong > 2) {
            scaleFactor -= 0.02;
            scaleFactor = Math.max(scaleFactor, 0.7);
            tooLong = 0;
            targetLengthInMeters *= scaleFactor;
        }
    }
    return;
}

function flagPoints() {
    var dDd = routeResult.routes[0].legs[0];
    for (var i = 0; i < wayFlags.length; i++) {
        wayFlags[i].setMap(null);
    }
    wayFlags.length = 0;
    for (var pnt in dDd.via_waypoint) {
        var location = dDd.via_waypoint[pnt].location;
        var size = new google.maps.Size(60, 44);
        var origin = new google.maps.Point(0, 0);
        var anchor = new google.maps.Point(30, 44);
        var scaledSize = new google.maps.Size(60, 44);
        var flagNum = parseInt(pnt) + 1;
        var file = "RLimages/Flag" + flagNum + ".png";
        var icon = new google.maps.MarkerImage(file, size, origin, anchor, scaledSize);
        var title = "Click the flag to delete waypoint #" + pnt;
        var waypointMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: icon,
            clickable: true,
            draggable: true,
            title: title
        });
        wayFlags.push(waypointMarker);
        google.maps.event.addListener(waypointMarker, 'click', function(mEvent) {
            var close = 0;
            var test = 0;
            var kill = 0;
            close = LatLngDist(mEvent.latLng.lat(), mEvent.latLng.lng(), routeResult.routes[0].legs[0].via_waypoint[0].location.lat(), routeResult.routes[0].legs[0].via_waypoint[0].location.lng());
            for (var i = 1; i < routeResult.routes[0].legs[0].via_waypoint.length; i++) {
                test = LatLngDist(mEvent.latLng.lat(), mEvent.latLng.lng(), routeResult.routes[0].legs[0].via_waypoint[i].location.lat(), routeResult.routes[0].legs[0].via_waypoint[i].location.lng());
                if (test < close) {
                    close = test;
                    kill = i;
                }
            }
            var answer = confirm("The waypoint to be removed is at " + routeResult.routes[0].legs[0].via_waypoint[kill].location.toString() + "\n(Click 'Cancel' if you just want to move, not remove, the point.)");
            if (answer) {
                routeResult.routes[0].legs[0].via_waypoint.splice(kill, 1);
                rlPoints = new Array();
                for (var i = 0; i < routeResult.routes[0].legs[0].via_waypoint.length; i++) {
                    rlPoints[i] = routeResult.routes[0].legs[0].via_waypoint[i].location;
                }
                calcRoute();
            }
        });
    }
}

function resetScale() {
    scaleCount = 0;
    scaleFactor = 0.80;
    tooLong = 0;
    tooShort = 0;
    return;
}

function extractLanguage() {
    var currentURL = location.href;
    var protocol = location.protocol;
    var host = location.host;
    var path = location.pathname;
    Language = "EN";
    if (path.indexOf("-JP") >= 0) Language = "JP";
    else if (path.indexOf("-FR") >= 0) Language = "FR";
}

function createSpacedPath() {
    spacedRouteData.length = 0;
    var spacing = 50;
    var inPoints = currentRouteData.length;
    var routeLength = currentRouteData[inPoints - 1].dist;
    var Lat = currentRouteData[0].lat;
    var Lng = currentRouteData[0].lng;
    var temp = new routeData(Lat, Lng, 0, 0, 0, false, false, "", false);
    spacedRouteData.push(temp);
    var currentDist = 0;
    var istart;
    while (currentDist < routeLength) {
        currentDist += spacing;
        if (currentDist >= routeLength) break;
        for (var i = 0; i < inPoints; i++)
            if (currentRouteData[i].dist > currentDist)
                break;
        var j = i;
        i--;
        var distToGo = currentDist - currentRouteData[i].dist;
        var Lat1 = currentRouteData[i].lat;
        var Lon1 = currentRouteData[i].lng;
        var Lat2 = currentRouteData[j].lat;
        var Lon2 = currentRouteData[j].lng;
        var lat1 = Lat1 * Math.PI / 180;
        var lat2 = Lat2 * Math.PI / 180;
        var lon1 = Lon1 * Math.PI / 180;
        var lon2 = Lon2 * Math.PI / 180;
        var R = 6371;
        var dLat = (lat2 - lat1);
        var dLon = (lon2 - lon1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        var brng = Math.atan2(y, x);
        var d = distToGo / 1000;
        var lat3 = Math.asin(Math.sin(lat1) * Math.cos(d / R) +
            Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));
        var lon3 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat3));
        var Lat3 = lat3 * 180 / Math.PI;
        var Lon3 = lon3 * 180 / Math.PI;
        var temp = new routeData(Lat3, Lon3, currentDist, 0, 0, false, false, "", false);
        spacedRouteData.push(temp);
    }
    var Lat = currentRouteData[inPoints - 1].lat;
    var Lng = currentRouteData[inPoints - 1].lng;
    var temp = new routeData(Lat, Lng, routeLength, 0, 0, false, false, "", false);
    spacedRouteData.push(temp);
    return;
}

function sendToMMF() {
    if (currentRouteData.length <= 0) {
        alert("You must have a track before you can move it to MapMyFitness.");
        return;
    }
    var storage;
    storage = "Base=" + BaseLocation.lat() + ":" + BaseLocation.lng();
    storage = storage + "&tM=" + travelMode;
    storage = storage + "&len=" + document.getElementById("length").value;
    storage = storage + "&unitS=" + document.getElementById("unitSystem").value;
    storage = storage + "&address=" + document.getElementById("address").value;
    storage = storage + "&function=sendToMMF";
    $.post("write_data.php?" + storage);
    var URL;
    var user = document.getElementById("mmfID").value;
    var pass = document.getElementById("mmfPW").value;
    URL = "http://api.mapmyfitness.com/3.1/users/authenticate_user?consumer_key=8956ffb9e80f5828fec062b8ed99731704eaede8b";
    URL += "&u=" + user;
    URL += "&p=" + pass;
    URL += "&o=xml";
    var xml = $.ajax({
        url: URL,
        async: true,
        dataType: 'xml',
        success: function(result) {
            $(result).find("result").each(function() {
                var status = $(this).find("status").text();
                var userID = $(this).find("user_id").text();
                if (parseFloat(status) == 1) {
                    var goodOne = false;
                    var skip = 0;
                    while (!goodOne) {
                        var URL2base = "http://api.mapmyfitness.com/3/routes/save_route";
                        var URL2 = "consumer_key=8956ffb9e80f5828fec062b8ed99731704eaede8b";
                        URL2 += "&u=" + user;
                        URL2 += "&p=" + pass;
                        URL2 += "&o=xml";
                        var currentTime = new Date();
                        var year = currentTime.getFullYear();
                        var month = currentTime.getMonth() + 1;
                        var day = currentTime.getDate();
                        var hour = currentTime.getHours();
                        var minute = currentTime.getMinutes();
                        var name = "RL-" + year + "-" + padZeros(month, 2) + "-" + padZeros(day, 2) + "-" + padZeros(hour, 2) + padZeros(minute, 2);
                        if (document.getElementById("tcxName").value == "") document.getElementById("tcxName").value = name;
                        else name = document.getElementById("tcxName").value;
                        URL2 += "&route_name=" + name;
                        var mmfMode;
                        if (travelMode == 0) mmfMode = 6;
                        else if (travelMode == 1) mmfMode = 2;
                        else if (travelMode == 2) mmfMode = 1;
                        URL2 += "&route_type_id=" + mmfMode;
                        var mmfDist;
                        if (document.getElementById("unitSystem").value == 0)
                            mmfDist = parseFloat(document.getElementById("total_1").innerHTML);
                        else
                            mmfDist = parseFloat(document.getElementById("total_1").innerHTML) * 1000 * 100 / 2.54 / 12 / 5280;
                        URL2 += "&total_distance=" + mmfDist;
                        URL2 += "&route_data=";
                        var iwrote;
                        for (var i = 0; i < currentRouteData.length; i += 1 + skip) {
                            var Lat = currentRouteData[i].lat;
                            var Lng = currentRouteData[i].lng;
                            URL2 += Lng + "," + Lat + "|";
                            iwrote = i;
                        }
                        if (iwrote != currentRouteData.length - 1) {
                            iwrote = currentRouteData.length - 1;
                            var Lat = currentRouteData[iwrote].lat;
                            var Lng = currentRouteData[iwrote].lng;
                            URL2 += Lng + "," + Lat + "|";
                        }
                        URL2.length--;
                        if (URL2.length >= 0) goodOne = true;
                        else skip++;
                    }
                    var html = $.ajax({
                        type: "POST",
                        url: URL2base,
                        data: URL2,
                        async: true,
                        dataType: 'html',
                        success: function(result) {
                            alert("Route successfully transferred to your MapMyFitness account.");
                        }
                    });
                } else alert("Please verify the username and password, and try again.");
            });
        }
    }).responseXML;
}

function makeHistory(result) {
    var settingObject = new Object;
    settingObject.travelMode = document.getElementById("travelMode").value;
    settingObject.direction = document.getElementById("travelDirection").value;
    settingObject.heading = document.getElementById("travelHeading").value;
    settingObject.unit = document.getElementById("unitSystem").value;
    resultHistory.push({
        RouteData: result,
        Settings: settingObject
    });
    return;
}

function putTheseSettings(settingObject) {
    document.getElementById("travelMode").value = settingObject.travelMode;
    document.getElementById("travelDirection").value = settingObject.direction;
    document.getElementById("travelHeading").value = settingObject.heading;
    document.getElementById("unitSystem").value = settingObject.unit;
    return;
}

function addruler() {
    if (!measuring) {
        rulerMarkers.length = 0;
        measuring = true;
        map.setOptions({
            draggableCursor: 'crosshair'
        });
        rulerClickListener = google.maps.event.addListener(map, 'click', rulerClickListen);
    } else {
        measuring = false;
        map.setOptions({
            draggableCursor: null
        });
        for (var i = 0; i < rulerMarkers.length; i++) rulerMarkers[i].setMap(null);
        if (rulerLine) rulerLine.setMap(null);
        google.maps.event.removeListener(rulerClickListener);
        document.getElementById("RulerValue").innerHTML = "";
    }
    return;
}

function rulerClickListen(event) {
    if (rulerMarkers.length < 2) {
        var loc = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        var marker = placeMarker(loc, "");
        marker.setDraggable(true);
        google.maps.event.addListener(marker, 'dragend', drawTheRuler);
        rulerMarkers.push(marker);
    } else {
        if (rulerLine) rulerLine.setMap(null);
        while (rulerMarkers.length >= 2) {
            rulerMarkers[0].setMap(null);
            rulerMarkers.splice(0, 1);
        }
        var loc = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        var marker = placeMarker(loc, "");
        marker.setDraggable(true);
        rulerMarkers.push(marker);
    }
    if (rulerMarkers.length == 2) {
        drawTheRuler();
    }
    return;
}

function drawTheRuler() {
    if (rulerMarkers.length < 2) return;
    if (rulerLine) rulerLine.setMap(null);
    rulerLine = new google.maps.Polyline({
        path: [rulerMarkers[0].getPosition(), rulerMarkers[1].getPosition()],
        strokeColor: "#FFFF00",
        strokeOpacity: 0.5,
        strokeWeight: 15,
        map: map
    });
    var Distance = LatLngDist(rulerMarkers[0].getPosition().lat(), rulerMarkers[0].getPosition().lng(), rulerMarkers[1].getPosition().lat(), rulerMarkers[1].getPosition().lng());
    var DistanceMiles = Distance * KM2MILES;
    var msg = Distance.toFixed(1) + " km, " + DistanceMiles.toFixed(1) + " miles.";
    document.getElementById("RulerValue").innerHTML = msg;
    return;
}

function rotateMessages() {
    rotateIndex++;
    if (rotateIndex > rotatingMessages.length - 1) rotateIndex = 0;
    document.getElementById("Billboard").innerHTML = rotatingMessages[rotateIndex];
    return;
}

function BBgo() {
    if (!iAmRotating) {
        iAmRotating = true;
        if (rotateIndex < 0)
            rotateIndex = Math.min(rotatingMessages.length - 1, parseInt(Math.random() * rotatingMessages.length));
        document.getElementById("Billboard").innerHTML = rotatingMessages[rotateIndex];
        rotatingMessage = setInterval(rotateMessages, 30000);
        document.getElementById("BBdivGoButton").value = "Pause";
    } else {
        iAmRotating = false;
        clearInterval(rotatingMessage);
        document.getElementById("BBdivGoButton").value = "Play";
    }
    return;
}

function checkEmail(entry) {
    var email;
    if (entry == 1)
        email = document.getElementById("emailField");
    else if (entry == 2)
        email = document.getElementById("yourEmail");
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        alert("Please provide a valid email address");
        email.value = "";
        email.focus;
        return false;
    }
    return;
}