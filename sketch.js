var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaimg, bananaGroup

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg= loadImage("banana.png")
  obstacleimg=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale =0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

 bananaGroup= new Group()
 obstacleGroup= new Group()
  
}

function draw() { 
  background(0 );
  drawSprites();
  textSize(30)
  fill(255)
  text("score: "+score,600,50)

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnBanana();

    if(bananaGroup.isTouching(player) )
    {
      player.scale= 0.2
      
      score= score+1
      bananaGroup[0].destroy()

     
        
      
      
    }

    spawnObstacles();

    if(obstacleGroup.isTouching(player) && player.scale=== 0.1)
    {
      gameState=END;

    }
    else if(obstacleGroup.isTouching(player) && player.scale !== 0.1){
      player.scale=0.1
      obstacleGroup[0].destroy()
    }
   

    console.log(player.scale)
    
  }

  

  

  if(gameState=== END)

  {
    backgr.velocityX=0;
    player.visible=false

    bananaGroup.destroyEach()
    obstacleGroup.destroyEach()

    textSize(30)
    fill(255)
    text("game over",400,200)
  }
}

function spawnBanana()
{
  if(frameCount%60===0)
  {
    rand=random(120,200)
     var banana= createSprite(800,rand,50,50)
     banana.addImage(bananaimg)
     banana.scale=0.05;
     banana.velocityX=-4;
    banana.lifetime=300

     bananaGroup.add(banana)
  }
}

function spawnObstacles()
{
  if(frameCount%120===0)
  {
    
     var obstacle= createSprite(800,330,50,50)
     obstacle.addImage(obstacleimg)
     obstacle.scale=0.2;
     obstacle.velocityX=-4;
   obstacle.lifetime=300

    obstacleGroup.add(obstacle)
  }
}