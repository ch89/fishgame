function Jellyfish() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/jellyfish.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 600;
	this.y = Math.random() * 200 + 50;

	this.life = 6 * players.length;
	this.speed = .5;

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 2000);
	this.cooldown.start();
}

Jellyfish.prototype = Object.create(PIXI.Sprite.prototype);

Jellyfish.prototype.update = function() {
	this.x -= this.speed;

	if(this.x < 0) {
		this.destroy();
		return;
	}

	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			updateScore(-5);
			players[i].takeDamage(1);
			this.destroy();
			break;
		}
	}
}

Jellyfish.prototype.shoot = function() {
	for(var i = 0; i < players.length; i++) {
		if(Math.sqrt(Math.pow(this.x - players[i].x, 2) + Math.pow(this.y - players[i].y, 2)) <= 200) {
			var lightning = new Lightning(this, players[i]);
			this.parent.addChild(lightning);
		}
	}

	/*
	for(var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 4) {
		var bullet = new Missile(angle);
		bullet.x = this.x;
		bullet.y = this.y;
		bullet.rotation = angle;
		this.parent.addChild(bullet);
	}
	*/
}

Jellyfish.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		updateScore(5);
		this.destroy();
	}
}

Jellyfish.prototype.destroy = function() {
	this.cooldown.stop();
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}