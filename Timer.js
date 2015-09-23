function Timer(callback, delay, repeatCount) {
	this.callback = callback;
	this.delay = delay;
	this.repeatCount = repeatCount || 0;
	this.id = null;
	this.running = false;
	this.currentCount = 0;
}

Timer.prototype.start = function() {
	if(!this.running) {
		this.running = true;
		var self = this;

		this.id = setInterval(function() {
			self.currentCount++;
			self.callback();

			if(self.currentCount == self.repeatCount) {
				self.stop();
			}
		}, this.delay);
	}
}

Timer.prototype.stop = function() {
	if(this.running) {
		this.running = false;
		this.currentCount = 0;
		clearInterval(this.id);
	}
}