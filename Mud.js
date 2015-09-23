function Mud(texture) {
	PIXI.Sprite.call(this, texture);
	this.anchor.x = .5;
    this.anchor.y = .5;
	this.speed = 5;
	this.damage = 1;
}

Mud.prototype = Object.create(PIXI.Sprite.prototype);

Mud.prototype.update = function() {
	this.x += this.speed;

	if(this.x > renderer.width) {
		this.destroy();
		return;
	}

	for(var i = 0; i < enemies.length; i++) {
		if(this.hitTest(enemies[i])) {
			enemies[i].takeDamage(this.damage);
			this.destroy();
			break;
		}
	}
}

Mud.prototype.destroy = function() {
	this.parent.removeChild(this);
}