var shapes;
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  shapes=[];
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  fill(255,0,255);
  rect(0,0,width/12,height);
  for(var i=shapes.length-1; i>=0; i--)
  {
    fill(shapes[i].r,shapes[i].g,shapes[i].b);
    ellipse(shapes[i].x,shapes[i].y,shapes[i].radius*2,shapes[i].radius*2);
    if(dist(shapes[i].x,shapes[i].y,mouseX,mouseY)<shapes[i].radius)
    {
      fill(255);
      textSize(25);
      text("x:"+shapes[i].x+" y:"+shapes[i].y,shapes[i].x,shapes[i].y);
    }
    shapes[i].x-=3;
    if(shapes[i].x+shapes[i].radius<width/12)
      shapes.splice(i,1);
  }
}
function mousePressed()
{
  var tempObject;
  var shouldCreate=true;
  for(var i=shapes.length-1; i>=0; i--)
  {
    if(dist(shapes[i].x,shapes[i].y,mouseX,mouseY)<shapes[i].radius)
    {
      shouldCreate=false;
      shapes.splice(i,1);
      break;
    }
  }
  if(shouldCreate)
  {
    tempObject={x:mouseX,y:mouseY,radius:random(20)+30,r:random(255),g:random(255),b:random(255)};
    shapes.push(tempObject);
  }
}