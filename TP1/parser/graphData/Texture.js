/**
 * @constructor
 */
function Texture(file, s, t) {
	this.file = file;
	this.s = s;
	this.t = t;
}

Texture.prototype.constructor = Texture;

Texture.prototype.getFile = function(){
	return this.file;
}

Texture.prototype.getS = function(){
	return this.s;
}

Texture.prototype.getT = function(){
	return this.t;
}