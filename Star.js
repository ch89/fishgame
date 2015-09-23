function Star(angle) {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/star.png'));
	
	this.anchor.x = .5;
	this.anchor.y = .5;

	this.angle = angle;
}

Star.prototype = Object.create(PIXI.Sprite.prototype);

Star.prototype.takeDamage = function(damage) {
	
}

Star.prototype.destroy = function() {
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}