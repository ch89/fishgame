function OptionsMenu() {
	PIXI.DisplayObjectContainer.call(this);

	var title = new PIXI.Text("Options", { font: "48px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	title.anchor.x = .5;
	title.anchor.y = .5;
	title.x = renderer.width / 2;
	title.y = 50;
	this.addChild(title);

	var difficulty = new PIXI.Text("Difficulty:", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	difficulty.anchor.x = .5;
	difficulty.anchor.y = .5;
	difficulty.x = 200;
	difficulty.y = 100;
	this.addChild(difficulty);

	var easy = new PIXI.Text("Easy", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	easy.anchor.x = .5;
	easy.anchor.y = .5;
	easy.x = 275;
	easy.y = 100;
	easy.interactive = true;
	easy.buttonMode = true;
	this.addChild(easy);

	var hard = new PIXI.Text("Hard", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	hard.anchor.x = .5;
	hard.anchor.y = .5;
	hard.x = 350;
	hard.y = 100;
	hard.interactive = true;
	hard.buttonMode = true;
	this.addChild(hard);

	var line = new PIXI.Sprite(PIXI.Texture.fromFrame('images/line.png'));
	line.anchor.x = .5;
	line.anchor.y = .5;
	line.x = easy.x;
	line.y = 125;
	this.addChild(line);

	var onePlayer = new PIXI.Text("One Player", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	onePlayer.anchor.x = .5;
	onePlayer.anchor.y = .5;
	onePlayer.x = 225;
	onePlayer.y = 150;
	onePlayer.interactive = true;
	onePlayer.buttonMode = true;
	this.addChild(onePlayer);

	var twoPlayers = new PIXI.Text("Two Players", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	twoPlayers.anchor.x = .5;
	twoPlayers.anchor.y = .5;
	twoPlayers.x = 375;
	twoPlayers.y = 150;
	twoPlayers.interactive = true;
	twoPlayers.buttonMode = true;
	this.addChild(twoPlayers);

	var playerLine = new PIXI.Sprite(PIXI.Texture.fromFrame('images/line.png'));
	playerLine.anchor.x = .5;
	playerLine.anchor.y = .5;
	playerLine.x = onePlayer.x;
	playerLine.y = 175;
	this.addChild(playerLine);

	var mainMenuButton = new Button('Main Menu');
	mainMenuButton.anchor.x = .5;
	mainMenuButton.anchor.y = .5;
	mainMenuButton.x = renderer.width / 2;
	mainMenuButton.y = 250;
	this.addChild(mainMenuButton);

	var self = this;

	easy.click = function() {
		line.x = easy.x;
	}

	hard.click = function() {
		line.x = hard.x;
	}

	onePlayer.click = function() {
		playerLine.x = onePlayer.x;
		numPlayers = 1;
	}

	twoPlayers.click = function() {
		playerLine.x = twoPlayers.x;
		numPlayers = 2;
	}

	mainMenuButton.click = function() {
		stage.removeChild(self);
		stage.addChild(mainMenu);
	}
}

OptionsMenu.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);