/**
 * Triangle
 * @param scene
 * @constructor
 */
function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
	CGFobject.call(this,scene);

	this.x1 = x1 || 0;
	this.y1 = y1 || 0;
	this.z1 = z1 || 0;
	this.x2 = x2 || 0;
	this.y2 = y2 || 0;
	this.z2 = z2 || 0;
	this.x3 = x3 || 0;
	this.y3 = y3 || 0;
	this.z3 = z3 || 0;
	this.s = 1;
	this.t = 1;


	this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor=Triangle;

Triangle.prototype.initBuffers = function () {
	this.vertices = [
		this.x1, this.y1, this.z1,
		this.x2, this.y2, this.z2,
		this.x3, this.y3, this.z3
	];

	this.indices = [
		0, 1, 2
	];
	
	var nx = (this.y2-this.y1)*(this.z3-this.z1) - (this.z2-this.z1)*(this.y3-this.y1);
	var ny = (this.z2-this.z1)*(this.x3-this.x1) - (this.x2-this.x1)*(this.z3-this.z1);
	var nz = (this.x2-this.x1)*(this.y3-this.y1) - (this.y2-this.y1)*(this.x3-this.x1);

    this.normals = [
		nx, ny, nz,
		nx, ny, nz,
		nx, ny, nz 
	]


	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

Triangle.prototype.setTextureCoords = function (s, t) {
	
	var a = Math.sqrt(Math.pow(this.x1-this.x3, 2) + Math.pow(this.y1-this.y3, 2) + Math.pow(this.z1-this.z3, 2));
	var b = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1, 2) + Math.pow(this.z2-this.z1, 2));
    var c = Math.sqrt(Math.pow(this.x2-this.x3, 2) + Math.pow(this.y2-this.y3, 2) + Math.pow(this.z2-this.z3, 2));
    var ang = Math.acos((Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2) )/(2*a*c));
    
    this.texCoords = [
   		(c-a*Math.cos(ang))/s, 1-a*Math.sin(ang)/t,
		0, 1,
		c/s, 1
    ];

this.updateTexCoordsGLBuffers();

}