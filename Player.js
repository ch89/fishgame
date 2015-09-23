function Player() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/pinkfish.png'));
    this.anchor.x = .5;
    this.anchor.y = .5;
    this.x = 300;
    this.y = 150;
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

Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.update = function() {
    if(gamepad) {
        if(gamepad.stickMoved(GamepadSticks.LEFT_STICK_X, true)) {
            if (this.vx > -this.maxSpeed) {
                this.vx -= this.speed;
                if (this.vx < -this.maxSpeed) {
                    this.vx = -this.maxSpeed;
                }
            }  
        }
        else if(gamepad.stickMoved(GamepadSticks.LEFT_STICK_X)) {
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
        if (gamepad.stickMoved(GamepadSticks.LEFT_STICK_Y, true)) {
            if (this.vy > -this.maxSpeed) {
                this.vy -= this.speed;
                if (this.vy < -this.maxSpeed) {
                    this.vy = -this.maxSpeed;
                }
            }  
        }
        else if(gamepad.stickMoved(GamepadSticks.LEFT_STICK_Y)) {
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
        if(gamepad.buttonPressed(GamepadButtons.A) && !this.cooldown.running) {
            this.shoot();
        }
    }
    else {
        if(key.isDown(Keyboard.LEFT)) {
            if (this.vx > -this.maxSpeed) {
                this.vx -= this.speed;
                if (this.vx < -this.maxSpeed) {
                    this.vx = -this.maxSpeed;
                }
            }  
        }
        else if (key.isDown(Keyboard.RIGHT)) {
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
        if (key.isDown(Keyboard.UP)) {
            if (this.vy > -this.maxSpeed) {
                this.vy -= this.speed;
                if (this.vy < -this.maxSpeed) {
                    this.vy = -this.maxSpeed;
                }
            }  
        }
        else if (key.isDown(Keyboard.DOWN)) {
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
        if(key.isDown(Keyboard.A) && !this.cooldown.running) {
            this.shoot();
        }
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

Player.prototype.shoot = function() {
    var mud = new Mud(PIXI.Texture.fromFrame('images/purplemud.png'));
    mud.x = this.x + this.width / 2;
    mud.y = this.y - 17;
    this.parent.addChild(mud);
    this.cooldown.start();

    if(!muteSound) {
        new Audio('sounds/shoot.wav').play();
    }
}

Player.prototype.takeDamage = function(damage) {
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

Player.prototype.addLife = function(life) {
    this.life += life;

    if (this.life > this.maxLife) {
        this.life = this.maxLife;
    }

    this.healthBar.foreground.scale.x = this.life / this.maxLife;
    this.healthBar.text.setText(this.life + " / " + this.maxLife);
}

Player.prototype.destroy = function() {
    this.cooldown.stop();
    players.splice(players.indexOf(this), 1);
    this.parent.removeChild(this);
}