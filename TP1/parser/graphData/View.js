/**
 * @constructor
 */
function View(near, far, angle, fromVec, toVec) {
	this.near = near;
	this.far = far;
	this.angle = angle;
	this.fromVec = fromVec;
	this.toVec = toVec;
}

View.prototype.constructor = View;

View.prototype.getNear = function(){
	return this.near;
}

View.prototype.getFar = function(){
	return this.far;
}

View.prototype.getAngle = function(){
	return this.angle;
}

View.prototype.getFromVec = function(){
	return this.fromVec;
}

View.prototype.getToVec = function(){
	return this.toVec;
}