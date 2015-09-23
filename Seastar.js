function Seastar() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/seastar.png'));
	
	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 600;
	this.y = 150;

	this.life = 100;
	this.maxLife = this.life;

	this.stars = [];
	this.speed = .01;
	this.radius = 60;

	var self = this;

	this.timer = new Timer(function() {
		self.expand();
	}, 5000, 1);
	this.timer.start();

	this.createStars();

	this.scale.x = .75;
	this.scale.y = .75;
}

Seastar.prototype = Object.create(PIXI.Sprite.prototype);

Seastar.prototype.update = function() {
	if(this.x > 300) {
		this.x -= 1;
	}

	for(var i = 0; i < this.stars.length; i++) {
		var star = this.stars[i];

		star.x = this.x + Math.cos(star.angle) * this.radius;
		star.y = this.y + Math.sin(star.angle) * this.radius;
		star.rotation = Math.atan2(star.y - this.y, star.x - this.x);
		star.angle += .015;
	}
}

Seastar.prototype.createStars = function() {
	for(var angle = 0; angle < 2 * Math.PI; angle += Math.PI / 6) {
		var star = new Star(angle);
		enemies.push(star);
		this.stars.push(star);
		main.addChild(star);
	}
}

Seastar.prototype.expand = function() {
	var self = this;
	
	var tween = new TweenMax(this, 3, { radius: 250, ease: Sine.easeInOut, onComplete: function() {
		tween.reverse();
	}, onReverseComplete: function() {
		self.timer.start();
	} });
}

Seastar.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		this.life = 0;
		this.destroy();
		updateScore(100);
		gameOverTimer.start();
	}

	bossHealthBar.foreground.scale.x = this.life / this.maxLife;
	bossHealthBar.text.setText(this.life + " / " + this.maxLife);
}

Seastar.prototype.destroy = function() {
	this.timer.stop();

	for (var i = this.stars.length - 1; i >= 0; i--) {
		this.stars[i].destroy();
	}

	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}