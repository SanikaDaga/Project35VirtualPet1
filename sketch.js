var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var bgImg;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  bgImg = loadImage("kennel.jpg")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,400,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  milk = createSprite(140,475,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;

  milk1 = createSprite(210,430,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.025;
  milk1.visible = false;


  for (var i = 5; i < 500; i=i+10) 
{

var dot = createSprite(i, 5, 3, 3);
dot.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(i, 495, 3, 3);
dot1.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(495,i, 3, 3);
dot1.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(5,i, 3, 3);
dot1.shapeColor = "blue";

}
}


function draw() {  
  background(bgImg);
 
  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    milk1.visible = true;

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    milk1.visible = false;
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}



  drawSprites();
  textSize(17);

  stroke(6)
  fill("black");
  text("I am Hungry Pls give me some food",100,70);
  fill("black");
  text("LONG PRESS UP ARROW KEY TO FEED YOUR PET DOG",15,25);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,480);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

