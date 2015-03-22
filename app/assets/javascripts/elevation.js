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
    // cc("data8:")
    // cc(data8)
    planes = [createGrid(fnPlane), createSlope(normalize(data8))]

    timer = setInterval(main, 0);
    // cc("elevations, SAMPLESIZE:");
    // cc(elevations, SAMPLESIZE);
    //end inject
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