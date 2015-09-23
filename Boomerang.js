function Boomerang(boss) {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/boomerang3.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.scale.x = .75;
	this.scale.y = .75;

	this.boss = boss;
	this.speed = 4;
	this.damage = 1;
	this.back = false;
}

Boomerang.prototype = Object.create(PIXI.Sprite.prototype);

Boomerang.prototype.update = function() {
	this.rotation -= .1;

	if(this.back) {
		var angle = Math.atan2(this.boss.y - this.y, this.boss.x - this.x);
		this.x += Math.cos(angle) * this.speed;
		this.y += Math.sin(angle) * this.speed;

		if(this.hitTest(this.boss)) {
			this.destroy();
			return;
		}
	}
	else {
		this.x -= this.speed;

		if(this.x < 50) {
			this.back = true;
		}
	}

	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			players[i].takeDamage(this.damage);
			this.destroy();
			break;
		}
	}
}

Boomerang.prototype.destroy = function() {
	this.parent.removeChild(this);
}