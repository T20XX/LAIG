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