/**
 * @constructor
 */
function Light(omni, enabled, location, ambient, diffuse, specular, target, angle, exponent) {
	this.omni = omni;
	this.enabled = enabled;
	this.location = location;
	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
	this.target = null || target;
	this.angle = null || angle;
	this.exponent = null || exponent;
}

Light.prototype.constructor = Light;

Light.prototype.isOmni = function(){
	return this.omni;
}

Light.prototype.isEnabled = function(){
	return this.enabled;
}

Light.prototype.getLocation = function(){
	return this.location;
}

Light.prototype.getAmbient = function(){
	return this.ambient;
}

Light.prototype.getDiffuse = function(){
	return this.diffuse;
}

Light.prototype.getSpecular = function(){
	return this.specular;
}

Light.prototype.getTarget = function(){
	return this.target;
}

Light.prototype.getAngle = function(){
	return this.angle;
}

Light.prototype.getExponent = function(){
	return this.exponent;
}
