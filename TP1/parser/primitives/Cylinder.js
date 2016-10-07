/**
 * Cylinder
 * @constructor
 */
 function Cylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices || 10;
	this.stacks = stacks || 10;
	this.circle = new Circle(scene, this.slices);

 	this.initBuffers();
 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	//this.texCoords = [];

	var alfa = (2 * Math.PI) / this.slices;

	for (var i = 0; i < this.slices; i++){
		this.vertices.push(Math.cos(alfa*i), Math.sin(alfa*i), 1);
		this.vertices.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);
		this.normals.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);
		this.normals.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);

		//this.texCoords.push(0, 0);
		//this.texCoords.push(0, 1);	
	}

	/*for (var i = 0; i < this.slices; i++){
		this.texCoords.push(0, 0);
		this.texCoords.push(0, 1);
		this.texCoords.push(1, 0);
		this.texCoords.push(1, 1);
	}*/

	for (var i = 0; i < this.slices-1; i++){
		this.indices.push(i*2,i*2+1,i*2+3);
		this.indices.push(i*2,i*2+3,i*2+2);
	}
	//Para não repetir os vértices e usar os 2 primeiros para a última face
	this.indices.push((this.slices-1)*2,(this.slices-1)*2+1,1);
	this.indices.push((this.slices-1)*2,1,0);

	//console.log(this.vertices.length);
	//console.log(this.indices.length);
	//console.log(this.normals.length);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	};

Cylinder.prototype.display = function() {
	this.scene.pushMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI,0,1,0);
			this.circle.display();
		this.scene.popMatrix();

	for (var i = 0; i < this.stacks; i++) {
		this.drawElements(this.primitiveType);
		this.scene.translate(0, 0, 1);
	}
	
	this.circle.display();

	this.scene.popMatrix();
}