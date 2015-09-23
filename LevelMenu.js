function LevelMenu() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/bgmenu.png'));
    var self = this;

    this.title = new PIXI.Text('', { font: "48px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
    this.title.anchor.x = .5;
    this.title.anchor.y = .5;
    this.title.x = renderer.width / 2;
    this.title.y = 50;
    this.addChild(this.title);

    this.scoreText = new PIXI.Text('', { font: "24px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
    this.scoreText.anchor.x = .5;
    this.scoreText.anchor.y = .5;
    this.scoreText.x = renderer.width / 2;
    this.scoreText.y = 125;
    this.addChild(this.scoreText);

    this.lives = new PIXI.Text('', { font: "24px Gloria Hallelujah", fill: '#FFF', stroke: "#000", strokeThickness: 4 });
    this.lives.anchor.x = .5;
    this.lives.anchor.y = .5;
    this.lives.x = renderer.width / 2;
    this.lives.y = 150;
    this.addChild(this.lives);

    var continueButton = new Button('Continue');
    continueButton.anchor.x = .5;
    continueButton.anchor.y = .5;
    continueButton.x = renderer.width / 2;
    continueButton.y = 250;
    this.addChild(continueButton);

    var self = this;

    continueButton.click = function() {
        stage.removeChild(self);
        if(lives == 0) {
            stage.addChild(water);
            stage.addChild(mainMenu);
        }
        else if(isGameOver) {
            gameOverMenu.scoreText.setText("Final score: " + score);
            stage.addChild(gameOverMenu);
            gameOverMenu.showScoreInput();
        }
        else {
            startGame();
        }  
    }    
}

LevelMenu.prototype = Object.create(PIXI.Sprite.prototype);