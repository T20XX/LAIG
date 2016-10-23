/**
 * Sphere
 * @constructor
 */
 function Sphere(scene,radius,  slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.radius = parseFloat(radius);
    this.slices = parseInt(slices);
    this.stacks = parseInt(stacks);
	//this.appearance = appearance ||  new CGFappearance(this.scene);

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var alfa = (2 * Math.PI) / this.slices;
	//angulo em Z
	var beta = (Math.PI) / this.stacks;

	for (var i = 0; i <= this.stacks; i++){
	    for (var j = 0; j <= this.slices; j++){
            this.vertices.push(this.radius * Math.cos(j*alfa) * Math.sin(i*beta),this.radius *Math.cos(beta*i),this.radius *Math.sin(j*alfa)*Math.sin(i*beta));
	    	this.normals.push(this.radius * Math.cos(j*alfa) * Math.sin(i*beta),this.radius *Math.cos(beta*i),this.radius *Math.sin(j*alfa)*Math.sin(i*beta));
	    	var s = 1 - (i / this.stacks);
            var t = 1 - (j / this.slices);
            this.texCoords.push(s, t);
	    }
	}
    for (var i = 0; i < this.stacks; i++) {
        for (var j = 0; j < this.slices; j++) {
           var first = (i * (this.slices + 1)) + j;
            var second = first + this.slices + 1;

            this.indices.push(first, second + 1, second);
            this.indices.push(first, first + 1, second + 1);
        }
    }

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