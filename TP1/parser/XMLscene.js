
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
	
	this.curCamera = 0;
};

XMLscene.prototype.setInterface = function (interface) {
	this.interface = interface;
}

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
};

XMLscene.prototype.graphLights = function () {
	var lights = this.graph.lights;
	
	var i = 0;
	
	for(id in lights)
	{
		this.lights[i].setPosition(lights[id].getLocation().x, lights[id].getLocation().y, lights[id].getLocation().z, lights[id].getLocation().w);
		this.lights[i].setAmbient(lights[id].getAmbient().r, lights[id].getAmbient().g, lights[id].getAmbient().b, lights[id].getAmbient().a);
		this.lights[i].setDiffuse(lights[id].getDiffuse().r, lights[id].getDiffuse().g, lights[id].getDiffuse().b, lights[id].getDiffuse().a);
		this.lights[i].setSpecular(lights[id].getSpecular().r, lights[id].getSpecular().g, lights[id].getSpecular().b, lights[id].getSpecular().a);
		
		if (lights[id].isEnabled()){
			this.lights[i].enable();
		} else {
			this.lights[i].disable();
		}
			this.lights[i].setVisible(true);

		//this.lights[i].update();
		i++;
	}
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.graphCameras = function () {
    //Initialize the cameras in function of the views element
	this.cameras = [];
	var views = this.graph.views;
	var defaultView = this.graph.defaultView;

	var i = 0;
	var defaultIdx;

	for(id in views)
	{
		var tempView = views[id];

		var angle = tempView.getAngle();
		var near = tempView.getNear();
		var far = tempView.getFar();
		
		var fromVec = tempView.getFromVec();
		var toVec = tempView.getToVec();

		var cam = new CGFcamera(angle, near, far, vec3.fromValues(fromVec.x, fromVec.y, fromVec.z), vec3.fromValues(toVec.x, toVec.y, toVec.z));
		this.cameras.push(cam);

		if(defaultView == id)
		{
			defaultIdx = i;
		}

		i++;
	}

	this.curCamera = defaultIdx;
	this.camera = this.cameras[defaultIdx];
	this.interface.setActiveCamera(this.camera);
	};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	//this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
	//this.gl.clearColor(0.7,0,1,1);
	//this.lights[0].setVisible(true);
    //this.lights[0].enable();
	
	this.axis=new CGFaxis(this, this.graph.axisLength);
	var background = this.graph.illumination.getBackground();
	var ambient = this.graph.illumination.getAmbient();
	this.gl.clearColor(background.r,background.g,background.b,background.a);
	this.setGlobalAmbientLight(ambient.r, ambient.g, ambient.b, ambient.a);

	this.graphCameras();
	this.graphLights();
			this.processGraph('originCube');

};

XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup
	
	//this.graph.primitives["triangle"].display();

	
	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{	
		for(i in this.lights){
			this.lights[i].update();
		}
	};
};

XMLscene.prototype.processGraph = function(nodeName){
	var material = null;

	if (nodeName != null && this.graph.components[nodeName] != null){
		var node = this.graph.components[nodeName];
		/*if(node.getMaterial() != null){
			material = node.getMaterial();
		}
		if (material != null){
			//this.applyMaterial(material);
		}
		this.multMatrix(node.getTransformation().getMatrix());*/
		/*if (node.primitive != null){
			//DESENHA PRIMITIVA
		}*/
		for (i= 0; i < node.getChildren().length; i++){
			this.pushMatrix();
				//this.applyMaterial(material);
				var nextID = node.getChildren()[i];
				console.log(nextID);

				if (this.graph.primitives[nextID] == null){
					this.processGraph(nextID);
				}else{
					console.log("primitive");
					this.graph.primitives[nextID].display();
				}
			this.popMatrix();
		}
	}
}

/**
 * Interface functions
 */
XMLscene.prototype.processVDown = function() {
	this.curCamera = (this.curCamera + 1) % this.cameras.length;
	this.camera = this.cameras[this.curCamera];
	this.interface.setActiveCamera(this.camera);
}

