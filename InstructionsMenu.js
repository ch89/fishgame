function InstructionsMenu() {
	PIXI.DisplayObjectContainer.call(this);

	var title = new PIXI.Text("Instructions", { font: "48px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	title.anchor.x = .5;
	title.anchor.y = .5;
	title.x = renderer.width / 2;
	title.y = 50;
	this.addChild(title);

	var controls = new PIXI.Text("Move with arrows and shoot with A.", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	controls.anchor.x = .5;
	controls.anchor.y = .5;
	controls.x = 300;
	controls.y = 100;
	this.addChild(controls);

	var mute = new PIXI.Text("Mute sound and music with M.", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	mute.anchor.x = .5;
	mute.anchor.y = .5;
	mute.x = 300;
	mute.y = 150;
	this.addChild(mute);

	var exit = new PIXI.Text("Exit game with escape.", { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	exit.anchor.x = .5;
	exit.anchor.y = .5;
	exit.x = 300;
	exit.y = 200;
	this.addChild(exit);

	var mainMenuButton = new Button('Main Menu');
	mainMenuButton.anchor.x = .5;
	mainMenuButton.anchor.y = .5;
	mainMenuButton.x = renderer.width / 2;
	mainMenuButton.y = 250;
	this.addChild(mainMenuButton);

	var self = this;

	mainMenuButton.click = function() {
		stage.removeChild(self);
		stage.addChild(mainMenu);
	}
}

InstructionsMenu.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);