
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

	
		this.gl.frontFace(this.gl.CCW);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.gl.enable(this.gl.CULL_FACE);
	this.gl.cullFace(this.gl.BACK);

	this.enableTextures(true);
    /*this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);*/

	this.axis=new CGFaxis(this);
	
	this.lightStates= [];
	this.materials = [];
	this.textures = [];
	
	this.curCamera = 0;
	this.curMaterial = 0;
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
		this.lights[i].setAmbient(lights[id].getAmbient().r, lights[id].getAmbient().g, lights[id].getAmbient().b, lights[id].getAmbient().a);
		this.lights[i].setDiffuse(lights[id].getDiffuse().r, lights[id].getDiffuse().g, lights[id].getDiffuse().b, lights[id].getDiffuse().a);
		this.lights[i].setSpecular(lights[id].getSpecular().r, lights[id].getSpecular().g, lights[id].getSpecular().b, lights[id].getSpecular().a);
		
		if(!lights[id].isOmni()){
			this.lights[i].setPosition(lights[id].getLocation().x, lights[id].getLocation().y, lights[id].getLocation().z, 1);
			this.lights[i].setSpotCutOff(lights[id].getAngle() *(Math.PI/180.0));

			var locationX = lights[id].getLocation().x;
			var locationY = lights[id].getLocation().y;
			var locationZ = lights[id].getLocation().z;
			var targetX = lights[id].getTarget().x;
			var targetY = lights[id].getTarget().y;
			var targetZ = lights[id].getTarget().z;
			this.lights[i].setSpotDirection(targetX-locationX,targetY-locationY,targetZ-locationZ);
			
			this.lights[i].setSpotExponent(lights[id].getExponent());
		}
		else this.lights[i].setPosition(lights[id].getLocation().x, lights[id].getLocation().y, lights[id].getLocation().z, lights[id].getLocation().w);
		if (lights[id].isEnabled()){
			this.lights[i].enable();
		} else {
			this.lights[i].disable();
		}
			this.lights[i].setVisible(true);
		i++;
	}
	this.interface.addLights(lights);
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
	var defaultId;

	for(id in views)
	{
		var tempView = views[id];

		var angle = tempView.getAngle()*(Math.PI/180.0);
		var near = tempView.getNear();
		var far = tempView.getFar();
		
		var fromVec = tempView.getFromVec();
		var toVec = tempView.getToVec();

		var cam = new CGFcamera(angle, near, far, vec3.fromValues(fromVec.x, fromVec.y, fromVec.z), vec3.fromValues(toVec.x, toVec.y, toVec.z));
		this.cameras.push(cam);

		if(defaultView == id)
		{
			defaultId = i;
		}

		i++;
	}

	this.curCamera = defaultId;
	this.camera = this.cameras[defaultId];
	this.interface.setActiveCamera(this.camera);
};

XMLscene.prototype.graphMaterials = function () {
	for(id in this.graph.materials)
	{
			console.log(id);
			var tempMat = this.graph.materials[id];
			var tempAppearance = new CGFappearance(this);
			tempAppearance.setAmbient(tempMat.getAmbient().r, tempMat.getAmbient().g, tempMat.getAmbient().b, tempMat.getAmbient().a);
			tempAppearance.setDiffuse(tempMat.getDiffuse().r, tempMat.getDiffuse().g, tempMat.getDiffuse().b, tempMat.getDiffuse().a);
			tempAppearance.setEmission(tempMat.getEmission().r, tempMat.getEmission().g, tempMat.getEmission().b, tempMat.getEmission().a);
			tempAppearance.setSpecular(tempMat.getSpecular().r, tempMat.getSpecular().g, tempMat.getSpecular().b, tempMat.getSpecular().a);
			tempAppearance.setShininess(tempMat.getShininess());
			
			this.materials[id] = tempAppearance;
	}
};
	
XMLscene.prototype.graphTextures = function () {
	for(id in this.graph.textures)
	{
			var tempText = this.graph.textures[id];

			this.textures[id] = new CGFtexture(this, tempText.getFile()); 
	}
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
	this.graphMaterials();
	this.graphTextures();
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

	
	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{	
		for(i in this.lights){
			if (this.lightStates[i]){
				this.lights[i].enable();
			} else {
				this.lights[i].disable();
			}
			
			this.lights[i].update();
		}
		this.processGraph(this.graph.root, new CGFappearance());
	};
};

XMLscene.prototype.processGraph = function(nodeName, parentAppearance, parentTexture){
	var appearance = null;

	if (nodeName != null && this.graph.components[nodeName] != null){
		var node = this.graph.components[nodeName];
		var selectedMaterial = this.curMaterial % node.getMaterial().length;
		
		
		if(node.getMaterial()[selectedMaterial] == "inherit"){
			appearance = parentAppearance;
		} else {
			appearance = this.materials[node.getMaterial()[selectedMaterial]];
		}
		
		if(node.getTexture() == "none"){
			appearance.setTexture(null);
		} else if(node.getTexture() == "inherit"){
			appearance.setTexture(parentTexture);
		}else{
			for(id in this.graph.primitives){
					if(this.graph.primitives[id] instanceof Rectangle||this.graph.primitives[id]  instanceof Triangle)
						this.graph.primitives[id].setTextureCoords(this.graph.textures[node.getTexture()].getS(),this.graph.textures[node.getTexture()].getT());
			}
			appearance.setTexture(this.textures[node.getTexture()]);
			appearance.setTextureWrap('REPEAT','REPEAT');
		}
		
		if (appearance != null){
			appearance.apply();
		}
		this.multMatrix(node.getTransformation().getMatrix());

		for (let i= 0; i < node.getChildren().length; i++){
			this.pushMatrix();
				var nextID = node.getChildren()[i];

				if (this.graph.primitives[nextID] == null){
					if (node.getTexture() != "inherit"){
						this.processGraph(nextID, appearance, this.textures[node.getTexture()]);
					} else {
						this.processGraph(nextID, appearance, parentTexture);
					}
				}else{
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

XMLscene.prototype.processMDown = function() {
	this.curMaterial++;
}

