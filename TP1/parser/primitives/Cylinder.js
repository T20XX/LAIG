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

 	this.initBuffers();
 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {
	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	var deltaAlfa = (2 * Math.PI) / this.slices;
	
	var h = this.top - this.base;
 	var deltaZ = this.height/this.stacks;
	var deltaR = h/this.stacks;
	
	var z = 0;
	var r = this.base;

	//foi necessário repetir vertices para a aplicação correta da textura
	/*for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i < this.slices; i++){
			this.vertices.push(Math.cos(alfa*i)*(r+deltaR), Math.sin(alfa*i)*(r+deltaR), z + deltaZ);
			this.vertices.push(Math.cos(alfa*i)*r, Math.sin(alfa*i)*r, z);
			this.normals.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);
			this.normals.push(Math.cos(alfa*i), Math.sin(alfa*i), 0);

			this.texCoords.push(i/this.slices, 1 - (j+1)/this.stacks);
			this.texCoords.push(i/this.slices, 1 -j/this.stacks);
		}
		this.vertices.push(Math.cos(alfa*0)*(r+deltaR), Math.sin(alfa*0)*(r+deltaR), z + deltaZ);
		this.vertices.push(Math.cos(alfa*0)*r, Math.sin(alfa*0)*r, z);

		this.normals.push(Math.cos(alfa*0), Math.sin(alfa*0), 0);
		this.normals.push(Math.cos(alfa*0), Math.sin(alfa*0), 0);

		this.texCoords.push(1, 1 -(j+1)/this.stacks);
		this.texCoords.push(1, 1 -j/this.stacks);
		
		z += deltaZ;
		r += deltaR;
	}
	
		for (var i = 1; i <= this.stacks; i++){
	   for (var j = 0; j < this.slices+this.stacks -1; j++){
		  this.indices.push((j*2)+(this.slices)*2*(i-1),(j*2)+(this.slices)*2*(i-1)+1,(j*2)+(this.slices)*2*(i-1)+3);
		  this.indices.push((j*2)+(this.slices)*2*(i-1),(j*2)+(this.slices)*2*(i-1)+3,(j*2)+(this.slices)*2*(i-1)+2);
	   }
	}*/
	
	for(var k = 0; k <= this.stacks; k++)
	{
		var alfa = 0;
		for(var i = 0; i <= this.slices; i++)
		{

			this.vertices.push(r*Math.cos(alfa),r*Math.sin(alfa),z);

			if(i > 0 && k > 0)
			{
				this.indices.push((this.slices+1)*(k)+(i),(this.slices+1)*(k)+(i-1),(this.slices+1)*(k-1)+(i-1));
				this.indices.push((this.slices+1)*(k)+(i),(this.slices+1)*(k-1)+(i-1),(this.slices+1)*(k-1)+(i));
			}
			
			this.normals.push(h*Math.cos(alfa),h*Math.sin(alfa),-1*h);

			this.texCoords.push(i/(this.slices), 1 -k/this.stacks);

			alfa += deltaAlfa;
		}
		
		z += deltaZ;
		r += deltaR;
	}
	
	
	var baseIndice = (this.slices+1)*(this.stacks+1);
	
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, -1);
	this.texCoords.push(0.5,0.5);

	for (var i = 0; i < this.slices; i++){
		this.vertices.push(Math.cos(deltaAlfa*i)*this.base, Math.sin(deltaAlfa*i)*this.base, 0);
		this.normals.push(0, 0, -1);
		this.texCoords.push((Math.cos(deltaAlfa*i)+1)*0.5, -((Math.sin(deltaAlfa*i)-1)*0.5));
	}

	for (var i = 0; i < this.slices - 1; i++){
		this.indices.push(baseIndice, baseIndice+i+2, baseIndice+i+1);
	}
	this.indices.push(baseIndice, baseIndice + 1, baseIndice + this.slices);

	var topIndice = baseIndice + this.slices + 1;
	
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5,0.5);

	for (var i = 0; i < this.slices; i++){
		this.vertices.push(Math.cos(deltaAlfa*i)*this.top, Math.sin(deltaAlfa*i)*this.top, this.height);
		this.normals.push(0, 0, -1);
		this.texCoords.push((Math.cos(deltaAlfa*i)+1)*0.5, -((Math.sin(deltaAlfa*i)-1)*0.5));
	}

	for (var i = 0; i < this.slices - 1; i++){
		this.indices.push(topIndice + 1, topIndice+i+1, topIndice+i+2);
	}
	this.indices.push(topIndice, topIndice + this.slices, topIndice +1);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
