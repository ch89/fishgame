function Swordfish() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/swordfish.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 600;
	this.y = Math.random() * 200 + 50;

	this.speed = 1;
	this.life = 3 * players.length;
}

Swordfish.prototype = Object.create(PIXI.Sprite.prototype);

Swordfish.prototype.update = function() {
	this.x -= this.speed;

	if(this.x < 0) {
		this.destroy();
		return;
	}

	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			updateScore(-3);
			players[i].takeDamage(3);
			this.destroy();
			break;
		}
	}
}

Swordfish.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		updateScore(3);
		this.destroy();
	}
}

Swordfish.prototype.destroy = function() {
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}