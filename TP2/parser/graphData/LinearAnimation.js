/**
 * @constructor
 */
function LinearAnimation(span, controlPoints) {
    Animation.call(this, span);
    this.controlPoints = this.parseControlPoints(controlPoints);
    this.totalDistance = 0;
    this.partialsDistances = [];
    for (var i = 0; i < (this.controlPoints.length - 1); i++) {
        var distance = this.calculateDistance(this.controlPoints[i], this.controlPoints[i + 1]);
        this.totalDistance += distance;
        this.partialsDistances.push(distance);
    }
    this.velocity = this.totalDistance / this.span;
}
LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;
LinearAnimation.prototype.getControlPoints = function() {
    return this.controlPoints;
}
LinearAnimation.prototype.setControlPoints = function(controlPoints) {
    this.controlPoints = controlPoints;
}
LinearAnimation.prototype.getTransformation = function(deltaTime) {
    var transf = mat4.create();
    if (deltaTime >= this.span) {
        mat4.translate(transf, transf, this.controlPoints[this.controlPoints.length - 1]);
        mat4.rotate(transf, transf, this.calculateAngle(this.controlPoints[this.controlPoints.length - 2], this.controlPoints[this.controlPoints.length - 1]), [0, 1, 0]);
        return transf;
    }
    var interPoint;
    var angle;
    var tempDistance = 0;
    for (var i = 0; i < this.partialsDistances; i++) {
        if (deltaTime <= (tempDistance / this.velocity)) {
            tempDistance += partialsDistances[i];
        } else {
            interPoint = this.calculateInterpolatePoint(this.controlPoints[i], this.controlPoints[i + 1], partialsDistances[i] - (tempDistance - (deltaTime * this.velocity)));
            angle = this.calculateAngle(this.controlPoints[i], this.controlPoints[i + 1]);
            break;
        }
    }
    mat4.translate(transf, transf, interPoint);
    mat4.rotate(transf, transf, angle, [0, 1, 0]);
    return transf;
}
LinearAnimation.prototype.parseControlPoints = function(cP) {
    var result = [];
    for (var i = 0; i < cP; i++) {
        result.push([cP[i].x, cP[i].y, cP[i].z]);
    }
    console.log(result);
    return result;
}
LinearAnimation.prototype.calculateDistance = function(p1, p2) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2));
}
LinearAnimation.prototype.calculateAngle = function(p1, p2) {
    return Math.atan2(p2[0] - p1[0], p2[2] - p1[2]);
}
LinearAnimation.prototype.calculateDistance = function(p1, p2, delta) {

var result = [];
	for (var i = 0; i < p1.length; i++)
	{
		result[i] = p1[i] * (1.0 - delta) + (p2[i] * delta);
	}
	return result; %%NAO ESTA BEM
}
