/**
 * Sphere
 * @constructor
 */
 function Sphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices || 10;
	this.stacks = stacks || 10;

	//this.appearance = appearance ||  new CGFappearance(this.scene);

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	//this.texCoords = [];

	var alfa = (2 * Math.PI) / this.slices;
	//angulo em Z
	var beta = (Math.PI/2) / this.stacks;


    var temp1;
    var temp2;
	for (var i = 0; i < this.stacks; i++){
	    temp1 = (this.stacks - i)/(this.stacks);
	    temp2 = (this.stacks - (i + 1))/(this.stacks);
	    for (var j = 0; j < this.slices; j++){
		  this.vertices.push(Math.cos(alfa*j)*Math.cos(beta*(i+1)), Math.sin(alfa*j)*Math.cos(beta*(i+1)), Math.sin(beta*(i+1)));
		  this.vertices.push(Math.cos(alfa*j)*Math.cos(beta*i), Math.sin(alfa*j)*Math.cos(beta*i), Math.sin(beta*i));

		  this.normals.push(Math.cos(alfa*j)*Math.cos(beta*(i+1)), Math.sin(alfa*j)*Math.cos(beta*(i+1)), Math.sin(beta*(i+1)));
		  this.normals.push(Math.cos(alfa*j)*Math.cos(beta*i), Math.sin(alfa*j)*Math.cos(beta*i), Math.sin(beta*i));

			//this.texCoords.push(j/this.slices, 1 - (i+1)/this.stacks);
			//this.texCoords.push(j/this.slices, 1 -i/this.stacks);
	    }

 this.vertices.push(Math.cos(alfa*0)*Math.cos(beta*(i+1)), Math.sin(alfa*0)*Math.cos(beta*(i+1)), Math.sin(beta*(i+1)));
		  this.vertices.push(Math.cos(alfa*0)*Math.cos(beta*i), Math.sin(alfa*0)*Math.cos(beta*i), Math.sin(beta*i));

		  this.normals.push(Math.cos(alfa*0)*Math.cos(beta*(i+1)), Math.sin(alfa*0)*Math.cos(beta*(i+1)), Math.sin(beta*(i+1)));
		  this.normals.push(Math.cos(alfa*0)*Math.cos(beta*i), Math.sin(alfa*0)*Math.cos(beta*i), Math.sin(beta*i));

	//this.texCoords.push(1, 1 -(i+1)/this.stacks);
	//this.texCoords.push(1, 1 -	i/this.stacks);

	}
    for (var i = 1; i <= this.stacks; i++){
	   for (var j = 0; j < this.slices+this.stacks -1; j++){
		  this.indices.push((j*2)+(this.slices)*2*(i-1),(j*2)+(this.slices)*2*(i-1)+1,(j*2)+(this.slices)*2*(i-1)+3);
		  this.indices.push((j*2)+(this.slices)*2*(i-1),(j*2)+(this.slices)*2*(i-1)+3,(j*2)+(this.slices)*2*(i-1)+2);
	   }
	   //Para não repetir os vértices e usar os 2 primeiros para a última face
	//this.indices.push((this.slices)*2*(i-1)+(this.slices-1)*2,(this.slices)*2*(i-1)+(this.slices-1)*2+1,(this.slices)*2*(i-1)+1);
	//this.indices.push((this.slices)*2*(i-1)+(this.slices-1)*2,(this.slices)*2*(i-1)+1,(this.slices)*2*(i-1));
	}
	

	console.log(this.vertices.length);
	console.log(this.indices.length);
	console.log(this.normals.length);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

Sphere.prototype.display = function() {
	this.scene.pushMatrix();
		this.drawElements(this.primitiveType);
		this.scene.rotate(-Math.PI,1,0,0);
		//this.appearance.apply();
		this.drawElements(this.primitiveType);
	this.scene.popMatrix();
}