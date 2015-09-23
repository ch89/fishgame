function Main() {
	PIXI.DisplayObjectContainer.call(this);

	var invertFilter = new PIXI.InvertFilter();
	invertFilter.invert = 1;

	//this.filters = [invertFilter];
}

Main.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);