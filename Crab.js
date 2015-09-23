function Crab() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/crab.png'));

	this.anchor.x = .5;
	this.anchor.y = .5;

	this.x = 700;
	this.y = 250;

	this.life = 100;
	this.maxLife = this.life;
	this.speed = 8;
	this.range = 400;
	this.hookedPlayer;
	this.state = "aim";
	this.target;
	this.distance;

	var self = this;

	this.cooldown = new Timer(function() {
		self.shoot();
	}, 5000);
	this.cooldown.start();
}

Crab.prototype = Object.create(PIXI.Sprite.prototype);

Crab.prototype.createClaw = function() {
	this.claw = new PIXI.Sprite(PIXI.Texture.fromFrame('images/claw.png'));
    this.claw.anchor.y = .5;
    this.claw.x = this.x - 35;
    this.claw.y = this.y + 15;
    this.claw.rotation = Math.PI;
    main.addChild(this.claw);
}

Crab.prototype.createRod = function() {
	this.rod = new PIXI.Graphics();
	main.addChild(this.rod);
}

Crab.prototype.shoot = function() {
	this.vx = Math.cos(this.claw.rotation) * this.speed;
	this.vy = Math.sin(this.claw.rotation) * this.speed;
	this.dx = Math.cos(this.claw.rotation) * 50;
	this.dy = Math.sin(this.claw.rotation) * 50;
	this.state = 'shoot';
}

Crab.prototype.update = function() {
	if(this.x > 500) {
		this.x -= 1;
		this.claw.x = this.x - 35;
	}

	if(this.state == 'aim') {
		for(var i = 0; i < players.length; i++) {
			var dis = Math.sqrt(Math.pow(players[i].x - this.x, 2) + Math.pow(players[i].y - this.y, 2));
			
			if(i == 0 || dis < this.distance) {
				this.distance = dis;
				this.target = players[i];
			}
		}

		var targetRot = Math.atan2(this.target.y - this.y, this.target.x - this.x);

		if(targetRot > this.claw.rotation + Math.PI) targetRot -= 2 * Math.PI;
		if(targetRot < this.claw.rotation - Math.PI) targetRot += 2 * Math.PI; 

		this.claw.rotation += (targetRot - this.claw.rotation) * .1;
	}
	else if(this.state == 'shoot') {
		this.claw.x += this.vx;
		this.claw.y += this.vy;

		if(Math.sqrt(Math.pow(this.x - this.claw.x, 2) + Math.pow(this.y - this.claw.y, 2)) >= this.range) {
			this.state = 'back';
			return;
		}

		for(var i = 0; i < players.length; i++) {
			if(players[i].hitTestPoint(this.claw.x + this.dx, this.claw.y + this.dy)) {
				this.hookedPlayer = players[i];
				this.state = 'back';
				break;
			}	
		}

		/*
		this.rod.clear();
		this.rod.lineStyle(3, 0x000000);
		this.rod.moveTo(this.x, this.y);
		this.rod.lineTo(this.claw.x, this.claw.y);
		*/
	}
	else {
		//this.rod.clear();

		this.claw.x -= this.vx;
		this.claw.y -= this.vy;

		if(this.hookedPlayer) {
			this.hookedPlayer.x = this.claw.x + this.dx;
			this.hookedPlayer.y = this.claw.y + this.dy;
		}

		if(this.claw.hitTestPoint(this.x, this.y)) {
			this.claw.x = this.x - 35;
			this.claw.y = this.y + 15;
			this.hookedPlayer = null;
			this.state = 'aim';
		}
		else {
			/*
			this.rod.lineStyle(3, 0x000000);
			this.rod.moveTo(this.x, this.y);
			this.rod.lineTo(this.claw.x, this.claw.y);
			*/
		}
	}
}

Crab.prototype.takeDamage = function(damage) {
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

Crab.prototype.destroy = function() {
	this.cooldown.stop();
	enemies.splice(enemies.indexOf(this), 1);
	//this.parent.removeChild(this.rod);
	this.parent.removeChild(this.claw);
	this.parent.removeChild(this);
}