var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

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

var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var STATE_WIN = 3;

var gameState = STATE_SPLASH;

//-------------------- Don't modify anything above here
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//STAGE/MAP/LEVEL VARIABLES//
var LAYER_COUNT = 1;
var MAP = { tw: 20, th: 20};
var TILE = 32;
var TILESET_TILE = TILE * 1
var TILESET_PADDING = 0;
var TILESET_SPACING = 0;
var TILESET_COUNT_X = 20;
var TILESET_COUNT_Y = 20;

var tileset = document.createElement("img");
tileset.src = "Tileset_Basic.png";

var musicBackground;
//Song "Root" attributed to Silent Partner in YouTube 'create' section.

//var Enemy1 = new enemy1(); //>I add this by Rene
//var enemy = document.createElement("img");
//enemy.src = "enemy1.png";

var enemy = new Enemy1

var METER = TILE;
var GRAVITY = METER * 9.8 *6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX *6;

// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

// load an image to draw
var hero = document.createElement("img");
hero.src = "hero.png";

//UI ASSETS - Steph
var livesIcon = document.createElement("img")
livesIcon.src = "heart.png"
var countUpTimer = 0;
var scoreCount = 0;

var player = new Player();
var keyboard = new Keyboard();
//var Food = new Food();

var enemies = [];

/*//Enemy1 inprogress

//Enemy Layer costant
var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;

var enemies = [];

var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;
var enemies = [];
var LAYER_COUNT = 1;
var LAYER_BACKGOUND = 0;
//var LAYER_PLATFORMS = 1;
//var LAYER_LADDERS = 2;

var LAYER_OBJECT_ENEMIES = 3;
var LAYER_OBJECT_TRIGGERS = 4;
//................................By Rene*/




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
					//cells[layerIdx][y-1][x] = 1;
					//cells[layerIdx][y-1][x+1] = 1;
					//cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1)
				{
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
	
	var enemy = new Enemy1(32,32)
	enemies.push(enemy);

	musicBackground = new Howl(
		{
			urls: ["Root.mp3"],
			loop: true,
			buffer: true,
			volume: 0.1
		} );
}

function cellAtpixelCoord(layer, x,y)
{
	//check to see if we even have a valid pixel location
	if (x < 0 || x > SCREEN_WIDTH || y < 0 || y > SCREEN_HEIGHT)
		return 1;

	return cellAtTileCoord(layer, pixelToTile(x),pixelToTile(y));
}

function cellAtTileCoord(layer, tx, ty) 
{
	//if I have an invalid tile, return yes there is a collision
	if(ty < 0 || tx < 0 || tx > MAP.x || ty > MAP.y)
		return 1;
	return cells[layer][ty][tx];
}

function pixelToTile(pixel) 
{
	return Math.floor(pixel / TILE);
}

function drawMap()
{
	console.log("layerIdx = " + layerIdx++);
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)

	console.log("Is the map drawing?");
	for(var layerIdx=0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		var idx = 0;		// i add this *Rene
		for( var y = 0; y < level1.layers[layerIdx].height; y++)
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
		}
		console.log("Loop complete");
	}
}

function drawMapLayer(layer)
{
	console.log("Is the map drawing?");

		console.log("layer is = " + layer);
		var idx = 0;
		for( var y = 0; y < level1.layers[layer].height; y++)
		{
			for( var x = 0; x < level1.layers[layer].width; x++)
			{
				if(level1.layers[layer].data[idx] !=0 )
				{
					var tileIndex = level1.layers[layer].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_X)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
		console.log("Draw complete");
}

var splashTimer = 5;
function runSplash(deltaTime) 
{
	splashTimer -= deltaTime;
	if (splashTimer <= 0) 
	{
		gameState = STATE_GAME;
		return;
	}
	context.fillStyle = "#000";
	context.font = "70px Impact";
	context.fillText("DINNER TIME", 130, 240);

	context.font = "25px Arial";
	context.fillText("1. ARROW KEYS TO MOVE", 140, 270);
	context.font = "25px Arial";
	context.fillText("2. AVOID THE DINNER GUESTS", 140, 292);
	context.font = "25px Arial";
	context.fillText("3. COLLECT FOOD FOR POINTS", 140, 312);
	context.font = "25px Arial";
	context.fillText("4. REACH FIFTY POINTS TO WIN", 140, 332);
}

function runGame(deltaTime) 
{
	DrawUI();

	console.log("PLAY STATE");

	UpdateFood();

	player.update(deltaTime);
	player.draw();

	enemy.update(deltaTime);
	enemy.draw();

	/*musicBackground = new Howl(
		{
			urls: ["Root.mp3"],
			loop: true,
			buffer: true,
			volume: 0.1
		} );

	*/
	drawMapLayer(0);
	/*score += deltaTime;*/
	for (var i = 0; i < enemies.length; i++) 
	{
		
		enemies[i].update(deltaTime);
		enemies[i].draw();
	}
}

function runGameOver(deltaTime) 
{
	console.log("LOSE STATE");

	context.fillStyle = "#000";
	context.font = "24px Arial";
	context.fillText("TOO BAD!", 200, 240);
}

function runWIN(deltaTime) 
{
	console.log("WIN STATE");

	context.fillStyle = "#000";
	context.font = "24px Arial";
	context.fillText("YOU WIN!", 200, 240);
}

function DrawUI()
{
	for (var i = 0; i < player.lives; ++i) 
	{
		var x = 285 + (i * livesIcon.width);
		var y = SCREEN_HEIGHT - 3 - livesIcon.height;
		context.drawImage(livesIcon,x,y);
	}

	context.fillStyle = "red";
	context.font = "24px Impact";
	context.fillText("TIME:", 540, 634);
	context.fillStyle = "red";
	context.font="24px Impact";
	context.fillText(countUpTimer.toFixed(1).toString(), 595, 634);

	context.fillStyle = "red";
	context.font="24px Impact";
	context.fillText("SCORE:", 5, 634);
	context.fillStyle = "red";
	context.font="24px Impact";
	context.fillText(scoreCount.toFixed().toString(), 75, 634);

}

initialize();

function run()
{
	console.log("Is the run function working?");
	context.fillStyle = "#a9ffa2";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	switch (gameState) 
    {
        case STATE_SPLASH:
            runSplash(deltaTime);
            break;
        case STATE_GAME:
            runGame(deltaTime);

			countUpTimer += deltaTime;

			if(countUpTimer > 50)
			{
				gameState = STATE_GAMEOVER;
			}
            break;

        case STATE_GAMEOVER:
            runGameOver(deltaTime);
            break;
		case STATE_WIN:
            runWIN(deltaTime);
            break;
    }

	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}
//initialize();
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
