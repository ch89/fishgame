function MainMenu() {
	PIXI.DisplayObjectContainer.call(this);

	var title = new PIXI.Text("The fish game!", { font: "48px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	title.anchor.x = .5;
	title.anchor.y = .5;
	title.x = renderer.width / 2;
	title.y = 50;
	this.addChild(title);

	var playButton = new Button('Play');
	playButton.x = renderer.width / 2;
	playButton.y = 125;
	this.addChild(playButton);

	var highScoreButton = new Button('High Score');
	highScoreButton.x = renderer.width / 2;
	highScoreButton.y = 175;
	this.addChild(highScoreButton);

	var optionsButton = new Button('Options');
	optionsButton.x = renderer.width / 2;
	optionsButton.y = 225;
	this.addChild(optionsButton);

	var instructionsButton = new Button('Instructions');
	instructionsButton.x = renderer.width / 2;
	instructionsButton.y = 275;
	this.addChild(instructionsButton);

	playButton.click = function() {
		water.destroy();
		stage.removeChild(self);
		newGame();
	}

	var self = this;

	highScoreButton.click = function() {
		stage.removeChild(self);
		stage.addChild(highScoreMenu);
		highScoreMenu.getScores();
	}

	optionsButton.click = function() {
		stage.removeChild(self);
		stage.addChild(optionsMenu);
	}

	instructionsButton.click = function() {
		stage.removeChild(self);
		stage.addChild(instructionsMenu);
	}
}

MainMenu.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);