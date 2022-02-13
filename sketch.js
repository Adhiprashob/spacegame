
var END=0;

var rocket,rocketImg;
var star,starImg;
var obstacle,obstacleImg;
var gameOver,gameoverImg;
var invisibleGround,invisibleWall1;
var invisibleWall2,score=0,fuel=50;
var gameState="PLAY",play=0;
var  obstacleGroup,starGroup,fuelGroup;
var  towerGroup,gameSound;
var buttonType,restart,restartImg;
var rocketFuel,FuelImg,rand;


function preload(){
  rocketImg = loadImage("rocket.png","rocket.png");
    starImg = loadImage("star.png");
    towerImg = loadImage("tower.png");
    obstacleImg = loadImage("obstacle3.png");
    gameoverImg = loadImage("gameOver.png");
     gameSound = loadSound("gameOver.mp3");
     restartImg = loadImage("restart1.png");
     startouchSound = loadSound("star touching sound.mp3");
     fuelImg  = loadImage("rocket fuel.png");
}

function setup(){
  background(200);
createCanvas(600, 600);




// make tower


tower = createSprite(300,300);
tower.addImage(towerImg);
tower.velocityY=1;

// create groups


starGroup=createGroup();
obstacleGroup=createGroup();
fuelGroup=createGroup();
  
rocket = createSprite(300,530);
rocket.addImage("rocket",rocketImg);
rocket.scale=0.3;
rocket.visible=true;

}








function draw(){
  background(200)

  if(tower.y > 400){
    tower.y = 300
   }
  
  
   rocket.debug=false;
   rocket.setCollider("rectangle",0,0,90,100);
  

if(gameState==="PLAY"){



 
spawnPetrol();
spawnObstacle();
spawnStars();


    
// controlls

if(tower.y > 400){
  tower.y = 300
 }


 
  if(keyDown("left_arrow")){
    rocket.x-=3;

  }

  if(keyDown("right_arrow")){
    rocket.x+=3;
    
  }

  

  if(starGroup.isTouching(rocket)){
     fuel=fuel-1; 
    starGroup.destroyEach();
    score=score+2;
    startouchSound.play();
  }


  if(fuelGroup.isTouching(rocket)){
    fuelGroup.destroyEach();
    fuel=fuel+4;
  }

  

  // ground

  

  invisibleWall2 = createSprite(500,100,10,999);
invisibleWall2.visible=false;


  invisibleGround = createSprite(160,590,900,10);
invisibleGround.visible = false;

invisibleWall1 = createSprite(88,100,10,999);
invisibleWall1.visible=false;

rocket.collide(invisibleWall2);
rocket.collide(invisibleWall1);
rocket.collide(invisibleGround);


if(obstacleGroup.isTouching(rocket)){
  gameState=END;
  
  gameSound.play();

  obstacleGroup.destroyEach();
 starGroup.destroyEach();
  starGroup.setVelocityYEach(0);
  obstacleGroup.setVelocityYEach(0);
  gameOver = createSprite(330,250);
gameOver.addImage(gameoverImg);
  rocket.visible=false;
  gameOver.visible=true;
 tower.velocityY=0;
  restart = createSprite(330,340);
  restart.addImage(restartImg);
  restart.visible=true;


  
}
}
  

// reset

if (mousePressedOver(restart)) {
  reset();
}





  drawSprites();

textSize(40);
  fill("white");
  text("score"+score,30,100);

textSize(40);
fill("white");
text("fuel"+fuel,30,150);

 
}



//

function spawnStars(){

if(frameCount%210===0){
  star = createSprite(230,250)
  star.addImage(starImg);
   star.scale=0.3;    
  star.x=Math.round(random(200,500));
  star.velocityY+=5;
  star.lifetime=55;
  star.scale=0.3
  starGroup.add(star);


  }
}
  



function spawnObstacle(){
  if(frameCount%240===0){
  obstacle = createSprite(200,50);
  obstacle.addImage(obstacleImg);
  obstacle.x=Math.round(random(120,400));
  obstacle.velocityY+=5;
  obstacle.lifetime=99;
  obstacle.scale=0.5
obstacleGroup.add(obstacle);
obstacle.setCollider("rectangle",0,0,90,100);
obstacle.debug=false;


 //generate rand obstacle
 var rand = Math.round(random(1,2));
 switch(rand) {
   case 1: obstacle.addImage(obstacleImg);
           break;
   case 2: obstacle.addImage(obstacleImg);
           break;
   default: break;
 }


  }

}

function spawnPetrol(){
  if(frameCount%340===0){

petrol = createSprite(200,50);
petrol.addImage(fuelImg);
petrol.velocityY+=6;
petrol.scale=0.3;
fuelGroup.add(petrol);
  }
}







function reset(){

  gameState="PLAY";
  gameOver.visible=false;
  restart.visible=false;
 
  tower.velocityY=1;

  //rocket = createSprite(300,530);
  //rocket.addImage("rocket",rocketImg);
  //rocket.scale=0.3;
  rocket.visible=true;
  

  

  
  if(keyDown("left_arrow")){
    rocket.x-=3;
  buttonType.play();
  }

  if(keyDown("right_arrow")){
    rocket.x+=3;
    buttonType.play();
  }


  if(keyDown("left_arrow")){
    rocket.x-=3;
  buttonType.play();
  }

  
fuel=50;
score=0;
}