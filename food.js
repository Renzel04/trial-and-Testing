var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var apple = document.createElement("img");
apple.src="apple.png";

var burger = document.createElement("img");
burger.src="burger.png";

var cake = document.createElement("img");
cake.src="cake.png";

var chicken = document.createElement("img");
chicken.src="chicken.png";

var pizza = document.createElement("img");
pizza.src="pizza.png";

var watermelon = document.createElement("img");
watermelon.src="watermelon.png";

var foodImages = [apple, burger, cake, chicken, pizza, watermelon];

//HOW OFTEN THE OBJECT WILL SPAWN (IN MILLISECONDS)
var spawnRate = 7000;

//WHEN DID THE LAST OBJECT SPAWN?
var lastSpawn = -1;

var spawnLineY = 240;

var objects = [];

//SAVE STARTING TIME (USED TO CALCULATE ELAPSED TIME)
var startTime = Date.now();


function spawnRandomObject()
{
    var colour = "";
    if (Math.random() < 0.50)
    {
        colour = "red";
    }
    else
    {
        colour = "blue";
    }

    var food =
    {
     type: colour,
        x: Math.random() * (canvas.width - 30) + 15,
        y: spawnLineY,
        image: foodImages[Math.floor(Math.random()*foodImages.length)]
    }
    objects.push(food);
}

/*function animate()
{
    var time = Date.now();

    if(time > lastSpawn + spawnRate)
    {
        lastSpawn = time;
        spawnRandomObject();
    }

    requestAnimationFrame(animate);
}

var object = 
{
    type: food,
    x: Math.random() * (canvas.width - 30) + 15,
    y: spawnLineY,

    image: food[Math.floor(Math.random()*food.length)]
}

window.onload = function()
{
    animate();
}

for (var i = 0; i < objects.length; i++)
{
    var object = objects[i];
    object.y += spawnRateOfDescent;
    ctx.drawImage(object.food, object.x, object.y, 30,30);
}*/

function UpdateFood()
{
    var time = Date.now();

    if(time > lastSpawn + spawnRate)
    {
        lastSpawn = time;
        spawnRandomObject();
    }

    DrawFood();
}

function DrawFood()
{
    for(var i = 0; i < objects.length; i++)
    {
        context.drawImage(objects[i].image,objects[i].x, objects[i].y);
    }
}

//collision radius