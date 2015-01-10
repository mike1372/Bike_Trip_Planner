// CANVAS------------------------------------------------------------

function cc(a){console.log(a)}
function $id(idTAG){return document.getElementById(idTAG)}
// $id( "zoomIN").onclick=




var X=0,Y=1,Z=2


// data as [ [ x, x1, x2, ... ], [y, y1, y2, ... ], ... ]


//SAMPLESIZE
function gMaps3array(elevations,dx){ // [ [x,...], [y,..], ... ]
  var xx=[], yy=[], zz=[], el, X=0,Y=1,Z=2
  for (var i = 0, el; i < elevations.length; i++) {
      el=elevations[i]
      xx.push( el.location.lng() )
      yy.push( el.location.lat() )
      zz.push( el.elevation      )
  };

  // var routes = this.directions.routes;
  // distance = routes[0].legs[0].distance;
  // var SAMPLESIZE = 300
  // var dx = distance.value / SAMPLESIZE
  // var dx =  108.6 //for SAMPLESIZE = 10
  // var dx = 54.3  //for SAMPLESIZE = 20
  // var dx = 3.62 //for SAMPLESIZE = 300
  // var dx = 54.3
cc("SAMPLESIZE:");cc(SAMPLESIZE)
cc("dx:");cc(dx)

  var slopes=[0]
  for (var i = 1; i < elevations.length; i++) {
    var dy = zz[i] - zz[i-1]
    slopes.push(dy / dx * 100)
  };
  return [xx, yy, zz, slopes]
};

function toRange(min, max, min1, max1, x) {
  var range0 = max - min
  var range1 = max1 - min1
  return range1 / range0 * (x - min) + min1
}

function maxx(arr, ismax, col) {
  mx = Math[ismax].apply(Math, arr.map(function(v) {
    return v[col];
  }))
  return mx
}
function range(array) {
  return max(array) - min(array)
}

function min(array) {
  return Math.min.apply(Math, array)
}

function max(array) {
  return Math.max.apply(Math, array);
}


function normalize(data8) {

    var X2, Y2, Z2, X=0,Y=1,Z=2, COLORS, SLOPE=3
    var range0  = max([range(data8[X]), range(data8[Y])]);//keep aspect ratio
    var rangeEl = range(data8[Z])
    var rangeSl = range(data8[SLOPE])
    var min1    = -10// screen coordinates, will be multiplied by 10 to be in range -100,100px
    var minX    = min(data8[X])
    var minY    = min(data8[Y])
    var minZ    = min(data8[Z])
    var minEl   = min(data8[SLOPE])
    var r=100,g=100,b=100
    var dt = 0
    X2 = data8[X].map( function(x){ return 20/range0*(x-minX)+min1} )
    Y2 = data8[Y].map( function(x){ return 20/range0*(x-minY)+min1} )
    Z2 = data8[Z].map( function(x){ return 10/rangeEl*(x-minZ)+0} )
    COLORS = data8[SLOPE].map( function(x){
    r=rnd(255/rangeSl*(x-minEl)+0);
    g=(r>150)?0:50;
    b=(r>120)?50:100;
    return "rgb("+r+","+g+","+b+")"
    } )//rgb
  return [X2, Y2, Z2, COLORS]
}

// function data2range(array, range) {
//   var min = Math.min.apply(Math, array);
//   var max = Math.max.apply(Math, array);
//   var min1 = range[0]
//   var max1 = range[1]
//   return array.map(function(x) {
//     return toRange(min, max, min1, max1, x)
//   })
// }
// d8 = data8.map( function(x){ return data2range(x, [-10,10]) })
// data9.each( function(){ } )


//-------------
var b   = document.body,
    c   = document.getElementById("c");
// c.width = innerWidth*.4;
// c.height= innerHeight*0.7;
var t   = c.getContext("2d"),

    f   = 200,
    mX  = 0,
    mY  = 0,
    π   = Math.PI,
    τ   = 2*π,
    sqrt= Math.sqrt,
    cos = Math.cos,
    sin = Math.sin,
    rnd = Math.round,
    centerX = c.width / 2,
    centerY = c.height / 2,
    totalθ=0,
    totalφ=0,
    targetAngleUP=π*7/6,
    targetAngle=0,
    zoom= 0.5,
    zoomTarget= 1.6,
    previous,
    timer=0;
function toggleTimer(){if(timer===0){timer = setInterval(main,0)}}
$id( "right") .onclick = function(){targetAngle += π/4;toggleTimer()}
$id( "left")  .onclick = function(){targetAngle -= π/4;toggleTimer()}
$id( "up")    .onclick = function(){targetAngleUP += π/6;toggleTimer()}
$id( "down")  .onclick = function(){targetAngleUP -= π/6;toggleTimer()}
$id( "zoomIN").onclick = function(){zoomTarget *= 1.3;toggleTimer()}
$id( "zoomOUT").onclick = function(){zoomTarget /= 1.3;toggleTimer()}
// $id( "menuButton").onclick = function(){
//   //var butn=document.getElementById("slopeMap")
// // butn.classList.toggle('large');// >IE9
// // butn.classList.toggle('medium');// >IE9

// document.getElementById("c").classList.toggle('large');// >IE9
// document.getElementById("c").classList.toggle('medium');// >IE9

// }

c.onmousewheel =    function (e) {// chrome only
  // if(!loop)return null
  if        (e.wheelDelta > 0)  zoom *= 1.1
  else if   (e.wheelDelta < 0)  zoom /= 1.1
  if(zoom>maxzoom)zoom=maxzoom
  if(zoom<minzoom)zoom=minzoom}

