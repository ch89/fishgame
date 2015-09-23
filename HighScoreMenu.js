function HighScoreMenu() {
	PIXI.DisplayObjectContainer.call(this);
	var self = this;

	this.scores = new PIXI.DisplayObjectContainer();
	this.addChild(this.scores)

	var title = new PIXI.Text("High Score", { font: "48px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
	title.anchor.x = .5;
	title.anchor.y = .5;
	title.x = renderer.width / 2;
	title.y = 50;
	this.addChild(title);

	var mainMenuButton = new Button('Main Menu');
	mainMenuButton.x = renderer.width / 2;
	mainMenuButton.y = 250;
	this.addChild(mainMenuButton);

	mainMenuButton.click = function() {
		while(self.scores.children.length > 0) {
			self.scores.removeChildAt(0);
		}
		stage.removeChild(self);
		stage.addChild(mainMenu);
	}
}

HighScoreMenu.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

HighScoreMenu.prototype.getScores = function() {
	var self = this;

	Ajax.get('backend/getScore.php', function(data) {
		var scores = JSON.parse(data);

		for(var i = 0; i < scores.length; i++) {
			var score = new PIXI.Text("Name: " + scores[i].name + ", Score: " + scores[i].points, { font: "18px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
			score.anchor.x = .5;
			score.anchor.y = .5;
			score.x = renderer.width / 2;
			score.y = 25 * i + 100;
			self.scores.addChild(score);
		}
	})
}