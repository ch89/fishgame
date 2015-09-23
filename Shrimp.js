function Shrimp() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/shrimp.png'));
	this.anchor.x = .5;
    this.anchor.y = .5;

    this.x = renderer.width;
    this.y = Math.random() * renderer.height;

    this.angle = 0;
	this.speed = 1;
	this.life = 3 * players.length;
	this.center = this.y;

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 1500);
	
	this.cooldown.start();
}

Shrimp.prototype = Object.create(PIXI.Sprite.prototype);

Shrimp.prototype.update = function() {
    this.x -= this.speed;

	if(this.x < 0) {
		this.destroy();
	}

	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			players[i].takeDamage(3);
			this.destroy();
			break;
		}
	}

	this.y = this.center + Math.sin(this.angle) * 50;
	this.angle += .03;
}

Shrimp.prototype.shoot = function () {
    var shrimpBullet = new ShrimpBullet();
    shrimpBullet.x = this.x - shrimpBullet.width;
    enemyBeam.y = this.y;
    this.parent.addChild(shrimpBullet);
}

Shrimp.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
	    updateScore(5);
	    this.destroy();
	}
}

Shrimp.prototype.destroy = function () {
	this.cooldown.stop();
    enemies.splice(enemies.indexOf(this), 1);
    this.parent.removeChild(this);
}