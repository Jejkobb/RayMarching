var boxes = []
var circles = []
var source;
var iterations;

function setup() {
  // put setup code here
  createCanvas(800, 550);
  boxes.push(new Box(400, 250, 100, 100, "#111"));
  boxes.push(new Box(600, 150, 50, 100, "#111"));
  boxes.push(new Box(150, 400, 300, 100, "#111"));
  circles.push(new Circle(200, 200, 40, "#111"));
  circles.push(new Circle(500, 500, 40, "#111"));
  source = {x:700, y:500};
}

function distance(p){
  return Math.sqrt(p.x*p.x + p.y*p.y);
}

function signedDstToCircle(p, centre, radius) {
  return distance({x:(centre.x-p.x), y:(centre.y-p.y)})-radius;
}

function signedDstToRect(rect, p) {
  var dx = Math.max(rect.min.x - p.x, 0, p.x - rect.max.x);
  var dy = Math.max(rect.min.y - p.y, 0, p.y - rect.max.y);
  return Math.sqrt(dx*dx + dy*dy);
}

function drawCircleAtPos(p, r){
  stroke(255);
  fill(220, 220, 220, 10);
  ellipse(p.x, p.y, r);
  fill(255);
  ellipse(p.x, p.y, 5);
}

function drawShapes(){
  for(var i = 0; i < boxes.length; i++){
    boxes[i].show();
  }
  for(var i = 0; i < circles.length; i++){
    circles[i].show();
  }
}

function shortestDistToPoint(p){
  var result = Infinity;
  for(var i = 0; i < boxes.length; i++){
    var d = signedDstToRect({max:boxes[i].max, min:boxes[i].min}, p);
    result = d < result ? d : result;
  }
  for(var i = 0; i < circles.length; i++){
    var d = signedDstToCircle(p, {x:circles[i].x, y:circles[i].y}, circles[i].r);
    result = d < result ? d : result;
  }
  return result;
}

function getDirection(p1, p2){
  var r = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  var v = {x:Math.cos(r), y:Math.sin(r)};
  return v;
}

function drawLineInDirection(p1, v, l){
  stroke(255);
  line(p1.x, p1.y, p1.x+v.x*l, p1.y+v.y*l);
}

function mouseClicked() {
  source = {x:mouseX, y:mouseY};
}

function getAngleFromVector(v){
    var angle = Math.atan2(v.y, v.x);   //radians
    // you need to devide by PI, and MULTIPLY by 180:
    var degrees = 180*angle/Math.PI;  //degrees
    return (360+Math.round(degrees))%360; //round number, avoid decimal fragments
}

function getVectorFromAngle(angle){
  var v = p5.Vector.fromAngle(radians(angle), 1);
  return {x:v.x, y:v.y};
}

function draw() {
  // put drawing code here
  background(40);
  drawShapes();
  var direction = getDirection(source, {x:mouseX, y:mouseY});
  //drawLineInDirection(source, {x:mouseX, y:mouseY}, direction, 100);
  var curPos = source;

  var example = true;
  if(example){
    iterations = 100;
    for(var i = 0; i < iterations; i++){
      radius = shortestDistToPoint(curPos);
      drawLineInDirection(curPos, direction, radius);
      if(radius>0){
        drawCircleAtPos({x:curPos.x, y:curPos.y}, radius*2);
      }
      curPos = {
        x:curPos.x+direction.x*radius,
        y:curPos.y+direction.y*radius
      };
      if(curPos.x < 0 || curPos.x > width || curPos.y < 0 || curPos.y > height){
        radius = 1000;
        break;
      }
    }
  }else{
    source = {x:mouseX, y:mouseY};
    iterations = 100;
    var direction;
    var radius;
    for(var a = 0; a < 360; a+=0.5){
      curPos = source;
      direction = getVectorFromAngle(a);
      radius = 0;
      for(var i = 0; i < iterations; i++){
        radius = shortestDistToPoint(curPos);
        curPos = {
          x:curPos.x+direction.x*radius,
          y:curPos.y+direction.y*radius
        };
        if(radius==0){
          radius = distance({x:source.x-curPos.x, y:source.y-curPos.y});
          break;
        }
        if(curPos.x < 0 || curPos.x > width || curPos.y < 0 || curPos.y > height){
          radius = 1000;
          break;
        }else if(i == iterations-1){
          radius = distance({x:source.x-curPos.x, y:source.y-curPos.y});
          break;
        }
      }
      drawLineInDirection(source, direction, radius);
    }
  }
}
