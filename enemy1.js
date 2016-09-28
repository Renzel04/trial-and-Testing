var MAX_LIVES = 3;

var sfxWall;
sfxWall = new Howl(
{
    urls: ["wall.wav"],
    buffer: true,
    volume: 0.3,
});

var Enemy1 = function() 
{	
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2; 	
	this.width = 159;
	this.height = 163;	

	this.image.src = "enemy1.png";   
};

Enemy1.prototype.update = function(deltaTime)
{		
	if( typeof(this.rotation) == "undefined" )
		this.rotation = 0;				// hang on, where did this variable come from!

	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
    {
        this.rotation -= deltaTime;
    }
    else
    {
        this.rotation += deltaTime;
    }
}
Enemy1.prototype.draw = function () 
{
    //context.drawImage(this.image,this.position.x - worldOffsetX, this.position.y);
    //this.sprite.draw(context, this.position.x -worldOffsetX, this.position.y);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.drawImage(this.image, -this.width / 2, -this.height / 2);
    context.restore();

    //var tx = pixelToTile(this.position.x);
    //var ty = pixelToTile(this.position.y);

    //context.fillRect(epixel(tx,tileToPixel(tx)))

}