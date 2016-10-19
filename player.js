var MAX_LIVES = 3;

var LEFT = 0;
var RIGHT = 1;
var UP = 2;
var DOWN = 3;

var ANIM_WALK_LEFT = 0;
var ANIM_WALK_RIGHT = 1;
var ANIM_WALK_UP = 2;
var ANIM_WALK_DOWN = 3;
var ANIM_MAX = 4;

var MOVE_SPEED = 20;

var sfxWall;
sfxWall = new Howl(
{
    urls: ["wall.wav"],
    buffer: true,
    volume: 0.3,
});

var Player = function() 
{	
    this.sprite = new Sprite("hero.png");
	this.sprite.buildAnimation(13, 21, 25, 48, 0.05,
		[87, 88, 89, 90, 91, 92, 93, 94, 95]);
	this.sprite.buildAnimation(13, 21, 25, 48, 0.05,
		[69, 70, 71, 72, 73, 74, 75, 76, 77]);
	this.sprite.buildAnimation(13, 21, 25, 48, 0.05,
		[60, 61, 62, 63, 64, 65, 66, 67, 68]);
	this.sprite.buildAnimation(13, 21, 25, 48, 0.05,
		[78, 79, 80, 81, 82, 83, 84, 85, 86]);

	this.image = document.createElement("img");
	//this.x = canvas.width/2;
	//this.y = canvas.height/2; 
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
	this.sprite.update(deltaTime);

    this.direction.set(0,0);

    if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
    {
        left = true;
        //this.direction = LEFT;
        this.direction.x -= 1;
        if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
            this.sprite.setAnimation(ANIM_WALK_LEFT);
    }

    if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
    {
        right = true;
        //this.direction = RIGHT;
        this.direction.x += 1;
        if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
            this.sprite.setAnimation(ANIM_WALK_RIGHT);
    }

    if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
    {
        up = true;
       // this.direction = UP;
       this.direction.y -= 1;
        if(this.sprite.currentAnimation != ANIM_WALK_UP)
            this.sprite.setAnimatino(ANIM_WALK_UP);
    }

    if(keyboard.isKeyDown(keyboard.key_DOWN) == true)
    {
        down = true;
        //this.direction = DOWN;
        this.direction.y += 1;
        if(this.sprite.currentAnimation != ANIM_WALK_DOWN)
            this.sprite.setAnimation(ANIM_WALK_DOWN);
    }

    var tempx = this.position.x + (this.direction.x * MOVE_SPEED * deltaTime);
    var tempy = this.position.y + (this.direction.y * MOVE_SPEED * deltaTime);

    if(cellAtpixelCoord(0,tempx,tempy) == 0)
    {
        this.position.x += tempx;
        this.position.y += tempy;
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
    this.sprite.draw(context, this.position.x, this.position.y);
}