function Worm() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/worm.png'));
	
	this.anchor.x = .5;
    this.anchor.y = .5;
    
    this.speed = 1;
    this.power = 5;
}

Worm.prototype = Object.create(PIXI.Sprite.prototype);

Worm.prototype.update = function () {
    this.x -= this.speed;
    this.rotation += .01;

	if(this.x < 0) {
		this.destroy();
	}

	for(var i = 0; i < players.length; i++) {
	    if (this.hitTest(players[i])) {
	        players[i].addLife(this.power);
			this.destroy();
			break;
		}
	}
}

Worm.prototype.destroy = function () {
	this.parent.removeChild(this);
}