//declaring the variables
var Monkey, ground, monkeyAnimation, groundAnimation, banana, invisibleGround, bananaAnimation, ObstacleAnimation, Obstacle, Score;

function preload(){
  
 monkeyAnimation = loadAnimation("Monkey_01.png",     "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    
  groundAnimation = loadImage("jungle.jpg");
  
  ObstacleAnimation = loadImage("stone.png");
  
  bananaAnimation = loadImage("banana.png")
  
} 

function setup() {
  createCanvas(400, 400);
  
  //ground
  ground = createSprite(1, 200, 400, 400);
  ground.addAnimation("ground", groundAnimation);
  ground.scale = 1  ;
  ground.x = ground.width/2;
  
  //Monkey
  Monkey = createSprite(200, 365, 20, 20);
  Monkey.addAnimation("monkey", monkeyAnimation);
  Monkey.scale = 0.1;
  Monkey.x = 50;
  
  //invisible
  invisibleGround = createSprite(1, 399, 400, 20);
  invisibleGround .visible = false;
  
  
  Score = 0;
  
  bananas = new Group();
  
  Obstacles = new Group();
  
  textSize(20);
  
}

function draw() {
  
  background(0);
  
  //Condition to jump
  if(keyDown("space") && Monkey.y >= 300){
     
    Monkey.velocityY = -10;

  }
    
  //Condition for resetting the ground
  if(ground.x < 0){
   
    ground.x = ground.width/2;
  
  }
  
  //The condition if banana is touching the monkey
  if(bananas.collide(Monkey)){
    
    Score = Score + 2;
    bananas.destroyEach();
    
  } 
  
  //The condition if obstacle is touching the monkey
  if(Monkey.isTouching(Obstacles)){
    
    Monkey.scale = 0.1;
    
  } 
    
  //Setting the velocityX for ground
  ground.velocityX = -6  ;
    
  spawnBanana();
  
  spawnObstacle();  
  
  //Setting the gravity
  Monkey.velocityY = Monkey.velocityY + 0.8;
  
  //Colliding monkey with the invisible ground
  Monkey.collide(invisibleGround);
  
    //Switch case for changing the scale of the monkey         depending on the score
    switch(Score){
      case 10: Monkey.scale = 0.12;
              break;
      case 20: Monkey.scale = 0.14;
              break; 
      case 30: Monkey.scale = 0.16; 
              break;
      case 40: Monkey.scale = 0.18;
              break;   
      default: break;
      
    }
  
    drawSprites();
    
   //Displaying the test
   text("Score: " + Score, 300, 50);
}

function spawnBanana(){
 
  if(frameCount % 100 === 0){
    
    banana = createSprite(350, 250, 20, 20);
    
    //Setting the image
    banana.addImage(bananaAnimation);
    banana.scale = 0.08;
    
    //Setting the x and y axis
    banana.x = 380;
    banana.y = Math.round(random(240, 220));
    
    //Setting the Velocity x
    banana.velocityX = -6;
    
    //Setting the lifetime
    banana.lifetime = 134;
    
    //Adding to the group
    bananas.add(banana);
    
    
  }  
  
  
}

function spawnObstacle(){
 
  if(frameCount % 80 === 0){
   
    Obstacle = createSprite(350, 200, 20, 20);
    
    //Setting the y axis
    Obstacle.y = 370;
    
    //Setting the scale
    Obstacle.scale = 0.2 ;
    
    //Setting the image
    Obstacle.addImage(ObstacleAnimation); 
    
    //Setting the Velocity x
    Obstacle.velocityX = -6;
    
    //Setting the lifetime
    Obstacle.lifetime = 134;
    
    //Adding to the group
    Obstacles.add(Obstacle);
    
  }
  
}