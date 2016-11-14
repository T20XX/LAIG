/**
 * @constructor
 */
function CircularAnimation(span, centerX, centerY, centerZ, radius, startAng, rotAng) {
    Animation.call(this, span);

    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.radius = radius;
    this.startAng = startAng;
    this.rotAng = rotAng;
}

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.getCenterX=function() 
{
	return this.centerX;
};

CircularAnimation.prototype.getCenterY=function() 
{
	return this.centerY;
};

CircularAnimation.prototype.getCenterZ=function() 
{
	return this.centerZ;
};

CircularAnimation.prototype.getRadius=function() 
{
	return this.radius;
};

CircularAnimation.prototype.getStartAng=function() 
{
	return this.starAang;
};

CircularAnimation.prototype.getRotAng=function() 
{
	return this.rotAng;
};

CircularAnimation.prototype.getTransformation = function(deltaTime){
	return 0;
	
}
