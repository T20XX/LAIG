/**
 * @constructor
 */
function Component() {
	this.transformations = null;
	this.material = null;
	this.texture = null;
	this.children = null;
}

/**
 * @constructor
 */
function Component(transformations, material, texture, children) {
	this.transformations = transformations;
	this.material = material;
	this.texture = texture;
	this.children = children;
}

Component.prototype.constructor = Component;

Component.prototype.setTransformations = function(tranformations){
    this.transformations = transformations;
}

Component.prototype.setMaterial = function(material){
    this.material = material;
}

Component.prototype.setTransformations = function(tranformations){
    this.transformations = transformations;
}