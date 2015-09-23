function Shell() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/shell.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 600;
	this.y = 150;

	this.life = 3;
	this.speed = 1;

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 2000);
	this.cooldown.start();
}

Shell.prototype = Object.create(PIXI.Sprite.prototype);

Shell.prototype.update = function() {
	this.rotation = Math.atan2(players[0].y - this.y, players[0].x - this.x);

	this.x += Math.cos(this.rotation) * this.speed;
	this.y += Math.sin(this.rotation) * this.speed;
}

Shell.prototype.shoot = function() {
	var bullet = new EnemyBeam();
	bullet.x = this.x;
	bullet.y = this.y;
	this.parent.addChild(bullet);
}

Shell.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		this.destroy();
	}
}

Shell.prototype.destroy = function() {
	this.cooldown.stop();
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}