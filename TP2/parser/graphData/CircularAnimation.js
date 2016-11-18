/**
 * @constructor
 */
function CircularAnimation(span, centerX, centerY, centerZ, radius, startAng, rotAng) {
    Animation.call(this, span);

    this.centerX = centerX;
    this.centerY = centerY;
    this.centerZ = centerZ;
    this.radius = radius;
    this.startAng = startAng*Math.PI/180;
    this.rotAng = rotAng*Math.PI/180;
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
    var transf = mat4.create();

	mat4.translate(transf, transf, vec3.fromValues(this.centerX, this.centerY, this.centerZ));
	if (deltaTime > this.span)
		mat4.rotate(transf, transf, this.startAng + this.rotAng, [0, 1, 0]);
	else
		mat4.rotate(transf, transf, this.startAng + (deltaTime / this.span) * this.rotAng, [0, 1, 0]);

	mat4.translate(transf, transf, [this.radius, 0, 0]);
	/*if(this.rotAng > 0)
		mat4.rotate(transf, transf, Math.PI/2, [0, 1, 0]);
		else if(this.rotAng < 0)
		mat4.rotate(transf, transf, -Math.PI/2, [0, 1, 0]);*/
	return transf;
	
}
