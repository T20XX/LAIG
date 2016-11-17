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
	this.pneuMaterial = new CGFappearance(this.scene);
	this.pneuMaterial.setAmbient(0.1,0.1,0.1,1);
	this.pneuMaterial.setDiffuse(0.1,0.1,0.1,1);
	this.pneuMaterial.setSpecular(0.2,0.2,0.2,1);
	this.tubeMaterial = new CGFappearance(this.scene);
	this.tubeMaterial.setAmbient(0.5,0.5,0.5,1);
	this.tubeMaterial.setDiffuse(0.3,0.3,0.3,1);
	this.tubeMaterial.setSpecular(0.5,0.5,0.5,1);
	this.carMaterial = new CGFappearance(this.scene);
	this.carMaterial.setAmbient(0.8,0,0,1);
	this.carMaterial.setDiffuse(0.5,0,0,1);
	this.carMaterial.setSpecular(0.5,0,0,1);
	this.guardaLMaterial = new CGFappearance(this.scene);
	this.guardaLMaterial.setAmbient(1,0,0,1);
	this.guardaLMaterial.setDiffuse(0.5,0,0,1);
	this.guardaLMaterial.setSpecular(0.5,0,0,1);
	this.capotaMaterial = new CGFappearance(this.scene);
	this.capotaMaterial.setAmbient(1,1,1,1);
	this.capotaMaterial.setDiffuse(0.5,0.5,0.5,1);
	this.capotaMaterial.setSpecular(0.5,0.5,0.5,1);
	this.windowMaterial = new CGFappearance(this.scene);
	this.windowMaterial.setAmbient(1,1,1,1);
	this.windowMaterial.setDiffuse(0.5,0.5,0.5,1);
	this.windowMaterial.setSpecular(0.5,0.5,0.5,1);
	this.windowMaterial.loadTexture("./primitives/vidroFrenteTex.jpg");
	//this.windowMaterial.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.capotaControlPoints=[
		[-1.5,		0,	-0.5],
		[-1.5,		0,	0.5],
		[-0.3,	2,		-0.5],
		[-0.3,	2,		0.5],
		[0.5,		1,		-0.4],
		[0.5,		1,		0.4]
	];
	this.capota = new Patch(this.scene,1,2,1,10,this.capotaControlPoints);
        
       this.rightSideCP=[
		[-1.5,	0,	0.5],
		[-1.5,	0,	0.5],
		[-0.3,	2,	0.5],
		[-0.3,	0,	0.5],
		[0.5, 1,	0.4],
		[0.5, 0, 0.4],
       ];

	this.rightSide = new Patch(this.scene, 1,2,1,10, this.rightSideCP);

	this.leftSideCP=[
		[-1.5,	0,	-0.5],
		[-1.5,	0,	-0.5],
		[-0.3,	0,	-0.5],
		[-0.3,	2,	-0.5],
		[0.5, 0, -0.4],
		[0.5, 1,	-0.4],
       ];

       this.leftSide = new Patch(this.scene, 1,2,1,10,this.leftSideCP);
     this.vidroFrente = new Plane(this.scene, 0.8, 0.5, 1, 1);   

     this.capotControlPoints=[
		[0.5,		0.5,	-0.4],
		[0.5,		0.5,	0.4],
		[1.3,	0.5,		-0.4],
		[1.3,	0.5,		0.4],
		[1.5,		0,		-0.3],
		[1.5,		0,		0.3]
	];
	this.capot = new Patch(this.scene,1,2,1,10,this.capotControlPoints);
  
  this.pneu = new Torus(this.scene,0.15,0.3,10,10);
	
	this.guardaLamasECP=[
		[0.5,	0,	-0.5],
		[0.5,	0,	-0.45],
		[0.5,	0,	-0.4],
		[0.6,	-0.1,	-0.5],
		[0.6,	-0.1,	-0.45],
		[0.6,	-0.1,	-0.4],
		[1,	0.7,	-0.6],
		[1,	1,	-0.5],
		[1,	1,	-0.4],
		[1.3, 	0,	-0.6],
		[1.5, 	0,	-0.5],
		[1.5, 	0,	-0.3],
	];
	this.guardaLamasE = new Patch(this.scene,2,3,5,10, this.guardaLamasECP);
	
		this.guardaLamasDCP=[
		[0.5,	0,	0.4],
		[0.5,	0,	0.45],
		[0.5,	0,	0.5],
		[0.6,	-0.1,	0.4],
		[0.6,	-0.1,	0.45],
		[0.6,	-0.1,	0.5],
		[1,	1,	0.4],
		[1,	1,	0.5],
		[1,	0.7,	0.6],
		[1.5, 	0,	0.3],
		[1.5, 	0,	0.5],
		[1.3, 	0,	0.6],
	];
this.guardaLamasD = new Patch(this.scene,2,3,5,10, this.guardaLamasDCP);

	this.tube = new Cylinder(this.scene, 0.15, 0.15, 1.1, 6, 1);

	this.triangleD = new Triangle(this.scene, 0.5, 0, -0.4, 0.5, 0.5, -0.4, 1.1, 0.4, -0.4) ;
	this.triangleE = new Triangle(this.scene,  1.1, 0.4, 0.4, 0.5, 0.5, 0.4, 0.5, 0, 0.4) ;
};

	
Vehicle.prototype.display = function(){
	this.scene.pushMatrix();
		this.capotaMaterial.apply();
		this.capota.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.windowMaterial.apply();
		this.scene.translate(0.5, 0.75, 0);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.rotate(Math.PI,0,0,1);
		this.vidroFrente.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.pneuMaterial.apply();
	    this.scene.pushMatrix();

            this.scene.pushMatrix();
                this.scene.translate(-1,0,-0.5);
                this.pneu.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(-1,0,0.5);
                this.pneu.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(1,0,-0.5);
                this.pneu.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(1,0,0.5);
                this.pneu.display();
            this.scene.popMatrix();

            this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.popMatrix();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.tubeMaterial.apply();

        this.scene.pushMatrix();
            this.scene.translate(-1,0,-0.55);
            this.tube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(1,0,-0.55);
            this.tube.display();
        this.scene.popMatrix();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.guardaLMaterial.apply();
		this.guardaLamasE.display();
		this.guardaLamasD.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.carMaterial.apply();
		this.capot.display();
		this.triangleD.display();
		this.triangleE.display();
		this.rightSide.display();
		this.leftSide.display();
	this.scene.popMatrix();
}