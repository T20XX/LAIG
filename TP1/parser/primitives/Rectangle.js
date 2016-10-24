/**
 * Rectangle
 * @param scene
 * @constructor
 */
function Rectangle(scene, x1, y1, x2, y2) {
	CGFobject.call(this,scene);

	//if param not defined create a square with the left-bottom-corner in the origin
	this.x1 = x1 || 0;
	this.y1 = y1 || 0;
	this.x2 = x2 || 0;
	this.y2 = y2 || 0;
	this.s = 1;
	this.t = 1;


	this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor=Rectangle;

Rectangle.prototype.initBuffers = function () {
	this.vertices = [
            this.x1, this.y1, 0,
            this.x2, this.y1, 0,
            this.x1, this.y2, 0,
            this.x2, this.y2, 0
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];

		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	this.setTextureCoords(1,1);
	this.initGLBuffers();
};

Rectangle.prototype.setTextureCoords = function (s, t) {
	this.s = s;
	this.t = t;

	var dx = this.x2 - this.x1; //rectangle width
	var dy = this.y2 - this.y1; //rectangle height

	var tx = dx/this.s;
	var ty = dy/this.t;

	//Set the texture coords
	this.texCoords = [
			0,  1,	  
			tx, 1,	  
			tx, 1 - ty,
			0,  1 - ty,	    
	];

	this.updateTexCoordsGLBuffers();
}