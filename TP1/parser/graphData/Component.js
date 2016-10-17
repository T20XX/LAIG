/**
 * @constructor
 */
function Component() {
	this.transformation	= null;
	this.material = null;
	this.texture = null;
	this.children = null;
}

/**
 * @constructor
 */
function Component(transformation, material, texture, children) {
	this.transformation = transformation;
	this.material = material;
	this.texture = texture;
	this.children = children;
}

Component.prototype.constructor = Component;

Component.prototype.setTransformation = function(tranformation){
    this.transformation = transformation;
}

Component.prototype.setMaterial = function(material){
    this.material = material;
}

Component.prototype.setTransformation= function(tranformation){
    this.transformation = transformation;
}