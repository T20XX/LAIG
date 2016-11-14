/**
 * @constructor
 */
function LinearAnimation(span, controlPoints) {
    Animation.call(this, span);
	
	this.controlPoints = controlPoints;
	
}

LinearAnimation.prototype.constructor = Object.create(Animation.prototype);

LinearAnimation.prototype.getControlPoints = function(){
    return this.controlPoints;
}

LinearAnimation.prototype.setControlPoints = function(controlPoints){
    this.controlPoints = controlPoints;
}