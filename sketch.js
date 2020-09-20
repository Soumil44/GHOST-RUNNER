var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower, towerImage;

var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleclimber, invisibleclimberGroup;

var ghost, ghostImage;

var score = 0;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png")
  doorGroup = new Group(); 
  climberGroup = new Group();
  invisibleclimberGroup = new Group();
}

function setup(){
  createCanvas(400,400)
  tower = createSprite(200,200);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;

  ghost = createSprite(200,200);
  ghost.addImage("ghost standing",ghostImage);
  ghost.scale = 0.3
  
}

function draw(){
 background("black")
 //ghost.debug = true;
  ghost.setCollider("circle",0,0,100);
  
  //console.log(tower.y)
  if("gameState === PLAY"){
    if(tower.y>400){
    tower.y = 200;
  }
    if(ghost.collide(climberGroup)){
    ghost.velocityY = 0;
  }
    if(keyDown("left")){
    ghost.x = ghost.x - 3 
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x + 3 
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5
  }
    ghost.velocityY = ghost.velocityY + 0.8;
    spawndoor();
    if(ghost.collide(invisibleclimberGroup) || ghost.y > 400){
    ghost.destroy();
     
      gameState = "END"
  }
  }
  if(gameState === "END"){
    stroke("red");
    textSize(30);
    text("GAMEOVER",200,200);
    tower.velocityY = 0
    doorGroup.setVelocityYEach(0)
    climberGroup.setVelocityYEach(0)
    invisibleclimberGroup.setVelocityYEach(0)
    doorGroup.setLifetimeEach(-1)
    climberGroup.setLifetimeEach(-1)
    invisibleclimberGroup.setLifetimeEach(-1)
  }
  stroke("black");
  textSize(30);
  text("SCORE",200,200);

drawSprites()
  
}

function spawndoor(){
  
  if(frameCount%250 === 0){
  door = createSprite(200,100);
  door.addImage("door",doorImage);
    
  climber = createSprite(200,150);
  climber.addImage("climber",climberImage); 
    
 invisibleclimber = createSprite(200,160,20,20);
   invisibleclimber.width = climber.width;
    
  door.x = Math.round(random(150,350))
  climber.x = door.x;
    
    invisibleclimber.x = door.x;
    
  door.velocityY = 1;
  climber.velocityY = 1;
    
    invisibleclimber.velocityY = 1;
    
  door.lifetime = 400;
  climber.lifetime = 400;
    
  invisibleclimber.lifetime = 400;
    
  doorGroup.add(door);
  climberGroup.add(climber);
  invisibleclimberGroup.add(invisibleclimber);
    
  ghost.depth = door.depth + 1
  }
}




