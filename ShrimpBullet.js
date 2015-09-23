function ShrimpBullet() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/throwstar.png'));
	
	this.anchor.x = .5;
    this.anchor.y = .5;
    
    this.speed = 5;
    this.damage = 1;
}

ShrimpBullet.prototype = Object.create(PIXI.Sprite.prototype);

ShrimpBullet.prototype.update = function () {
    this.x -= this.speed;

	if(this.x < 0) {
		this.destroy();
		return;
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

ShrimpBullet.prototype.destroy = function () {
	this.parent.removeChild(this);
}