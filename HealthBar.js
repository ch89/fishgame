function HealthBar(x, y) {
    PIXI.DisplayObjectContainer.call(this);

    this.x = x;
    this.y = y;
    var width = 75;
    var height = 10;

    this.background = new PIXI.Graphics();
    this.background.beginFill(0xFF0000);
    this.background.drawRect(0, 0, width, height);
    this.background.endFill();
    this.addChild(this.background);

    this.foreground = new PIXI.Graphics();
    this.foreground.beginFill(0x008000);
    this.foreground.drawRect(0, 0, width, height);
    this.foreground.endFill();
    this.addChild(this.foreground);

    this.border = new PIXI.Graphics();
    this.border.lineStyle(2, 0x000000, 1);
    this.border.drawRect(0, 0, width, height);
    this.addChild(this.border);

    this.text = new PIXI.Text(0 + " / " + 0, { font: "12px Gloria Hallelujah", fill: "#FFFFFF", align: "left", stroke: "#000000", strokeThickness: 4 });
    this.text.y = height;
    this.addChild(this.text);
}

HealthBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);