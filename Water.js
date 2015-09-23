function Water() {
	PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/bgmenu.png'));

	// Pixel filter

	this.pixelateFilter = new PIXI.PixelateFilter();
	this.pixelateFilter.size.x = 5;
	this.pixelateFilter.size.y = 5;

	// Gray filter

	this.grayFilter = new PIXI.GrayFilter();
	this.grayFilter.gray = 1;

	// Blur filter

	this.blurFilter = new PIXI.BlurFilter();
	this.blurFilter.blurX = 15;
	this.blurFilter.blurY = 15;

	// Invert filter

	this.invertFilter = new PIXI.InvertFilter();
	this.invertFilter.invert = 1;

	// Dot filter

	this.dotScreenFilter = new PIXI.DotScreenFilter();
	this.dotScreenFilter.angle = 5;
	this.dotScreenFilter.scale = 1;

	// RGB splitter filter

	this.rgbSplitterFilter = new PIXI.RGBSplitFilter();

	// Cross hatch filter

	this.crossHatchFilter = new PIXI.CrossHatchFilter();

	// Twist filter

	this.twistFilter = new PIXI.TwistFilter();
	this.twistFilter.angle = 0;
	this.twistFilter.radius = .5;
	this.twistFilter.offset.x = .5;
	this.twistFilter.offset.y = .5;

	// Displacement filter

	this.count = 0;

	this.displacementTexture = PIXI.Texture.fromFrame('images/displacementMap.jpg');
	this.displacementFilter = new PIXI.DisplacementFilter(this.displacementTexture);
	this.displacementFilter.scale.x = 15;
	this.displacementFilter.scale.y = 15;

	//this.filters = [this.displacementFilter];

	var self = this;
}

Water.prototype = Object.create(PIXI.Sprite.prototype);

/*
Water.prototype.update = function() {
	this.count += .1;

	this.displacementFilter.offset.x = this.count * 5;
	this.displacementFilter.offset.y = this.count * 5;
}
*/

Water.prototype.destroy = function() {
	this.count = 0;

	while(this.children.length > 0) {
		this.removeChildAt(0);
	}

    this.parent.removeChild(this);
}