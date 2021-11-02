var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,ghostJumpImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var invisibleground;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJumpImg = loadImage("ghost-jumping.png")
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group()
  climbersGroup = new Group()
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300,40,40)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.5;
  invisibleground = createSprite(300,600,600,10);
  ghost.addImage("jumping", ghostJumpImg)
}

function draw() {
  background(200);
  invisibleground.visible = false
  if(tower.y > 400){
      tower.y = 300
    }
  if(gameState === "play"){

  if(keyDown("right") && ghost.x < 550){
    ghost.x = ghost.x + 10
  }

  if(keyDown("left") && ghost.x > 50){
    ghost.x = ghost.x - 10
  }

  if(keyDown("space")){
     ghost.velocityY = -5
     
     ghost.changeAnimation("jumping", ghostJumpImg)
  }

  if(ghost.isTouching(doorsGroup)) {
    gameState = "end" ;
    console.log("hi")
    spookySound.play();
 }
 if(ghost.isTouching(invisibleground)) {
  gameState = "end" ;
  console.log("hi")
  spookySound.play();
}
 spawndoors();
 ghost.velocityY = ghost.velocityY + 0.5;
}
  else if(gameState === "end"){
    
    text.scale = 5.5
    text ("GAME OVER",250,300)


    background(black);

    doorsGroup.setLifetimeEach(-1);
    climbersGroup.setLifetimeEach(-1);
     
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);

    tower.velocityY = 0;
    ghost.velocityY = 0;

  }
  

 
  
  drawSprites();
 
  ghost.setCollider("rectangle",15,10,200,200)

}

function spawndoors(){

  if(frameCount % 200 == 0){  
    door = createSprite(300,0,40,40)
    door.addImage("doors",doorImg)

    climber = createSprite (300,60);
    climber.addImage("climbers",climberImg)

    door.velocityY = 2;
    door.x = Math.round(random(50,500))

    climber.x = door.x;
    climber.velocityY = door.velocityY;

    doorsGroup.add(door);
    climbersGroup.add(climber);

    

    door.lifetime = 350
    climber.lifetime = 350
  }            
 


}


