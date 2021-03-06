/**
 * @constructor
 */
function Component() {
    this.transformation = null ;
    this.material = null ;
    this.texture = null ;
    this.children = null ;
    this.animations = null ;
}
/**
 * @constructor
 */
function Component(transformation, material, texture, children, animations) {
    this.transformation = transformation;
    this.material = material;
    this.texture = texture;
    this.children = children;
    this.animations = animations;
}
Component.prototype.constructor = Component;
Component.prototype.getTransformation = function() {
    return this.transformation;
}
Component.prototype.getMaterial = function() {
    return this.material;
}
Component.prototype.getTexture = function() {
    return this.texture;
}
Component.prototype.getChildren = function() {
    return this.children;
}
Component.prototype.getAnimations = function() {
    return this.animations;
}
Component.prototype.setTransformation = function(tranformation) {
    this.transformation = transformation;
}
Component.prototype.setMaterial = function(material) {
    this.material = material;
}
Component.prototype.setTexture = function(texture) {
    this.texture = texture;
}

Component.prototype.getAnimationsTransformations = function(deltaTime){
    var tmpTime = 0;
    var animationTransformation = new Transformation();
    for (var i = 0; i < this.animations.length; i++){
        animationTransformation.multMatrix(this.animations[i].getTransformation(deltaTime - tmpTime));
        if ((deltaTime - tmpTime) < this.animations[i].getSpan()){
            break;
        }
        tmpTime += this.animations[i].getSpan();
    }
    //console.log(animationTransformation);
    return animationTransformation.getMatrix();
}
