function SeekingMissile() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/seekingrocket.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.vx = 0;
	this.vy = 0;
	this.speed = 2;
	this.turnRate = .1;

	this.life = 3;
}

SeekingMissile.prototype = Object.create(PIXI.Sprite.prototype);

SeekingMissile.prototype.update = function() {
	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			players[i].takeDamage(1);
			this.destroy();
			updateScore(-1);
			return;
		}
	}

	if(players[0]) {
		var dx = players[0].x - this.x;
		var dy = players[0].y - this.y;

		var dist = Math.sqrt(dx * dx + dy * dy);

		var moveX = this.turnRate * dx / dist;
		var moveY = this.turnRate * dy / dist;

		this.vx += moveX;
		this.vy += moveY;

		var moveDist = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

		this.vx = this.speed * this.vx / moveDist;
		this.vy = this.speed * this.vy / moveDist;

		this.x += this.vx;
		this.y += this.vy;

		this.rotation = Math.atan2(this.vy, this.vx);
	}
	else {
		this.x += this.vx;
		this.y += this.vy;
	}
}

SeekingMissile.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		this.destroy();
	}
}

SeekingMissile.prototype.destroy = function() {
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}