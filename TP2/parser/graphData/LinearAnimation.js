/**
 * @constructor
 */
function LinearAnimation(span, controlPoints) {
    Animation.call(this, span);
	
	this.controlPoints = controlPoints;
	this.totalDistance = 0;
	this.partialsDistances = [];
	for(var i = 0; i < (this.controlPoints.length - 1); i++){
		var distance = this.calculateDistance(this.controlPoints[i],this.controlPoints[i+1]);
		this.totalDistance += distance;
		this.partialsDistances.push(distance);
	}
	this.velocity = this.totalDistance / this.span;
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.getControlPoints = function(){
    return this.controlPoints;
}

LinearAnimation.prototype.setControlPoints = function(controlPoints){
    this.controlPoints = controlPoints;
}


LinearAnimation.prototype.calculateDistance = function(p1, p2) {
	return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
}