function GameOverMenu() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/bgmenu.png'));
    var self = this;

    this.input = document.createElement('input');
    this.input.classList.add('score'); 

    var title = new PIXI.Text("End of the game!", { font: "48px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
    title.anchor.x = .5;
    title.anchor.y = .5;
    title.x = renderer.width / 2;
    title.y = 50;
    this.addChild(title);

    this.scoreText = new PIXI.Text('', { font: "24px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
    this.scoreText.anchor.x = .5;
    this.scoreText.anchor.y = .5;
    this.scoreText.x = renderer.width / 2;
    this.scoreText.y = 100;
    this.addChild(this.scoreText);

    this.name = new PIXI.Text('Name: ', { font: "24px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
    this.name.x = 125;
    this.name.y = 125;
    this.addChild(this.name);

    this.errorMessage = new PIXI.Text('', { font: "18px Gloria Hallelujah", fill: 'red', stroke: "#000", strokeThickness: 4 });
    this.errorMessage.x = 400;
    this.errorMessage.y = 130;

    var saveButton = new Button('Save Score');
    saveButton.anchor.x = .5;
    saveButton.anchor.y = .5;
    saveButton.x = renderer.width / 2 - 75;
    saveButton.y = 250;
    this.addChild(saveButton);

    var mainMenuButton = new Button('Main Menu');
    mainMenuButton.anchor.x = .5;
    mainMenuButton.anchor.y = .5;
    mainMenuButton.x = renderer.width / 2 + 75;
    mainMenuButton.y = 250;
    this.addChild(mainMenuButton);

    this.ready = true;

    mainMenuButton.click = function() {
        if(self.ready) {
            self.clean();
        }
    }

    saveButton.click = function() {
        if(self.ready) {
            self.saveScore();
        }
    }
}

GameOverMenu.prototype = Object.create(PIXI.Sprite.prototype);

GameOverMenu.prototype.showScoreInput = function() {
    document.body.appendChild(this.input);
}

GameOverMenu.prototype.clean = function() {
    this.input.value = "";
    if(this.errorMessage.parent != null) {
        this.removeChild(this.errorMessage);
    }
    document.body.removeChild(this.input);
    stage.removeChild(this);
    stage.addChild(water);
    stage.addChild(mainMenu);
}

GameOverMenu.prototype.saveScore = function() {
    this.ready = false;
    var self = this;

    Ajax.post(
        'backend/setScore.php',
        {
            name: this.input.value,
            score: score
        },
        function(data) {
            self.ready = true;
            var score = JSON.parse(data);

            if(score.error) {
                self.errorMessage.setText(score.error);
                self.addChild(self.errorMessage);
            }
            else {
                self.clean();
            }
        }
    );
}