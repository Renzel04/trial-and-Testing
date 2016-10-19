var Enemy = function (x, y) 
{
   /* this.sprite = new Sprite("enemy1.png");
    this.sprite.buildAnimation(2, 1, 88, 94, 0.3, [0, 1]);
    this.sprite.setAnimationOffset(0, -35, -40);*/
    this.image = document.createElement("img");

    this.position = new Vector2();
    this.position.set(x, y);

    this.velocity = new Vector2();

    this.moveRight = true;
    this.pause = 0;

    this.image.src = "enemy1.png"; 
}
Enemy.prototype.update = function (dt) 
{
    
}

Enemy.prototype.draw = function ()
{
    context.save();			
		context.translate(this.position.x, this.position.y);
		//context.rotate(this.rotation);
		context.drawImage(this.image,0,0,this.image.width,this.image.height,-this.width/2, -this.height/2,this.width,this.height)
	context.restore();
}