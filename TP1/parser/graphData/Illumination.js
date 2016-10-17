/**
 * @constructor
 */
function Illumination(doublesided, local, ambient, background) {
	this.doublesided = doublesided;
	this.local = local;
	this.ambient = ambient;
	this.background = background;
}

Illumination.prototype.constructor = Illumination;

Illumination.prototype.getDoubleSided = function(){
	return this.doublesided;
}

Illumination.prototype.getLocal = function(){
	return this.local;
}

Illumination.prototype.getAmbient = function(){
	return this.ambient;
}

Illumination.prototype.getBackground = function(){
	return this.background;
}