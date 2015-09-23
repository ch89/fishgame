function EnemyBullet(claw) {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/greenmud.png'));
	this.anchor.x = .5;
    this.anchor.y = .5;
    this.x = enemy.x + Math.cos(enemy.rotation) * 50;
    this.y = enemy.y + Math.sin(enemy.rotation) * 50;
    this.rotation = enemy.rotation;
    this.speed = 3;
    this.damage = 1;
	this.vx = Math.cos(this.rotation) * this.speed;
	this.vy = Math.sin(this.rotation) * this.speed;
}

EnemyBullet.prototype = Object.create(PIXI.Sprite.prototype);

EnemyBullet.prototype.update = function() {
	this.x += this.vx;
	this.y += this.vy;

	if(this.x < 0 || this.x > renderer.width || this.y < 0 || this.y > renderer.height) {
		this.destroy();
	}

	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			players[i].takeDamage(this.damage);
			this.destroy();
			updateScore(-1);
			break;
		}
	}
}

EnemyBullet.prototype.destroy = function() {
	this.parent.removeChild(this);
}