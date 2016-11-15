/**
 * Vehicle
 * @param scene
 * @constructor
 */
function Vehicle(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor=Vehicle;

Vehicle.prototype.initBuffers = function () {
	this.capotaControlPoints=[
		[0,		0,	0],
		[0,		0,	1],
		[1.2,	2,		0],
		[1.2,	2,		1],
		[2,		1,		0.1],
		[2,		1,		0.9]
	];
	this.capota = new Patch(this.scene,1,2,1,10,this.capotaControlPoints);
          
     this.vidroFrente = new Plane(this.scene, 0.8, 0.5, 1, 1);   

     this.capotControlPoints=[
		[2,		0.5,	0.1],
		[2,		0.5,	0.9],
		[2.8,	0.5,		0.1],
		[2.8,	0.5,		0.9],
		[3,		0,		0.2],
		[3,		0,		0.8]
	];
	this.capot = new Patch(this.scene,1,2,1,10,this.capotControlPoints);
  
};

Vehicle.prototype.display = function(){
	this.capota.display();
	this.scene.pushMatrix();
		this.scene.translate(2, 0.75, 0.5);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.vidroFrente.display();
	this.scene.popMatrix();
	this.capot.display();
}