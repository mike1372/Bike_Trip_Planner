

google.maps.visualRefresh = true;

var rendererOptions = {
  draggable: true
};

var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var directionsresult;
var geocoderService = new google.maps.Geocoder();
var elevator;
var map;
var infowindow;
var waypoints = [];
var chart;
var infowindow = new google.maps.InfoWindow();
var polyline;
var mousemarker = null;
var elevations = [];
var elevation_status;
var distance;
var start;
var end;
var rightclicklatlng;
var gradient_orange;
var gradient_red;
var disone;
var distwo;
var disthree;
var disfour;
var gradeone;
var gradetwo;
var gradethree;
var gradefour;
var disabled;
var hideminmax;
var mode;
var address;
var inverse;
var system_mi;
var system_ft;
var str_mi;
var str_ft;
var chartleft;
var chartright;
var chartheight;
var chartwidth;
var charttop;
var fullsize;
var baden = new google.maps.LatLng(48.766324,8.227631);
var freudenstadt = new google.maps.LatLng(48.46539,8.436109);

google.load('visualization', '1', {packages: ['corechart']});

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: baden,
    mapTypeId: 'roadmap',
    backgroundColor: '#eee'
  }
  map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));
  elevator = new google.maps.ElevationService();
  chart = new google.visualization.AreaChart(document.getElementById('elevation_chart'));
  start = baden;
  end = freudenstadt;
  inverse = false;
  gradient_orange = 0.06;
  gradient_red = 0.10;
  disone = 6000;
  distwo = 4000;
  disthree = 2000;
  disfour = 1000;
  gradeone = 0.07;
  gradetwo = 0.07;
  gradethree = 0.06;
  gradefour = 0.05;
  disabled = false;
  hideminmax = false;
  system_mi = 1;
  system_ft = 1;
  str_mi = "km";
  str_ft = "m";
  chartheight = '80%';
  chartwidth = '100%';
  chartleft = 55;
  chartright = 20;
  charttop = 12;
  fullsize = false;

  var contentString = '<div id="rightclick">'+
  '<button id="rcbutton" name="" type="button" value="" onclick="setOrigin()">Set Origin</button><br><button id="rcbutton" name="" type="button" value="" onclick="setDestination()">Set Destination</button>' + '</div>';

  infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  document.getElementById("mode").options[0].selected = true;
  document.getElementById("system").options[0].selected = true;
  document.getElementById("orange").options[3].selected = true;
  document.getElementById("red").options[0].selected = true;
  document.getElementById("disone").options[1].selected = true;
  document.getElementById("distwo").options[2].selected = true;
  document.getElementById("disthree").options[1].selected = true;
  document.getElementById("disfour").options[1].selected = true;
  document.getElementById("gradeone").options[2].selected = true;
  document.getElementById("gradetwo").options[2].selected = true;
  document.getElementById("gradethree").options[1].selected = true;
  document.getElementById("gradefour").options[1].selected = true;
  document.getElementById("disone").disabled = false;
  document.getElementById("distwo").disabled = false;
  document.getElementById("disthree").disabled = false;
  document.getElementById("disfour").disabled = false;
  document.getElementById("gradeone").disabled = false;
  document.getElementById("gradetwo").disabled = false;
  document.getElementById("gradethree").disabled = false;
  document.getElementById("gradefour").disabled = false;
  document.getElementById("disableClimbs").checked = false;
  document.getElementById("hideminmax").checked = false;
  google.visualization.events.addListener(chart, 'onmouseover', barMouseOver);
  google.visualization.events.addListener(chart, 'onmouseout', barMouseOut);
  google.maps.event.addListener(map, "rightclick", function(event) {

  infowindow.setPosition(event.latLng);
  rightclicklatlng = event.latLng;

  infowindow.open(map);

  });
  google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {

    var route = directionsDisplay.getDirections().routes[0];
    start = route.legs[0].start_location;
    end = route.legs[0].end_location;
    saveWaypoints();

    if (mousemarker != null) {
      mousemarker.setMap(null);
      mousemarker = null;
    }
    drawPath(route.overview_path);
  });
  google.visualization.events.addListener(chart, 'onmouseover', function(e) {
    if (mousemarker == null) {
      mousemarker = new google.maps.Marker({
        position: elevations[e.row].location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"

      });
    }else {
      mousemarker.setPosition(elevations[e.row].location);
    }
  });onclick

  mode = "DRIVING";


  if(get_url_param('slat') == '') {
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var plus = Math.random() < 0.5 ? -1 : 1;
      var minus = Math.random() < 0.5 ? -1 : 1;
      var pos2 = new google.maps.LatLng(position.coords.latitude + Math.random() * plus * 0.17, position.coords.longitude + Math.random() * minus * 0.43);
      start = pos;
      end = pos2;
      calcRoute();
    });
  }
}
parameterUpdate();
 calcRoute();


