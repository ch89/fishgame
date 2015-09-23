function Shark() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/shark.png'));
	this.anchor.x = .5;
    this.anchor.y = .5;

    this.x = renderer.width;
    this.y = renderer.height / 2;

    this.angle = 0;
	this.speed = 1;
	this.life = 50 * players.length;
	this.maxLife = this.life;
	this.center = renderer.height / 2;

    var self = this;

    this.cooldown = new Timer(function() {
        self.shoot();
    }, 5000);
    this.cooldown.start();
}

Shark.prototype = Object.create(PIXI.Sprite.prototype);

Shark.prototype.update = function () {
    if (this.x > 500) {
        this.x -= this.speed;
    }

	this.y = this.center + Math.sin(this.angle) * 50;
	this.angle += .03;
}

Shark.prototype.shoot = function () {
    var rocket = new Rocket();
    rocket.x = this.x;
    rocket.y = this.y;
    this.parent.addChild(rocket);
}

Shark.prototype.takeDamage = function (damage) {
	this.life -= damage;

	if (this.life <= 0) {
	    this.life = 0;
	    this.destroy();
	    updateScore(100);
        gameOverTimer.start();
	}

	bossHealthBar.foreground.scale.x = this.life / this.maxLife;
	bossHealthBar.text.setText(this.life + " / " + this.maxLife);
}

Shark.prototype.destroy = function () {
    this.cooldown.stop();
    enemies.splice(enemies.indexOf(this), 1);
    this.parent.removeChild(this);
}