function Lightning(caster, receiver) {
	PIXI.Graphics.call(this);

    this.caster = caster;
    this.receiver = receiver;

    this.receiver.takeDamage(1);

    var self = this;

	this.timer = new Timer(function() {
		self.destroy();
	}, 500, 1);

    this.timer.start();
}

Lightning.prototype = Object.create(PIXI.Graphics.prototype);

Lightning.prototype.update = function() {
	this.clear();
	this.lineStyle(1, 0x5C98EF);

	var dist = Math.sqrt(Math.pow(this.caster.x - this.receiver.x, 2) + Math.pow(this.caster.y - this.receiver.y, 2));

	var numberOfSteps = dist / 15;
	var angle = Math.atan2(this.caster.y - this.receiver.y, this.caster.x - this.receiver.x);

	var stepInPixels = dist / numberOfSteps;

	for(var i = 0; i < 3; i++) {
		this.moveTo(this.caster.x, this.caster.y);

		for(var j = 1; j < numberOfSteps; j++) {
			var currentStepPos = stepInPixels * j;

			var offset = Math.floor(Math.random() * (1 + 25 - 10)) + 10;

			var xStepPos = this.caster.x - Math.cos(angle) * currentStepPos + Math.cos(angle + 1.55) * offset;
			var yStepPos = this.caster.y - Math.sin(angle) * currentStepPos + Math.sin(angle + 1.55) * offset;

			this.lineTo(xStepPos, yStepPos);
		}

		this.lineTo(this.receiver.x, this.receiver.y);
	}
}

Lightning.prototype.destroy = function() {
	this.parent.removeChild(this);
}