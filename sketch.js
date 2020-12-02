var PLAY = 1;
var END = 0;
var gameState = 1;


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var highScore = 0;
var gravity = 0.5;
var energy = 17;
var rH;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800, 400);
  monkey = createSprite(50, 315, 20, 20);
  monkey.addAnimation("running monkey", monkey_running);
  monkey.scale=0.12;
  invisibleGround = createSprite(400, 350, 800, 10);
  invisibleGround.visible=false;
  FoodGroup = new Group();
  obstacleGroup = new Group();
  monkey.setCollider("circle", 0, 0, 300);
  monkey.debug = true;
  monkey.setCollider("circle", 0, 0, 300);
  monkey.debug = true;
}


function draw() {
  background(200);
  rH=Math.round(random(100, 220))
  line(0, 343, 800, 343);
  if(gameState===PLAY){
  if(keyDown("space")&&monkey.y>308&&gameState===PLAY){
    monkey.velocityY=-energy;
  }
  console.log(monkey.y);
  monkey.velocityY=monkey.velocityY+gravity;
  createEdgeSprites();
  monkey.collide(invisibleGround);
    
  score = score + Math.round(getFrameRate()/60);
    
  
  if(monkey.isTouching(FoodGroup)){
    score=score+10;
    energy=energy+2;
    FoodGroup.destroyEach();
    
  }
  if(World.frameCount%70===0){
    energy=energy-1;
  }
  
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=0;
    
  }
  if(gameState===END){
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    banana.rotationSpeed=0;
    textSize(50);
    textFont("Georgia");
    text("Press R to restart", 100, 100);
    
  }
  if(keyWentUp("r")&&gameState===END){
    gameState=PLAY;
    monkey.y=315;
    if(score>highScore){
      highScore=score;
    }
    score=0;
    energy = 15;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }
  textSize(15);
  text("Score: "+score, 730, 30);
  text("High Score: "+highScore, 600, 30);
  text("Energy: "+energy, 730, 50);
  
  bananas();
  rocks();
  
  drawSprites();
}

function bananas(){
  if(World.frameCount%134===0&&gameState===PLAY){
    banana = createSprite(800, rH, 20, 20);
    banana.velocityX=random(-10, -6);
    banana.addImage(bananaImage);
    banana.lifetime=800/banana.velocityX;
    banana.scale=0.1;
    banana.rotationSpeed=random(-10, 10);
    banana.setCollider("circle", 0, 0, 300);
    banana.debug = true;
  
    FoodGroup.add(banana);
  }
}

function rocks(){
  if(World.frameCount%60===0&&gameState===PLAY){
    obstacle = createSprite(800, 308, 20, 20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-10;
  obstacle.scale=0.2;
    obstacle.lifetime=80;
    obstacle.setCollider("circle", 0, 0, 200);
  obstacle.debug = true;
  
    
  obstacleGroup.add(obstacle);
  }
}




