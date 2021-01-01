var icons, numIcons;
var table;
var questions, cur;
var player;
var end;
var song;
var ceiling;

function preload()
{
  numIcons=4;
  icons=[];
  for (var i=1; i<=numIcons; i++)
    icons.push(loadImage("data/"+i+".png"));
  table=loadTable("data/euro.csv", "csv", "header");
  song=loadSound("data/max.mp3");
}
function setup() { 
  questions=[];
  createCanvas(windowWidth, windowHeight);
  for (var r=0; r<table.getRowCount(); r++)
  {
    questions.push(new Question(r));
  }
  for (var i=0; i<numIcons; i++)
  {
    icons[i].resize(width/10, width/10);
  }
  cur=0;
player={money:15, people:15, clergy:15, army:15};
textAlign(CENTER, CENTER);
imageMode(CENTER);
textSize(width/20);
end=false;
song.loop();
ceiling=30;
}

function draw() {
  if (player.money>0 && player.people>0 && player.clergy>0 && player.army>0 && end==false)
  {
    background(0, 0, 255);
    if (mouseIsPressed && mouseX<width/2 && mouseY>2*height/3)
      fill(100, 150, 100);
    else
      fill(0, 255, 0);
    rect(0, 2*height/3, width/2, height/3);
    if (mouseIsPressed && mouseX>width/2 && mouseY>2*height/3)
      fill(150, 100, 100);
    else
      fill(255, 0, 0);
    rect(width/2, 2*height/3, width/2, height/3);
    fill(255);
    for (var i=0; i<numIcons; i++)
    {
      image(icons[i], (i+1)*width/5, height/10);
    }
    text(player.money, (width/5)+(width/20), height/10);
    text(player.people, (2*width/5)+(width/20), height/10);
    text(player.clergy, (3*width/5)+(width/20), height/10);
    text(player.army, (4*width/5)+(width/20), height/10);
    text(questions[cur].text, width/6, height/10, 2*width/3, height/2);
    textSize(width/10)
    text("YES", width/4, 5*height/6);
    text("NO", 3*width/4, 5*height/6);
    textSize(width/20);
  } else if (end==true)
  {
    background(255);
    fill(0);
    text("You successfully brought your country out of the Middle Ages and into the 21st century.", width/4, 0, width/2, height/2);
    text("Final Stats:\nGDP: "+player.money+"\nFavorability with the People: "+player.people+"\nFavorability with the Church: "+player.clergy+"\nMilitary Might: "+player.army, width/4, height/3, width/2, height/2);
  } else if (player.army<=0)
  {
    background(0);
    fill(255);
    text("Your army was too weak and you were invaded", width/4, height/4, width/2, height/2);
  } else if (player.money<=0)
  {
    background(0);
    fill(255);
    text("You ran out of money and your country went bankrupt", width/4, height/4, width/2, height/2);
  } else if (player.people<=0)
  {
    background(0);
    fill(255);
    text("Unable to rule by love or by fear, you have been beheaded by your own angry people", width/4, height/4, width/2, height/2);
  } else
  {
    background(0);
    fill(255);
    text("You managed to upset the church so much that God himself struck you with a bolt of lightning", width/4, height/4, width/2, height/2);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(width/20);
  for (var i=0; i<numIcons; i++)
  {
    icons[i].resize(width/10, width/10);
  }
}
function mouseClicked()
{
  if (end==false && player.money>0 && player.clergy>0 && player.army>0 && player.people>0)
  {
    if (mouseX<width/2 && mouseY>2*height/3)
    {
      questions[cur].yes(true);
      if (cur+1<table.getRowCount())
        cur++;
      else
        end=true;
    }
    if (mouseX>width/2 && mouseY>2*height/3 && cur+1<table.getRowCount())
    {
      questions[cur].yes(false);
      if (cur+1<table.getRowCount())
        cur++;
      else
        end=true
      }
    }
  }