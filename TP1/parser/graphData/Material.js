/**
 * @constructor
 */
function Material(emission, ambient, diffuse, specular, shininess) {
	this.emission = emission;
	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
	this.shininess = shininess;
}

Material.prototype.constructor = Material;

Material.prototype.getEmission = function(){
	return this.emission;
}

Material.prototype.getAmbient = function(){
	return this.ambient;
}

Material.prototype.getDiffuse = function(){
	return this.diffuse;
}

Material.prototype.getSpecular = function(){
	return this.specular;
}

Material.prototype.getShininess = function(){
	return this.shininess;
}