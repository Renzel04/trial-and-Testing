var MAX_LIVES = 3;

var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var MOVE_SPEED = 20;

var Player = function() 
{	
    

	this.image = document.createElement("img");
	
    this.position = new Vector2();
    this.position.set(canvas.width/2, canvas.height/2);	

    this.direction = new Vector2();
    this.direction.set(0,0);

	this.width = 159;
	this.height = 163;	

	this.image.src = "hero.png";  

    this.lives = MAX_LIVES;
};

Player.prototype.update = function(deltaTime)
{		
    //this.direction.set(0,0);

    this.position.set(placeOnTile(20),placeOnTile(23));

    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
    {
        left = true;
        //this.direction = LEFT;
        this.direction.x -= 1;
    }

    if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
    {
        right = true;
        //this.direction = RIGHT;
        this.direction.x += 1;
    }

    if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
    {
        up = true;
       //this.direction = UP;
       this.direction.y -= 1;
    }

    if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
    {
        down = true;
        //this.direction = DOWN;
        this.direction.y += 1;
    }

    var tempx = this.position.x + (this.direction.x * MOVE_SPEED * deltaTime);
    var tempy = this.position.y + (this.direction.y * MOVE_SPEED * deltaTime);

    if(cellAtpixelCoord(0,tempx,tempy) == 0)
    {
        this.position.x = tempx;
        this.position.y = tempy;
    }
    else
    {
        console.log("I can't move there");
        //if for an AI
        //create new random direction
        //OR
        //reverse direction
    }
}

Player.prototype.draw = function () 
{
    context.drawImage(this.image, this.position.x, this.position.y);
}