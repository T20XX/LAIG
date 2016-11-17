/**
 * Chessboard
 * @param scene
 * @constructor
 */
function Chessboard(scene, du, dv, texture, su, sv, c1, c2, cs) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.du = du;
	this.dv = dv;
	this.texture = texture;
	this.su = su;
	this.sv = sv;
	this.c1 = c1;
	this.c2 = c2;
	this.cs = cs;

	this.board = new Plane(this.scene,1,1,this.du,this.dv);

	this.shader = new CGFshader(this.scene.gl, "shaders/Chessboard.vert", "shaders/Chessboard.frag");


	this.shader.setUniformsValues({du: this.du});
	this.shader.setUniformsValues({dv: this.dv});
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
	this.shader.setUniformsValues({c1: vec4.fromValues(c1.r, c1.g, c1.b, c1.a)});
	this.shader.setUniformsValues({c2: vec4.fromValues(c2.r, c2.g, c2.b, c2.a)});
	this.shader.setUniformsValues({cs: vec4.fromValues(cs.r, cs.g, cs.b, cs.a)});
}


Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor=Chessboard;

Chessboard.prototype.display = function(){
    this.scene.setActiveShader(this.shader);
	this.board.display();
    this.scene.setActiveShader(this.scene.defaultShader);
}