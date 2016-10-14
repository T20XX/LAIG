/**
 * Circle
 * @constructor
 */
 function Circle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices || 10;

 	this.initBuffers();
 };

 Circle.prototype = Object.create(CGFobject.prototype);
 Circle.prototype.constructor = Circle;

 Circle.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	//this.texCoords = [];

	var alfa = (2 * Math.PI) / this.slices;

	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	//this.texCoords.push(0.5,0.5)

	for (var i = 0; i < this.slices; i++){
		this.vertices.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);
		this.normals.push(0, 0, 1);
		//this.texCoords.push((Math.cos(alfa*i)+1)*0.5, -((Math.sin(alfa*i)-1)*0.5));
	}

	for (var i = 0; i < this.slices - 1; i++){
		this.indices.push(0,i+1,i+2);
	}
	this.indices.push(0,this.slices, 1);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };