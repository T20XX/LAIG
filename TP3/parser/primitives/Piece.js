/**
 * Piece
 * @param scene
 * @constructor
 */
function Piece(scene, appearance) {
	CGFobject.call(this,scene);
	this.scene = scene;
	this.appearance = appearance;
	this.realisticDeltaX = (0.5 - Math.random()) /16;
    this.realisticDeltaY = (0.5 - Math.random()) /16;

	this.cylinder = new Cylinder(this.scene,0.5,0.5,0.2,15,1);
}


Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;

Piece.prototype.display = function(){
this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.translate(this.realisticDeltaX,this.realisticDeltaY,0);
	this.cylinder.display();
    this.scene.popMatrix();
}