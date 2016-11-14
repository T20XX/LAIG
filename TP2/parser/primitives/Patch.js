/**
 * Patch
 * @param scene
 * @constructor
 */
function Patch(scene, orderU, orderV, partsU, partsV, controlPoints) {
	CGFobject.call(this,scene);

	this.orderU = orderU;
	this.orderV = orderV;
	this.partsU = partsU;
	this.partsV = partsV;
	this.controlPoints = controlPoints;


	this.initBuffers();
};

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor=Patch;

Patch.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];	
	this.normals = [];
	this.texCoords = [];

 	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};