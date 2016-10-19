enemy_1.prototype.update = function (deltaTime) 
{
    if (typeof (this.rotation) == "undefined")
        this.rotation = 0; // hang on, where did this variable come from!
    if (keyboard.isKeyDown(keyboard.KEY_SPACE) == true) 
    {
        this.rotation -= deltaTime;
    }
    else 
    {
        this.rotation += deltaTime;
    }
}