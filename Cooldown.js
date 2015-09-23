function Cooldown(delay) {
	this.delay = delay;
	this.running = false;
	this.id;
}

Cooldown.prototype.start = function() {
	if(!this.running) {
		this.running = true;
		var self = this;

		this.id = setTimeout(function() {
			self.running = false;
		}, this.delay);
	}
}

Cooldown.prototype.stop = function() {
	if(this.running) {
		this.running = false;
		clearTimeout(this.id);
	}
}