var wizard;
var wizardImg;
var sword, swordImg;
var orc1, orcsImg, orcsGroup;
var fire1, fireImg, fireGroup;
var blaze1, blazeImg, blazeGroup;
var bolt1, boltImg, boltGroup;
var lives = 3;
var gameState = "play"
var backgroundImg;

function preload()
{
   wizardImg=loadImage("wizard.png");
   swordImg=loadImage("sword.png");
   orcsImg=loadAnimation("orc1.png" , "orc3.png" , "orc5.png" , "orc7.png");
   fireImg=loadAnimation("fire1.png");
   blazeImg=loadAnimation("blaze.png");
   boltImg=loadAnimation("bolt.png");
   backgroundImg=loadImage("plateau.jpg");
}
function setup() {
  createCanvas(1500,750);
  wizard = createSprite(300, 600, 50, 50);
  wizard.addImage(wizardImg);
  wizard.scale=0.5;

  sword = createSprite(100, 400, 50, 50);
  sword.addImage(swordImg);
  sword.scale=0.5;

  orcsGroup = createGroup();
  fireGroup = createGroup();
  blazeGroup = createGroup();
  boltGroup = createGroup();

}

function draw() {
  if(gameState === "play"){
  background(backgroundImg);

  createOrcs();
  wizard.y=mouseY;

  if(keyDown("space"))
  {
     createFire();
  }

  if(keyDown("up"))
  {
     createBlaze();
  }

  if(keyDown("down"))
  {
     createBolt();
  }

  if(fireGroup.isTouching(orcsGroup))
  {
    for(var i =0;i<orcsGroup.length;i++){
    orcsGroup.get(i).destroy();
    }
    for(var i =0;i<fireGroup.length;i++){
    fireGroup.get(i).destroy();
    }
  }

  if(blazeGroup.isTouching(orcsGroup))
  {
    for(var i =0;i<orcsGroup.length;i++){
    orcsGroup.get(i).destroy();
    }
    for(var i =0;i<blazeGroup.length;i++){
    blazeGroup.get(i).destroy();
    }
  }

  if(boltGroup.isTouching(orcsGroup))
  {
    for(var i =0;i<orcsGroup.length;i++){
    orcsGroup.get(i).destroy();
    }
    for(var i =0;i<boltGroup.length;i++){
    boltGroup.get(i).destroy();
    }
  }

  if(orcsGroup.isTouching(wizard))
  {
    lives-=1;
    for(var i =0;i<orcsGroup.length;i++){
      orcsGroup.get(i).destroy();
      }
  }

  if(lives === 0)
  {
    gameState = "end"
  }

  drawSprites();
}

  if(gameState === "end")
  {
    background("black")
    textSize(50);
    fill("red");
    text("GAME OVER", 700, 370);
    textSize(30);
    fill("blue");
    text("Press R to restart", 670, 420);
  }

  if(keyDown("r"))
  {
    gameState = "play";
    lives = 3;
  }
}
function createOrcs()
{
  if(frameCount%150===0)
  {
    orc1 = createSprite(1400, 400, 50, 50);
    orc1.addAnimation("running",orcsImg);
    orc1.velocityX=-3;
    orc1.scale=2.5;
    orc1.y=Math.round(random(50,700));
    orc1.lifetime=500;
    orcsGroup.add(orc1);
  }
}

function createFire()
{
  fire1 = createSprite(400, mouseY-90, 50, 50);
  fire1.addAnimation("running",fireImg);
  fire1.velocityX=3;
  fire1.scale=0.2;
  fire1.lifetime=500;
  fireGroup.add(fire1);
}

function createBlaze()
{
  blaze1 = createSprite(500, mouseY-90, 50, 50);
  blaze1.addAnimation("running",blazeImg);
  blaze1.velocityX=3;
  blaze1.scale=0.1;
  blaze1.lifetime=500;
  blazeGroup.add(blaze1);
}

function createBolt()
{
  bolt1 = createSprite(430, mouseY-90, 50, 50);
  bolt1.addAnimation("running",boltImg);
  bolt1.velocityX=3;
  bolt1.scale=0.3;
  bolt1.lifetime=500;
  boltGroup.add(bolt1);
}