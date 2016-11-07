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

Component.prototype.getTransformation = function(){
    return this.transformation;
}

Component.prototype.getMaterial = function(){
    return this.material;
}

Component.prototype.getTexture = function(){
    return this.texture;
}

Component.prototype.getChildren = function(){
    return this.children;
}

Component.prototype.setTransformation = function(tranformation){
    this.transformation = transformation;
}

Component.prototype.setMaterial = function(material){
    this.material = material;
}

Component.prototype.setTexture = function(texture){
    this.texture = texture;
}