/**
 * Cylinder
 * @constructor
 */
 function Cylinder(scene, base, top, height, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.base = base;
	this.top = top;
	this.height = height;
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
	this.texCoords = [];

	var alfa = (2 * Math.PI) / this.slices;

	//foi necessário repetir vertices para a aplicação correta da textura
	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i < this.slices; i++){
			this.vertices.push(Math.cos(alfa*i), Math.sin(alfa*i), (this.height/this.stacks)*(j+1));
			this.vertices.push(Math.cos(alfa*i), Math.sin(alfa*i), (this.height/this.stacks)*j);
			this.normals.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);
			this.normals.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);

			this.texCoords.push(i/this.slices, 1 - (j+1)/this.stacks);
			this.texCoords.push(i/this.slices, 1 -j/this.stacks);
		}
		this.vertices.push(Math.cos(alfa*0), Math.sin(alfa*0), j+1);
		this.vertices.push(Math.cos(alfa*0), Math.sin(alfa*0), j);

		this.normals.push(Math.cos(alfa*0), Math.sin(alfa*0), 0);
		this.normals.push(Math.cos(alfa*0), Math.sin(alfa*0), 0);

		this.texCoords.push(1, 1 -(j+1)/this.stacks);
		this.texCoords.push(1, 1 -j/this.stacks);
	}

	for (var i = 1; i <= this.stacks; i++){
	   for (var j = 0; j < this.slices+this.stacks -1; j++){
		  this.indices.push((j*2)+(this.slices)*2*(i-1),(j*2)+(this.slices)*2*(i-1)+1,(j*2)+(this.slices)*2*(i-1)+3);
		  this.indices.push((j*2)+(this.slices)*2*(i-1),(j*2)+(this.slices)*2*(i-1)+3,(j*2)+(this.slices)*2*(i-1)+2);
	   }
	}


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