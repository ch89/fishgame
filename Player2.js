function Player2() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/greenfish.png'));
    this.anchor.x = .5;
    this.anchor.y = .5;
    this.x = 300;
    this.y = 200;
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = 2;
    this.friction = .95;
    this.speed = .15;
    this.life = 15;
    this.maxLife = this.life;
    this.healthBar;
    this.cooldown = new Cooldown(300);
}

Player2.prototype = Object.create(PIXI.Sprite.prototype);

Player2.prototype.update = function() {
    if(key.isDown(Keyboard.J)) {
        if (this.vx > -this.maxSpeed) {
            this.vx -= this.speed;
            if (this.vx < -this.maxSpeed) {
                this.vx = -this.maxSpeed;
            }
        }  
    }
    else if (key.isDown(Keyboard.L)) {
        if (this.vx < this.maxSpeed) {
            this.vx += this.speed;
            if (this.vx > this.maxSpeed) {
                this.vx = this.maxSpeed;
            }
        }
    }
    else {
        this.vx *= this.friction;
    }
    if (key.isDown(Keyboard.I)) {
        if (this.vy > -this.maxSpeed) {
            this.vy -= this.speed;
            if (this.vy < -this.maxSpeed) {
                this.vy = -this.maxSpeed;
            }
        }  
    }
    else if (key.isDown(Keyboard.K)) {
        if (this.vy < this.maxSpeed) {
            this.vy += this.speed;
            if (this.vy > this.maxLife) {
                this.vy = this.maxSpeed;
            }
        }
    }
    else {
        this.vy *= this.friction;
    }
    if(key.isDown(Keyboard.S) && !this.cooldown.running) {
        this.shoot();
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 + this.width / 2) {
        this.x = 0 + this.width / 2;
        this.vx = 0;
    }
    else if (this.x > renderer.width - this.width / 2) {
        this.x = renderer.width - this.width / 2;
        this.vx = 0;
    }
    if (this.y < 0 + this.height / 2) {
        this.y = 0 + this.height / 2;
        this.vy = 0;
    }
    else if (this.y > renderer.height - this.height / 2) {
        this.y = renderer.height - this.height / 2;
        this.vy = 0;
    }
}

Player2.prototype.shoot = function() {
    var mud = new Mud(PIXI.Texture.fromFrame('images/greenmud.png'));
    mud.x = this.x + this.width / 2;
    mud.y = this.y - 17;
    this.parent.addChild(mud);
    this.cooldown.start();
}

Player2.prototype.takeDamage = function(damage) {
    this.life -= damage;

    if(this.life <= 0) {
        this.life = 0;
        this.destroy();

        if(players.length == 0) {
            gameOverTimer.start();
        }
    }

    this.healthBar.foreground.scale.x = this.life / this.maxLife;
    this.healthBar.text.setText(this.life + " / " + this.maxLife);
}

Player2.prototype.addLife = function(life) {
    this.life += life;

    if (this.life > this.maxLife) {
        this.life = this.maxLife;
    }

    this.healthBar.foreground.scale.x = this.life / this.maxLife;
    this.healthBar.text.setText(this.life + " / " + this.maxLife);
}

Player2.prototype.destroy = function() {
    this.cooldown.stop();
    players.splice(players.indexOf(this), 1);
    this.parent.removeChild(this);
}