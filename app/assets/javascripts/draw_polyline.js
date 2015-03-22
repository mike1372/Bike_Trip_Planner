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

var removePolylines = function() {
    for (var i = 0; i < mapPaths.length; i++) {
        mapPaths[i].setMap(null);
    }
    mapPaths = [];
}