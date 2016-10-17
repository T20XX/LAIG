
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
	
	this.curCameraIdx = 0;
};

XMLscene.prototype.initLights = function () {

	this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
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
	this.gl.clearColor(0.7,0,1,1);
	this.lights[0].setVisible(true);
    this.lights[0].enable();
	
	//this.axis=new CGFaxis(this, this.graph.axisLength);
	var background = this.graph.illumination.getBackground();
	var ambient = this.graph.illumination.getAmbient();
	this.gl.clearColor(background.r,background.g,background.b,background.a);
	this.setGlobalAmbientLight(ambient.r, ambient.g, ambient.b, ambient.a);
	
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

	this.curCameraIdx = defaultIdx;
	this.camera = this.cameras[defaultIdx];
	this.interface.setActiveCamera(this.camera);
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
		this.lights[0].update();
	};	
};

XMLscene.prototype.processGraph = function(nodeName){
	/* var material = null;

	if (nodeName != null){
		var node = this.graph[nodeName];
		if(node.material != null){
			material = node.material;
		}
		if (material != null){
		this.applyMaterial(material);
		}
		this.mulMatrix(node.m);
		if (node.primitive != null){
			//DESENHA PRIMITIVA
		}
		for (i= 0; i < node.Children.length; i++){
			this.pushMatrix();
			this.applyMaterial(material);
				this.processGraph(node.Children[i]);
				this.popMatrix();
			}
		}*/
}