c.onmousemove = function(e){
  mX = e.clientX;
  mY = e.clientY;
}
c.addEventListener("click", function(event){
  cordinate_x = event.offsetX;
  cordinate_y = event.offsetY;
  console.log( "x,y: ( "+event.offsetX +", "+event.offsetY+" )" )
});

function fnPlane(x,y){
  return  0
}

function fn(x,y){
  var abs = sqrt( x*x + y*y )||1;
  return  π*sin(abs)/abs
}

function createGrid(fn){
  var p = [], rowlength=0, gridx=10, gridy=10, detail=1;
  for(var x = -gridx; x < gridx; x+=detail)
  for(var y = -gridy; y < gridy; y+=detail){
    if( x=== -gridx )rowlength++
    p.push({
      x: x*10,
      y: y*10,
      z: 20*fn(x,y)       })
  }
  p.rowlength=rowlength
  return p
};

function createSlope(arr){
  var p = [], rowlength=arr[0].length;
  for(var i = 0; i < rowlength; i++ ){
    p.push({ x: arr[X][i]*10, y: arr[Y][i]*10, z: arr[Z][i]*10, color:arr[3][i]})
  }

  for(var i = 0; i < rowlength; i++ ){
    p.push({ x: arr[X][i]*10, y: arr[Y][i]*10, z: 0})
  }
  p.rowlength=rowlength
  return p
};

function rotate(plane) {
  var
    θ = π / 4 / 270, //0.002;
    φ = π / 6 / 70,
     zoomINCR = 0.004,
    err = 0.0001
  if ((totalθ < (targetAngle + err)) &&
      (totalθ > (targetAngle - err)) &&
      (totalφ < (targetAngleUP + err)) &&
      (totalφ > (targetAngleUP - err)) &&
      (zoom < (zoomTarget + 0.1)) &&
      (zoom > (zoomTarget - 0.1))
  ) {
    cc("-===")
      // cc("totalφ")
      // cc("totalφ")
    if (timer) {
      clearInterval(timer);
      timer = 0
    }
  }
  if (zoom < zoomTarget) zoom += zoomINCR
  if (zoom > zoomTarget) zoom -= zoomINCR

  if (totalθ < targetAngle) totalθ += θ
  if (totalθ > targetAngle) totalθ -= θ

  if (totalφ < targetAngleUP) totalφ += φ
  if (totalφ > targetAngleUP) totalφ -= φ
    // totalφ+=φ
  θ = totalθ
  φ = totalφ //=π/4
  var
    cosθ = cos(θ),
    sinθ = sin(θ),
    cosφ = cos(φ),
    sinφ = sin(φ),
    pnt, Scale, x1, y1, z1, x, y, z;
  for (var i = plane.length; i--;) {
    pnt = plane[i];
    x = pnt.x;
    y = pnt.y;
    z = pnt.z;

    // x1     = x  * cosθ -  z * sinθ;//rotate XZ, about Y
    // z1     = x  * sinθ +  z * cosθ;
    x1 = x * cosθ - y * sinθ; //rotate XY, about Z
    y1 = x * sinθ + y * cosθ;
    x = x1
    y = y1
    y = y1
    z1 = z * cosφ - y * sinφ; //rotate YZ, about X
    y1 = z * sinφ + y * cosφ;

    Scale = f / (f + z1) * zoom;

    pnt._x = centerX + x1 * Scale;
    pnt._y = centerY + y1 * Scale;
  }

}

function draw(p) {
  t.strokeStyle = "rgb(20,50,20)";
  t.beginPath();
  var rowlength=p.rowlength
  t.moveTo(p[0]._x, p[0]._y);
  var l = rowlength;
  for (var i = 1; i < p.length-rowlength; i++)
    if (i % rowlength) {
      var beneath = i+rowlength;
if(p[i].color){
      t.beginPath();
      t.moveTo(p[i]._x, p[i]._y);
    }
      t.lineTo(p[i]._x,         p[i]._y);
      t.lineTo(p[beneath]._x,   p[beneath]._y);
      t.lineTo(p[beneath-1]._x, p[beneath-1]._y);
      t.lineTo(p[i-1]._x,       p[i-1]._y);
      t.moveTo(p[i]._x,         p[i]._y);
      if(p[i].color){
        t.fillStyle = p[i].color;
        t.fill();
      }
  // t.fillText(i, p[i]._x, p[i]._y)

    }
    else t.moveTo(p[i]._x, p[i]._y);


  t.stroke()
  var now = Date.now();
  dt = now - (previous||0)

  // t.fillText("draw time: "+dt, 100, 100)
  // t.fillText("angle θ: "+(totalθ/π), 100, 120)
  // t.fillText(targetAngle, 100, 140)
  previous = now
}

function drawCircle(x,y,color,radius,txt){
    var oldColor=t.fillStyle
  t.beginPath();
  t.arc(x, y, radius, 0, 2 * Math.PI, false);
  t.fillStyle = color;
  t.fill();
  t.fillStyle = "white";
  t.fillText(txt, x-radius/3, y+radius/3)
  t.fillStyle = oldColor;

}

function drawLine(x1,y1,x2,y2,color){
  var oldColor=t.strokeStyle
  t.beginPath();
  t.moveTo(x1,y1);
  t.lineTo(x2,y2);
  t.strokeStyle = color;
  t.stroke();
  t.strokeStyle = oldColor;
}

function main(){
  t.clearRect(0, 0, c.width, c.height);
  planes.forEach( rotate )
  planes.forEach( draw )
  var p = planes[1]
  drawCircle(p[0]._x,p[0]._y,"green",10,"A")
  drawCircle(p[p.rowlength-1]._x,p[p.rowlength-1]._y,"red",10,"B")
}








