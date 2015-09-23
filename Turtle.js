function Turtle() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/turtle.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 600;
	this.y = 150;

	this.angle = 0;
	this.speed = 1;
	this.life = 5 * players.length;
	this.maxLife = this.life;
	this.center = renderer.height / 2;

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 5000);
	this.cooldown.start();
}

Turtle.prototype = Object.create(PIXI.Sprite.prototype);

Turtle.prototype.update = function() {
	this.x -= this.speed;

	if(this.x < 0) {
		this.destroy();
	}
}

Turtle.prototype.shoot = function() {
	var seekingMissle = new SeekingMissile();
	seekingMissle.x = this.x;
	seekingMissle.y = this.y;
	this.parent.addChild(seekingMissle);
	enemies.push(seekingMissle);
}

Turtle.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		this.destroy();
	}
}

Turtle.prototype.destroy = function() {
	this.cooldown.stop();
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}