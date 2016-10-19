var Vector2position = function () 
{
    this.position = (x,y) = 0;
    this.position = y;
}

Vector2position.prototype.set = function (x, y) 
{
    this.x = x;
    this.y = y;
}
Vector2position.prototype.getMagnitude = function () 
{
    var x2 = this.x * this.x;
    var y2 = this.y * this.y;
    var h2 = x2 + y2;
    return Math.sqrt(h2);
}
Vector2position.prototype.normalise = function () 
{
    var magnitude = this.getMagnitude();
    this.x = this.x / magnitude;
    this.y = this.y / magnitude;
}