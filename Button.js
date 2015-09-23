function Button(text) {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/button.png'));
	
	this.anchor.x = .5;
	this.anchor.y = .5;
	this.interactive = true;
	this.buttonMode = true;
	
	var style = { font: '18px Gloria Hallelujah', fill: 'White', stroke: "Black", strokeThickness: 4 };
	var buttonText = new PIXI.Text(text, style);
	buttonText.anchor.x = .5;
	buttonText.anchor.y = .5;
	this.addChild(buttonText);

	this.mouseover = function() {
		style.fill = 'Yellow';
		buttonText.setStyle(style);
	}

	this.mouseout = function() {
		style.fill = 'White';
		buttonText.setStyle(style);
	}
}

Button.prototype = Object.create(PIXI.Sprite.prototype);