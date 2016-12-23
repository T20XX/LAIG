/**
 * Piece
 * @param scene
 * @constructor
 */
function Piece(scene, appearance) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.appearance = appearance;

	this.cylinder = new Cylinder(this.scene,0.5,0.5,0.2,10,1);
}


Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;

Piece.prototype.display = function(){
this.scene.pushMatrix();
    this.appearance.apply();
	this.cylinder.display();
    this.scene.popMatrix();
}