setTimeout('donationInfo();',10000);

/*
var clientwidth = document.getElementById("infobox").clientWidth;
NotifierjsConfig.notificationStyles.margin = "0 " + clientwidth + "px 0 0";

Notifier.notify('Have you already tried all features of cycleroute.org? Lets take a quick look at the three other tabs!', 'Hello!', '', 7000);
setTimeout('climbsTab();',7000);
setTimeout('gpxTab();',22000);
 setTimeout('rightClickInfo();', 4000);

setTimeout('shareTab();',35000);
*/
}
function donationInfo() {
Notifier.notify('Maybe you want to support my application with a little donation. Since it is completely free, i hope to collect some money to cover my expenses. You can make your donation by clicking on the Donate-Button on the left. Feel free to contribute. Thank you!', 'You like cycleroute.org...?', '', 22000);
}
function rightClickInfo() {
Notifier.notify('You can use the right-click to set origin and destination which works very well together with the "Clear Map" function. ', 'Did you know that...?', '', 16000);
}
function climbsTab() {
document.getElementById("tabbertabs").tabber.tabShow(1);
Notifier.notify('Here you can define four Climb Categories (4 is the easiest, 1 the heaviest). As you define them, they will be displayed in the elevation-graph. Turn this function off by clicking the Hide-Checkbox. At the bottom you can define the grades which should be colored in the elevation-graph. (Left: Orange, Right: Red) ', 'Climbs', '', 15000);
}
function gpxTab() {
document.getElementById("tabbertabs").tabber.tabShow(2);
Notifier.notify('Here you can download .gpx-files of the current route for your GPS-device. Select "GPX-Track" to get a polyline to go after, or "GPX-Route" to get significant waypoints to navigate along the route.', 'GPX', '', 15000);
}

function shareTab() {
document.getElementById("tabbertabs").tabber.tabShow(3);
Notifier.notify('You can save your current route by clicking on "CreateURL", which will pass a unique URL to the browsers address bar, which can be saved e.g. as a bookmark. Below you can share the route with your friends on Facebook.', 'Did you know that...?', '', 20000);
}

function routeTab() {
document.getElementById("tabbertabs").tabber.tabShow(0);
}

function calcRoute() {

  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode[mode],
    waypoints: waypoints,
    avoidHighways: true,

  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {

      directionsDisplay.setDirections(response);
    }
  }

  );

}


