var Vector2 = function () {
    this.x = 0;
    this.y = 0;
}

Vector2.prototype.set = function (x,y) {
    this.x = x;
    this.y = y;
}
Vector2.prototype.getMagnitude = function () {
    var x2 = this.x * this.x;
    var y2 = this.y * this.y;
    var h2 = x2 + y2;
    return Math.sqrt(h2);
}
Vector2.prototype.normalise = function ()
{
    var magnitude = this.getMagnitude();
    this.x = this.x / magnitude;
    this.y = this.y / magnitude;
}