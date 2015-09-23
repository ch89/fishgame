function Rocket() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/rocket.png'));

	this.anchor.x = .5;
    this.anchor.y = .5;

    this.speed = 2;
    this.damage = 1;

    var self = this;

    this.timer = new Timer(function() {
        self.explode();
    }, Math.random() * 3000 + 1000, 1);
    this.timer.start();
}

Rocket.prototype = Object.create(PIXI.Sprite.prototype);

Rocket.prototype.update = function () {
    this.x -= this.speed;

	if(this.x < 0) {
		this.destroy();
	}

	for(var i = 0; i < players.length; i++) {
		if(this.hitTest(players[i])) {
			players[i].takeDamage(this.damage);
			this.destroy();
			updateScore(-3);
			break;
		}
	}
}

Rocket.prototype.explode = function() {
    for(var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 4) {
        var missile = new Missile(angle);
        missile.x = this.x;
        missile.y = this.y;
        missile.rotation = angle;
        this.parent.addChild(missile);
    }
    this.destroy();
}

Rocket.prototype.destroy = function () {
    this.timer.stop();
	this.parent.removeChild(this);
}