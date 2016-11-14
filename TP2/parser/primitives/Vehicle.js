/**
 * Vehicle
 * @param scene
 * @constructor
 */
function Vehicle(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor=Vehicle;

Vehicle.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];	
	this.normals = [];
	this.texCoords = [];

 	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};