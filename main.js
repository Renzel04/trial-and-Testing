var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

//Enemymovement
 var ENEMY1_SPEED = 0.8;

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//STAGE/MAP/LEVEL VARIABLES//
var LAYER_COUNT = 1;
var MAP = { tw: 20, th: 20};
var TILE = 32;
var TILESET_TILE = TILE * 1
var TILESET_PADDING = 1;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 20;
var TILESET_COUNT_Y = 20;

var tileset = document.createElement("img");
tileset.src = "Tileset_Basic.png";



/*var enemy = new Enemy1

var METER = TILE;
var GRAVITY = METER * 9.8 *6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX *6;*/

// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

// load an image to draw
var hero = document.createElement("img");
hero.src = "hero.png";

var player = new Player();
var keyboard = new Keyboard();

/*/Enemy1 inprogress
//Enemy Layer costant
var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;

var enemies = [];

var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;
var enemies = [];
var LAYER_COUNT = 3;
var LAYER_BACKGOUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;

var LAYER_OBJECT_ENEMIES = 3;
var LAYER_OBJECT_TRIGGERS = 4;
//................................By Rene*/

// Create an array to store our enemy1
var spawnTimer = 1;
	var enemy1 = [];

// rand(floor, ceil)
// Return a random number within the range of the two input variables
function rand(floor, ceil) 
{
	return Math.floor((Math.random() * (ceil - floor)) + floor);
}

// Create a new random enemy1 and add it to our enemy1 array.
// We'll give the enemy1 a random position (just off screen) and
// set it moving towards the center of the screen
function spawnEnemy1() 
{
	// make a random variable to specify which enemy1 image to use
	// (small, mediam or large)
	var type = rand(0, 3);
	// create the new enemy1
	var enemy1 = {};

	enemy1.image = document.createElement("img");
	enemy1.image.src = "enemy1.png";
	enemy1.width = 159;
	enemy1.height = 163;
	// to set a random position just off screen, we'll start at the centre of the
	// screen then move in a random direction by the width of the screen
	var x = SCREEN_WIDTH / 2;
	var y = SCREEN_HEIGHT / 2;

	var dirX = rand(-10, 10);
	var dirY = rand(-10, 10);
	// 'normalize' the direction (the hypotenuse of the triangle formed
	// by x,y will equal 1)
	var magnitude = (dirX * dirX) + (dirY * dirY);
	if (magnitude != 0) 
	{
		var oneOverMag = 1 / Math.sqrt(magnitude);
		dirX *= oneOverMag;
		dirY *= oneOverMag;
	}
	// now we can multiply the dirX/Y by the screen width to move that amount from
	// the centre of the screen
	var movX = dirX * SCREEN_WIDTH;
	var movY = dirY * SCREEN_HEIGHT;

	// add the direction to the original position to get the starting position of the
	// enemy1
	enemy1.x = x + movX;
	enemy1.y = y + movY;

	// now, the easy way to set the velocity so that the enemy1 moves towards the
	// centre of the screen is to just reverse the direction we found earlier
	enemy1.velocityX = -dirX * ENEMY1_SPEED;
	enemy1.velocityY = -dirY * ENEMY1_SPEED;

	// finally we can add our new enemy1 to the end of our enemy1 array
	enemy1.push(enemy1);
}

var cells = [];
function initialize()
{
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) 
	{
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < level1.layers[layerIdx].height; y++)
		{
			cells[layerIdx][y] = [];
			for(var x = 0; x < level1.layers[layerIdx].width; x++)
			{
				if(level1.layers[layerIdx].data[idx] !=0)
				{
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1)
				{
					cells[playerIdx][y][x] = 0;
				}
				/*/ add enemies
					idx = 0;
					for (var y = 0; y < level1.layers[LAYER_OBJECT_ENEMIES].height; y++) 
					{
						for (var x = 0; x < level1.layers[LAYER_OBJECT_ENEMIES].width; x++) 
						{
							if (level1.layers[LAYER_OBJECT_ENEMIES].data[idx] != 0) 
							{
								var px = tileToPixel(x);
								var py = tileToPixel(y);
								var e = new Enemy(px, py);
								enemies.push(e);
							}
							idx++;
						}
					}*/
				}
		}
	}
}
	
function cellAtpixelCoord(layer, x,y)
{

}

function drawMap()
{
	console.log("Is the map drawing?");
	for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
	{
		/*var idx = 0;		// i add this *Rene
		for( var y = 0; y <level1.layers[layerIdx].height; y++)
		{
			for( var x = 0; x < level1.layers[layerIdx].width; x++)
			{
				if(level1.layers[layerIdx].data[idx] !=0 )
				{
					var tileIndex = level1.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_X)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}*/
	}
}

function run()
{
	console.log("Is the run function working?");
	context.fillStyle = "#a9ffa2";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	player.update(deltaTime);
	player.draw();

	// update all the enemy1 in the enemy1 array
	for (var i = 0; i < enemy1.length; i++) 
	{
		// update the enemy1 position according to its current velocity.
		// TODO: Dont forget to multiply by deltaTime to get a constant speed
		enemy1[i].x = enemy1[i].x + enemy1[i].velocityX;
		enemy1[i].y = enemy1[i].y + enemy1[i].velocityY;
		// TODO: check if the asteroid has gone out of the screen boundaries
		// If so, wrap the astroid around the screen so it comes back from the
		// other side
	}
	// draw all the enemy1
	for (var i = 0; i < enemy1.length; i++) 
	{
		context.drawImage(enemy1[i].image, enemy1[i].x - enemy1[i].width / 2,
			enemy1[i].y - enemy1[i].height / 2);
	}
	spawnTimer -= deltaTime;
	if (spawnTimer <= 0) {
		spawnTimer = 1;
		spawnEnemy1();
	}
	/*enemy.update(deltaTime);
	enemy.draw();
	for (var i = 0; i < enemies.length; i++) //> i add this Rene
	{
		enemies[i].update(deltaTime);
		enemy.update(deltaTime);
		enemy.draw();

		for (var i = o; i< enemies.lenght; i++) 
		{
			enemies[i].update(deltaTime);
			enemies[i].draw();
		}
	}*/
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}
//initialize();
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
}


//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() 
{
  var onEachFrame;
  if (window.requestAnimationFrame) 
  {
    onEachFrame = function(cb) 
	{
      var _cb = function() 
	  { 
		  cb(); window.requestAnimationFrame(_cb); 
		}
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) 
  {
    onEachFrame = function(cb) 
	{
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else 
  {
    onEachFrame = function(cb) 
	{
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
