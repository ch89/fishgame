function Octopus() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/o.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = renderer.width;
	this.y = renderer.height / 2;

	this.speed = 1;
	this.center = renderer.height / 2;
	this.angle = 0;

	this.life = 100;
	this.maxLife = this.life;

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 1750);
	this.cooldown.start();
}

Octopus.prototype = Object.create(PIXI.Sprite.prototype);

Octopus.prototype.update = function() {
	if(this.x > 500) {
		this.x -= this.speed;
	}

	this.y = this.center + Math.sin(this.angle) * 75;
	this.angle += .02;
}

Octopus.prototype.shoot = function() {
	var boomerang = new Boomerang(this);
	boomerang.x = this.x;
	boomerang.y = this.y;
	this.parent.addChild(boomerang);
}

Octopus.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		this.life = 0;
	    this.destroy();
	    updateScore(100);
		gameOverTimer.start();
	}

	bossHealthBar.foreground.scale.x = this.life / this.maxLife;
	bossHealthBar.text.setText(this.life + " / " + this.maxLife);
}

Octopus.prototype.destroy = function() {
	this.cooldown.stop();
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}