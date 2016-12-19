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
	this.su = -1;
	this.sv = -1;
	this.c1 = c1;
	this.c2 = c2;
	this.cs = cs;

	this.board = new Plane(this.scene,1,1,this.du*4,this.dv*4);


	this.shader = new CGFshader(this.scene.gl, "shaders/Chessboard.vert", "shaders/Chessboard.frag");

	this.shader.setUniformsValues({du: this.du});
	this.shader.setUniformsValues({dv: this.dv});
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
	this.shader.setUniformsValues({c1: this.c1});
	this.shader.setUniformsValues({c2: this.c2});
	this.shader.setUniformsValues({cs: this.cs});

	this.appearance = new CGFappearance(this.scene);
	this.appearance.loadTexture(this.texture.getFile());

}


Chessboard.prototype = Object.create(CGFobject.prototype);
Chessboard.prototype.constructor=Chessboard;

Chessboard.prototype.display = function(){
this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.setActiveShader(this.shader);
	this.board.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
}

Chessboard.prototype.setSelectedCell = function(x,y){
	this.su = x;
	this.sv = y;
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
}

Chessboard.prototype.clearSelectedCell = function(){
	this.su = -1;
	this.sv = -1;
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({sv: this.sv});
}