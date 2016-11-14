/**
 * Plane
 * @param scene
 * @constructor
 */
function Plane(scene, dimX, dimY, partsX, partsY) {
	CGFobject.call(this,scene);

	this.dimX = dimX;
	this.dimY = dimY;
	this.partsX = partsX;
	this.partsY = partsY;

	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor=Plane;

Plane.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];	
	this.normals = [];
	this.texCoords = [];

 	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};