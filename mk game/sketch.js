var START = 1;
var PLAY = 0;
var END = 0;
var gameState = PLAY;
var entry1,entry2;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var rain;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart,space;


function preload(){
  jumpSound = loadSound("jump.wav")
  backSound = loadSound("back.mp3");
  
  backgroundImg = loadImage("backgroundImg.png")
  sunAnimation = loadImage("gjf.png");
  
  trex_running = loadAnimation("mky1.png","mky2.png");
  trex_collided = loadAnimation("Untitled.png");
  
  groundImage = loadImage("ground.png");
  xImage = loadImage("entry2.png");
  eImage = loadImage("entry of mk.png");
  cloudImage = loadImage("cloud2.png");
  okImage = loadImage("ok.png");
  rImage= loadImage("rain2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  spaceImg = loadImage("mkj.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.4;
  
  trex = createSprite(90,height-20,20,50);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,250)
  trex.scale = 0.7;
  // trex.debug=true
  
  invisibleGround = createSprite(1,height,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,125);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
space = createSprite(width/2,height/2-150);
  space.addImage(spaceImg);
  entry1 = createSprite(625,300);
  entry1.addImage(eImage);
  entry1.scale = windowWidth/1500,windowHeight/1500;
entry2 = createSprite(693,270);
  entry2.addImage(xImage);
  rain = createSprite(width/2,height/2-150);
  rain.addImage(rImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;
space.scale = 0.5;
entry2.scale = -0.1;
  gameOver.visible = false;
  restart.visible = false;
  space.visible = false;
 entry2.visible = false;
 entry1.visible = false;
 
gameState = START = true;
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  okGroup = new Group();
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
if (gameState===START){
   entry1.visible = true;
    entry2.visible = true;
    rain.visible = false;
    score.visible = false;
    
    okGroup.visible = false;
    ground.visible= false;
    cloudsGroup.visible = false;
    obstaclesGroup.visible = false;
    background.visible = false;
    sun.visible = false;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    okGroup.setVelocityXEach(0);
    okGroup.destroyEach();
    trex.visible = false;
    if(mousePressedOver(entry2)){
      gameState=PLAY;
    }
    
  }
 if (gameState===PLAY){
  entry2.visible = false;
  entry1.visible = false;
  ground.visible = true;
  rain.visible = true;
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    trex.visible = true;
    if((touches.length > 0 || keyDown("space")) && trex.y  >= height-400) {
      jumpSound.play( )
      trex.velocityY = -10;
       touches = [];
    }

    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnOk();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        
        gameOver.visible = true;   
        restart.visible = true;
        space.visible = true;
        rain.visible = false;
        okGroup.visible = false;
        cloudsGroup.visible = false;
        //set velcity of each game object to 0
  
  score = score + Math.round(getFrameRate()/0);
        ground.velocityX = 0;
        trex.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        okGroup.setVelocityXEach(0);
        //change the trex animation
        trex.changeAnimation("collided",trex_collided);
        
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        okGroup.setLifetimeEach(-1);
        okGroup.destroyEach();
        cloudsGroup.destroyEach();
        if(touches.length>0 || keyDown("SPACE")) {      
          reset();
          touches = [];
        }
    }
  }
 else  if (gameState === END) {
    gameOver.visible = true;   
    restart.visible = true;
    space.visible = true;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    okGroup.setVelocityXEach(0);
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    okGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = [];
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnOk(){
  if (frameCount % 60 === 0) {
    var ok= createSprite(width+20,height-300,40,10);
    ok.y = Math.round(random(100,70));
    ok.addImage(okImage);
    ok.scale = 0.1;
    ok.velocityX = -1;
    
     //assign lifetime to the variable
    ok.lifetime = 600;
    
    //adjust the depth
    ok.depth = trex.depth-1;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    okGroup.add(ok);
  }

}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(9+ 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = START;
  gameOver.visible = false;
  restart.visible = false;
  space.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