function drawPath(path) {



  var pathRequest = {
    'path': path,
    'samples': 512
  }

  // Initiate the path request.
  elevator.getElevationAlongPath(pathRequest, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(results, status) {
  if (status != google.maps.ElevationStatus.OK) {
    return;
  }
  elevations = results;
  elevation_status = status;

  // Extract the elevation samples from the returned results
  // and store them in an array of LatLngs.
  var elevationPath = [];
  for (var i = 0; i < results.length; i++) {
    elevationPath.push(elevations[i].location);
  }

  var new_distance = directionsDisplay.getDirections().routes[0].legs[0].distance.value;

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  distance = 0;
  var distances = [];
  var altitudes = [];
  var differenceup = 0;
  var differencedown = 0;
  var cat_one = [];
  var cat_two = [];
  var cat_three = [];
  var cat_four = [];
  var max = 0;
  var min = 10000;
  var maxindex = 0;
  var minindex = 0;
  var temp_distance;
  var temp_elevation;
  var tempup = 0;
  var tempdown = 0;
  var gradient = 0;
  var count = 0;
  var gradientred = [];
  var gradientorange = [];
  var lastcolor;
  var gradients = [];
  var anno = '';
  var poly_distance = 0;


  data.addColumn('string', '');
  data.addColumn('number', 'Elevation');
  data.addColumn({'type': 'string', 'role': 'tooltip'});
  data.addColumn({type:'string', role:'annotation'});
  data.addColumn('number', 'Gradient');
  data.addColumn({'type': 'string', 'role': 'tooltip'});
  data.addColumn({type:'string', role:'annotation'});
  data.addColumn('number', 'Gradient');
  data.addColumn({'type': 'string', 'role': 'tooltip'});
  data.addColumn({type:'string', role:'annotation'});


  for (var i = 0; i < results.length; i++) {
    altitudes[i] = elevations[i].elevation;
    if (elevations[i].elevation < min){ min = elevations[i].elevation; minindex = i;}
    if (elevations[i].elevation > max) {max = elevations[i].elevation; maxindex = i;}
    if ( i < results.length - 1){
      distances[i] = google.maps.geometry.spherical.computeDistanceBetween (elevations[i].location, elevations[i+1].location);
      distance = distance + distances[i];
      gradients[i] = (elevations[i+1].elevation - elevations[i].elevation) / distances[i];

      if (distance > 100) {
        gradient = (elevations[i+1].elevation - elevations[i - count].elevation) / distance;
        if (gradient > gradient_red) {
          for(var x = i-count; x <= i + 1; x++) {
            gradientred[x] = true;
            gradientorange[x] = false;

          }

        }
        if (gradient > gradient_orange) {
          for(var x = i-count; x <= i + 1; x++) {
            gradientorange[x] = true;
          }
        }

        distance = distance - distances[i-count];
        count--;
      }
      count++;
      poly_distance = poly_distance + distances[i];
    }

  }
  var distance_ratio = new_distance / poly_distance;
  var distance_temp = 0;
  distance = 0;
  gradient = 0;
  lastcolor = "blue";
  temp_gradient = gradients[0];
  var temptops = findtemptops(gradients);
  cat_one = findtops(temptops, gradients, distances, altitudes, disone, disone * 1.5, gradeone);
  cat_two = findtops(temptops, gradients, distances, altitudes, distwo, disone, gradetwo);
  cat_three = findtops(temptops, gradients, distances, altitudes, disthree, distwo, gradethree);
  cat_four = findtops(temptops, gradients, distances, altitudes, disfour, disthree, gradefour);
  clearcats(cat_one, disone, cat_two, distwo, cat_three, disthree, cat_four, disfour, distances);



  for (var i = 0; i < results.length; i++) {
    temp_distance = rounder(distance/1000);
    temp_elevation = rounder(elevations[i].elevation * system_ft);
    if (i > 0){
      temp_gradient = rounder((gradients[i] + gradients[i-1]) * 50);
    }
    anno = '';
    if(i == minindex && !hideminmax) {
      anno = 'MIN';
    }
    if(i == maxindex && !hideminmax) {
      anno = 'MAX';
    }
    if(cat_one[i]){
      anno = '1';
    }
    else if(cat_two[i]){
      anno = '2';
    }
    else if(cat_three[i]){
      anno = '3';
    }
    else if(cat_four[i]){
      anno = '4';
    }

    if (i < results.length -2 ){

      if(gradientorange[i] && gradientorange[i+2]) {
        gradientorange[i+1] = true;

      }
      if(!gradientorange[i] && !gradientorange[i+2]) {
        gradientorange[i+1] = false;

      }
      if(gradientred[i] && gradientred[i+2]) {
        gradientred[i+1] = true;
      }

    }


    if (gradientred[i]){

      if (lastcolor == "orange"){
        data.addRow(['' + Math.round(distance/1000), ,tooltip(temp_distance, temp_elevation, temp_gradient), anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient),  anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      else if (lastcolor == "blue"){
        data.addRow(['' + Math.round(distance/1000),temp_elevation,tooltip(temp_distance, temp_elevation, temp_gradient),  anno, , tooltip(temp_distance, temp_elevation, temp_gradient), anno,temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      else {
        data.addRow(['' + Math.round(distance/1000), ,tooltip(temp_distance, temp_elevation, temp_gradient),  anno, , tooltip(temp_distance, temp_elevation, temp_gradient),  anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      lastcolor = "red";
    }
    else if (gradientorange[i]){

      if (lastcolor == "orange"){
        data.addRow(['' + Math.round(distance/1000), , tooltip(temp_distance, temp_elevation, temp_gradient), anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno, , tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      else if (lastcolor == "blue"){
        data.addRow(['' + Math.round(distance/1000),temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno, temp_elevation , tooltip(temp_distance, temp_elevation, temp_gradient),  anno, , tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      else if (lastcolor = "red") {
        data.addRow(['' + Math.round(distance/1000), , tooltip(temp_distance, temp_elevation, temp_gradient),  anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      lastcolor = "orange";
    }
    else{
      if (lastcolor == "orange"){
        data.addRow(['' + Math.round(distance/1000), temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient),  anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno, , tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      else if (lastcolor == "blue"){
        data.addRow(['' + Math.round(distance/1000),temp_elevation , tooltip(temp_distance, temp_elevation, temp_gradient), anno, , tooltip(temp_distance, temp_elevation, temp_gradient),  anno, , tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      else {
        data.addRow(['' + Math.round(distance/1000), temp_elevation , tooltip(temp_distance, temp_elevation, temp_gradient), anno, , tooltip(temp_distance, temp_elevation, temp_gradient), anno, temp_elevation, tooltip(temp_distance, temp_elevation, temp_gradient), anno]);
      }
      lastcolor = "blue";
    }



    if ( i < results.length - 1){
      distance_temp = distance_temp + distances[i];
      distance = distance_temp * distance_ratio * system_mi;
      if (elevations[i].elevation > elevations[i+1].elevation) {
        differencedown = differencedown + elevations[i].elevation - elevations[i+1].elevation;
      }
      else{
        differenceup = differenceup + elevations[i+1].elevation - elevations[i].elevation;
      }

    }
  }

  new_distance = rounder(new_distance * system_mi /1000);
  differenceup = rounder(differenceup * system_ft);
  differencedown = rounder(differencedown * system_ft);
  max = rounder(max * system_ft);
  min = rounder(min * system_ft);
  document.getElementById("distance").innerHTML=new_distance + " " + str_mi;
  document.getElementById("differenceup").innerHTML=differenceup + " " + str_ft;
  document.getElementById("differencedown").innerHTML=differencedown + " " + str_ft;
  document.getElementById("max").innerHTML=max + " " + str_ft;
  document.getElementById("min").innerHTML=min + " " + str_ft;


  // Draw the chart using the data within its DIV.
  document.getElementById('elevation_chart').style.display = 'block';
  chart.draw(data, {
    vAxis: {title: 'Elevation (' + str_ft + ')'},
    hAxis: {title: 'Distance (' + str_mi + ')', showTextEvery: 20, maxAlternation: 100, slantedText: 'false'},
    legend: {position:'none'},
    backgroundColor: '#f2f2f2',
    animation: {duration: 2000, easing: 'linear'},
    bar: {groupWidth: '100%'},
    chartArea:{left:chartleft, right:chartright, top:charttop, width:chartwidth, height:chartheight},
    axisTitlesPosition: "in",
    isHtml: true,
    lineWidth: 3,
    areaOpacity: 0.4,
    colors: ['#295DBC', '#F29D00', '#ED0300'],

  });

}



function findtemptops(gradients) {

  var count = 0;
  var temp = false;
  var temptops = [];

  for(var i = 0; i < gradients.length; i++) {
    if(gradients[i] > 0) {
      count = 0;
      temp = true;
    }
    else if (temp){
      count++;
      temptops[i] = true;
      temp = false;
      count = 0;
    }
  }
  temptops[gradients.length - 1] = true;
  return temptops;
}

function findtops(temptops, gradients, distances, altitudes, length, length_stop, avggrade) {

  var intervall_start = 0;
  var tempdistance = 0;
  var tempgradient = 0;
  var tops = [];
  for(var i = 0; i < distances.length; i++) {
    if(temptops[i]) {
      tempdistance = 0;
      tempgradient = 0;
      for(var z = i - 1; z >= 0; z--) {
        tempdistance = tempdistance + distances[z];
        if(tempdistance > length && tempdistance < length_stop) {
          tempgradient = (altitudes[i] - altitudes[z]) / tempdistance;
          if(tempgradient > avggrade) {

            intervall_start = z;

            tops[i] = true;
          }
        }

      }
      if(tops[i]){
        for(var x = intervall_start; x < i; x++) {
          if(altitudes[x] > altitudes[i] && temptops[x]) {
            tops[i] = false;
          }
          if(altitudes[x] < altitudes[i] && temptops[x]) {
            tops[x] = false;
          }
        }
      }

    }

  }

  return tops;
}

function clearcats(one, disone, two, distwo, three, disthree, four, disfour, distances) {
  var z;
  var tempdistance;
  for(var i = 0; i < distances.length; i++) {
    if(one[i]) {
      z = i - 1;
      tempdistance = 0;
      while(tempdistance <= disone * 1.5) {
        tempdistance = tempdistance + distances[z];
        two[z] = false;
        three[z] = false;
        four[z] = false;
        z--;
      }
    }
    if(two[i]) {
      z = i - 1;
      tempdistance = 0;
      while(tempdistance <= disone) {
        if(one[z]) {
          two[i] = false;
        }
        tempdistance = tempdistance + distances[z];
        three[z] = false;
        four[z] = false;
        z--;
      }
    }
    if(three[i]) {
      z = i - 1;
      tempdistance = 0;
      while(tempdistance <= distwo) {
        if(one[z] || two[z]) {
          three[i] = false;
        }
        tempdistance = tempdistance + distances[z];
        four[z] = false;
        z--;
      }
    }
    if(four[i]) {
      z = i - 1;
      tempdistance = 0;
      while(tempdistance <= disthree) {
        if(one[z] || two[z] || three[z]) {
          four[i] = false;
        }
        tempdistance = tempdistance + distances[z];
        z--;
      }
    }
    if(disone == 0){
      one[i] = false;
      two[i] = false;
      three[i] = false;
      four[i] = false;
    }

  }
}
function disableClimbs(){
  var elone = document.getElementById("disone");
  var eltwo = document.getElementById("distwo");
  var elthree = document.getElementById("disthree");
  var elfour = document.getElementById("disfour");
  var eleone = document.getElementById("gradeone");
  var eletwo = document.getElementById("gradetwo");
  var elethree = document.getElementById("gradethree");
  var elefour = document.getElementById("gradefour");
  elone.disabled = !elone.disabled;
  eltwo.disabled = !eltwo.disabled;
  elthree.disabled = !elthree.disabled;
  elfour.disabled = !elfour.disabled;
  eleone.disabled = !eleone.disabled;
  eletwo.disabled = !eletwo.disabled;
  elethree.disabled = !elethree.disabled;
  elefour.disabled = !elefour.disabled;
  disabled = !disabled;
  if(disabled){
    disone = 0;
  }
  else{
    disone = document.getElementById("disone").value;
  }
  plotElevation(elevations, elevation_status);


}
function updateClimbs(){
  disone = document.getElementById("disone").value;
  distwo = document.getElementById("distwo").value;
  disthree = document.getElementById("disthree").value;
  disfour = document.getElementById("disfour").value;
  gradeone = document.getElementById("gradeone").value;
  gradetwo = document.getElementById("gradetwo").value;
  gradethree = document.getElementById("gradethree").value;
  gradefour = document.getElementById("gradefour").value;
  plotElevation(elevations, elevation_status);

}
function hideMinMax() {

  hideminmax = !hideminmax;
  plotElevation(elevations, elevation_status);
}
function updateGradient(){
  gradient_orange = document.getElementById("orange").value;
  gradient_red = document.getElementById("red").value;
  plotElevation(elevations, elevation_status);
}

function updateGradient2(){
  gradient_orange = document.getElementById("orangefull").value;
  gradient_red = document.getElementById("redfull").value;
  plotElevation(elevations, elevation_status);
}

function changeTravelMode(){
  mode = document.getElementById("mode").value;
  saveWaypoints();
  calcRoute();
}

function changeSystem() {
  if(document.getElementById("system").value == "METRIC") {
    system_mi = 1;
    system_ft = 1;
    str_mi = "km";
    str_ft = "m";
    for(var i = 5; i < 11; i++) {
      document.getElementById("disone")[i - 5].text = "> "+ i + "km";
      document.getElementById("disone")[i - 5].value = i * 1000;
    }
    for(var i = 2; i < 8; i++) {
      document.getElementById("distwo")[i - 2].text = "> "+ i + "km";
      document.getElementById("distwo")[i - 2].value = i * 1000;
    }
    for(var i = 1; i < 7; i++) {
      document.getElementById("disthree")[i - 1].text = "> "+ i + "km";
      document.getElementById("disthree")[i - 1].value = i * 1000;
    }
    document.getElementById("disfour")[0].text = "> "+ "500m";
    document.getElementById("disfour")[0].value = 500;
    for(var i = 1; i < 6; i++) {
      document.getElementById("disfour")[i].text = "> "+ i + "km";
      document.getElementById("disfour")[i].value = i * 1000;
    }
    document.getElementById("disone").options[1].selected = true;
    document.getElementById("distwo").options[2].selected = true;
    document.getElementById("disthree").options[1].selected = true;
    document.getElementById("disfour").options[1].selected = true;
  }
  else {
    system_mi = 1 / 1.609344;
    system_ft = 1 / 0.3048;
    str_mi = "mi";
    str_ft = "ft";
    for(var i = 3; i < 9; i++) {
      document.getElementById("disone")[i - 3].text = "> "+ i + "mi";
      document.getElementById("disone")[i - 3].value = i * 1000 * 1.609344;
    }
    for(var i = 2; i < 8; i++) {
      document.getElementById("distwo")[i - 2].text = "> "+ i + "mi";
      document.getElementById("distwo")[i - 2].value = i * 1000 * 1.609344;
    }
    document.getElementById("disthree")[0].text = "> "+ "0.5mi";
    document.getElementById("disthree")[0].value = 0.5 * 1000 * 1.609344;
    for(var i = 1; i < 6; i++) {
      document.getElementById("disthree")[i].text = "> "+ i + "mi";
      document.getElementById("disthree")[i].value = i * 1000 * 1.609344;
    }
    document.getElementById("disfour")[0].text = "> "+ "0.25mi";
    document.getElementById("disfour")[0].value = 0.25 * 1000 * 1.609344;
    document.getElementById("disfour")[1].text = "> "+ "0.5mi";
    document.getElementById("disfour")[1].value = 0.5 * 1000 * 1.609344;
    for(var i = 1; i < 5; i++) {
      document.getElementById("disfour")[i + 1].text = "> "+ i + "mi";
      document.getElementById("disfour")[i + 1].value = i * 1000 * 1.609344;
    }
    document.getElementById("disone")[1].selected = true;
    document.getElementById("distwo")[0].selected = true;
    document.getElementById("disthree")[1].selected = true;
    document.getElementById("disfour")[1].selected = true;
  }



  plotElevation(elevations, elevation_status);

}

function changeChart() {
  if(!fullsize) {
    fullsize = true;
    document.getElementById("elevation_chart").style.height = '100%';
    document.getElementById("elevation_chart").style.bottom = '0';
    document.getElementById("facebook").style.display = 'none';
    document.getElementById("donate").style.display = 'none';
    document.getElementById("infobox").style.display = 'none';
    document.getElementById("google-map").style.display = 'none';
    document.getElementById("changechart").style.top = '5px';
    document.getElementById("changechart").style.transform = 'rotate(180deg)';
    document.getElementById("changechart").style.WebkitTransform = 'rotate(180deg)';
    document.getElementById("changechart").style.MozTransform = 'rotate(180deg)';
    document.getElementById("changechart").style.OTransform = 'rotate(180deg)';
    document.getElementById("changechart").style.MsTransform = 'rotate(180deg)';


    chartheight = '86%';
    chartwidth = '95%';
    chartleft = 55;
    chartright = 20;
    charttop = '7%';
  }
  else{
    fullsize = false;
    document.getElementById("elevation_chart").style.height = '35%';
    document.getElementById("elevation_chart").style.bottom = '0';
    document.getElementById("facebook").style.display = 'block';
    document.getElementById("donate").style.display = 'block';
    document.getElementById("infobox").style.display = 'block';
    document.getElementById("google-map").style.display = 'block';
    document.getElementById("changechart").style.top = '-27px';
    document.getElementById("changechart").style.transform = '';
    document.getElementById("changechart").style.WebkitTransform = '';
    document.getElementById("changechart").style.OTransform = '';
    document.getElementById("changechart").style.MozTransform = '';
    document.getElementById("changechart").style.MsTransform = '';
    chartheight = '80%';
    chartwidth = '100%';
    chartleft = 55;
    chartright = 20;
    charttop = 12;
  }
  plotElevation(elevations, elevation_status);




}
function setOrigin() {

  if(start == null && end!= null) {
    directionsDisplay.setMap(map);
  }
  else if(end != null && start != null){
    saveWaypoints();
  }
  start = rightclicklatlng;
  calcRoute();
  infowindow.close();
}
function setDestination() {

  if(end == null && start!= null) {
    directionsDisplay.setMap(map);
  }
  else if(end != null && start != null){
    saveWaypoints();
  }
  end = rightclicklatlng;
  calcRoute();
  infowindow.close();
}
function invertRoute(){

  saveWaypoints();
  waypoints.reverse();
  temp = start;
  start = end;
  end = temp;
  calcRoute();


}
function saveWaypoints() {
  directionsresult = directionsDisplay.getDirections();
  waypoints = [];
  var route = directionsresult.routes[0];
  var viawaypoints = route.legs[0].via_waypoints;
  for( var i = 0; i < viawaypoints.length; i++) {
    waypoints.push({
      location: viawaypoints[i],
      stopover:false
    });
  }
}
function tooltip(temp_distance, temp_elevation, temp_gradient) {
  return 'Distance: ' + temp_distance + ' ' + str_mi + '\nElevation: ' + temp_elevation + ' ' + str_ft;
}

function barMouseOver(e) {
  chart.setSelection([e]);
}

function barMouseOut(e) {
  chart.setSelection([{'row': null, 'column': null}]);
}

function rounder(number){

  return Math.round(number * 100) / 100;
}

function reset() {
  waypoints=[];
  document.getElementById("distance").innerHTML=0;
  document.getElementById("differenceup").innerHTML=0;
  document.getElementById("differencedown").innerHTML=0;
  document.getElementById("max").innerHTML=0;
  document.getElementById("min").innerHTML=0;
  end = null;
  start = null;
  if(mousemarker != null) {
    mousemarker.setMap(null);
    mousemarker = null;
  }
  document.getElementById('elevation_chart').style.display = 'none';
  directionsDisplay.setMap(null);
  directionsDisplay.setDirections(null);
  waypoints=[];
}


function addressKeyHandler(e) {
  var keycode;
  if (window.event) {
    keycode = window.event.keyCode;
  } else if (e) {
    keycode = e.which;
  } else {
    return true;
  }

  if (keycode == 13) {
    addAddress();
    return false;
  } else {
    return true;
  }
}
function addAddress() {

  address = document.getElementById('address').value;
  geocoderService.geocode({ 'address': address }, function(results, status) {
    document.getElementById('address').value = "";
    if (status == google.maps.GeocoderStatus.OK) {
      start = results[0].geometry.location;
    } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
      alert("Address A not found");

    } else {
      alert("Address A lookup failed");


    }
  })



  address = document.getElementById('desti').value;

  geocoderService.geocode({ 'address': address }, function(results, status) {
    document.getElementById('desti').value = "";

    if (status == google.maps.GeocoderStatus.OK) {
      end = results[0].geometry.location;
      directionsDisplay.setMap(map);
      waypoints = [];
      calcRoute();

    } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
      alert("Address B not found");
    } else {
      alert("Address B lookup failed");
    }
  })

}


google.maps.event.addDomListener(window, 'load', initialize);
