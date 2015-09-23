function Background(texture) {
    PIXI.Sprite.call(this, texture);
    this.speed = .5;
}

Background.prototype = Object.create(PIXI.Sprite.prototype);

Background.prototype.update = function() {
    this.x -= this.speed;

    if(this.x < -this.width) {
    	this.x = 0;
    }
}

Background.prototype.destroy = function() {
	this.parent.removeChild(this);
}