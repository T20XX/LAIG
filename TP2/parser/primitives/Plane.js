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
	
	var controlPoints = [];
	
	var halfDimX = this.dimX / 2;
	var halfDimY = this.dimY / 2;
	
	//For U = 0
	var temp =  [
					[-halfDimX, -halfDimY, 0, 1], 
					[-halfDimX, halfDimY, 0, 1]
				];
	
	controlPoints.push(temp);
	
	//For U = 1
	temp = [
				[halfDimX, -halfDimY, 0, 1],
				[halfDimX, halfDimY, 0, 1]
			];
	
	controlPoints.push(temp);
	
	this.plane = this.makeSurface(1,1, controlPoints);	
};

Plane.prototype.getKnotsVector = function(degree) { 
	
	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}

Plane.prototype.makeSurface = function (degree1, degree2, controlvertexes) {
		
	var knots1 = this.getKnotsVector(degree1); 
	var knots2 = this.getKnotsVector(degree2); 
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); 
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	return new CGFnurbsObject(this.scene, getSurfacePoint, this.partsX, this.partsY);	
}

Plane.prototype.display = function(){
	this.plane.display();
}

/*Plane.prototype.initBuffers = function () {
	this.vertices = [];
	this.indices = [];	
	this.normals = [];
	this.texCoords = [];

 	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};*/