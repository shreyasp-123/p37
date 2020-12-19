//Create variables here
var dog, database, foodS, foodStock, doggy, dogHappy, foodObj, gameState;
var button1, button2, fedTime, lastFed;
var changeGameState
var readGameState
var bedroom, garden, washroom, currentTime
function preload()
{
  //load images here
  doggy = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png")
  bedroom = loadImage("bedrrom.jpg")
  washroom = loadImage("bathroom.jpeg")
  garden = loadImage("garden.jpg")
  
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock)

  dog = createSprite(600, 250, 20, 20)
  dog.scale = 0.3
  dog.addImage("doggy", doggy)
  dog.addImage("dogHappy", dogHappy)
  foodObj = new Food()

  button1 = createButton('Feed')
  button2 = createButton('Add Food')
  button1.position(350, 10);
  button2.position(450, 10);

}


function draw() {  
  background(0)

  currentTime = hour()
  if(currentTime == lastFed + 1){
    update("playing")
    foodObj.garden()
  } else if(currentTime == lastFed + 2){
    update("sleeping")
    foodObj.bedroom()
  } else if(currentTime > lastFed + 2 && currentTime <= lastFed + 4){
    update("bathing")
    foodObj.washroom()
  } else{
    update("hungry")
    foodObj.display()
  }

  fedTime = database.ref('FeedTime')
  fedTime.on("value", (data) => {
    lastFed = data.val()
  })
  button1.mousePressed(feedDog)
  button2.mousePressed(addFoods)
  fill(255, 255, 254)
  textSize(15)

  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " AM", 200, 25)
  }else if(lastFed === 0){
    text("Last Feed : 12 AM", 200, 25)
  }else{
    text("Last Feed" + lastFed + " AM", 200, 25)
  }
  readGameState = database.ref('gameState')
  readGameState.on("value", (data) =>{
    gameState = data.val()
  })

  if(gameState != "hungry"){
    button1.hide()
    button2.hide()
    dog.remove()
  } else{
    button1.show()
    button2.show()
    dog.changeImage("doggy", doggy)
  }

  drawSprites();
  //add styles here

}


function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.changeImage("dogHappy", dogHappy)
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}