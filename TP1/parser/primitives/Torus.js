/**
 * Torus
 * @constructor
 */
 function Torus(scene, inner, outer, slices, loops) {
	CGFobject.call(this,scene);
	
	this.inner = inner;
	this.outer = outer;
	this.slices = slices;
	this.loops = loops;
	
	this.initBuffers();
};

 Torus.prototype = Object.create(CGFobject.prototype);
 Torus.prototype.constructor = Torus;

 Torus.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var alfaSlices = (2 * Math.PI) / this.slices;
	var alfaLoops = (2 * Math.PI) / this.loops;
 	var r = (this.outer - this.inner)/2;

	for (var i = 0; i <= this.loops; i++){
		
		for (var j = 0; j <= this.slices; j++){
			
			var d = this.inner + r + r*Math.cos(alfaLoops*i);
			this.vertices.push(d*Math.cos(alfaSlices*j),d*Math.sin(alfaSlices*j),r*Math.sin(alfaLoops*i));
			
			if(i > 0 && j > 0)
			{
				this.indices.push((this.slices+1)*(i)+(j),(this.slices+1)*(i)+(j-1),(this.slices+1)*(i-1)+(j-1));
				this.indices.push((this.slices+1)*(i)+(j),(this.slices+1)*(i-1)+(j-1),(this.slices+1)*(i-1)+(j));
			}
			
			this.normals.push(d*r*Math.cos(alfaSlices*j)*Math.cos(alfaLoops*i),d*r*Math.sin(alfaSlices*j)*Math.cos(alfaLoops*i),d*r*Math.sin(alfaLoops*i));
			
			this.texCoords.push(j/(this.slices), 1 -i/this.loops);
			
		}	
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	};