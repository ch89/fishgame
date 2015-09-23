function Mussle() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/crab.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 500;
	this.y = 265;

	this.life = 5;
	this.speed = 1;

	this.scale.x = .5;
	this.scale.y = .5;

	this.distance;
	this.target;
	this.easing = .05;

	this.claw;
	this.createClaw();

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 2000);
	this.cooldown.start();
}

Mussle.prototype = Object.create(PIXI.Sprite.prototype);

Mussle.prototype.createClaw = function() {
	this.claw = new PIXI.Sprite(PIXI.Texture.fromFrame('images/claw.png'));
    this.claw.anchor.y = .5;
    this.claw.x = -40;
    this.claw.y = 10;
    this.claw.rotation = Math.PI;
    this.addChild(this.claw);
}

Mussle.prototype.update = function() {
	this.x -= this.speed;

    if(this.x < 0) {
		this.destroy();
		return;
	}

    for(var i = 0; i < players.length; i++) {
    	var player = players[i];

    	if(this.hitTest(player)) {
			player.takeDamage(3);
			this.destroy();
			updateScore(-3);
			return;
		}

    	var distance = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));

    	if(i == 0 || distance < this.distance) {
    		this.distance = distance;
    		this.target = player;
    	}
    }

    if(this.target) {
    	var targetRotation = Math.atan2(this.target.y - this.y, this.target.x - this.x);

	    if(targetRotation > this.claw.rotation + Math.PI) {
			targetRotation -= 2 * Math.PI;
	    }
	    if(targetRotation < this.claw.rotation - Math.PI) {
			targetRotation += 2 * Math.PI;
	    }

	    this.claw.rotation += (targetRotation - this.claw.rotation) * this.easing;

	    if(this.claw.rotation > (3 * Math.PI) / 2) {
			this.claw.rotation = (3 * Math.PI) / 2;
		}
		else if(this.claw.rotation < Math.PI) {
			this.claw.rotation = Math.PI;
		}
	}
}

Mussle.prototype.shoot = function() {
	this.parent.addChild(new EnemyBullet(this.claw));
}

Mussle.prototype.takeDamage = function(damage) {
	this.life -= damage;

	if(this.life <= 0) {
		this.destroy();
	}
}

Mussle.prototype.destroy = function() {
	enemies.splice(enemies.indexOf(this), 1);
	this.parent.removeChild(this);
}