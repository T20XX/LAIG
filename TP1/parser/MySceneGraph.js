
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Data structure needed to store all dsx file information
	this.root = null;			// Root component id
	this.axisLength = null;		// Axis length
	this.defaultView = null;	// Default view id
	this.views = [];			// Views/cameras
	this.illumination = null;	// Illumination
	this.lights = [];			// Omni and spot lights
	this.textures = [];			// Textures
	this.materials = [];		// Materials
	this.transformations = [];	// Transformations
	this.primitives = [];		// Primitives
	this.components = [];		// Components
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	this.reader.open(filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() {
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	//var error = this.parseGlobalsExample(rootElement);
	var error = this.parseGlobals(rootElement);
	var error = this.parseViews(rootElement);
	var error = this.parseIllumination(rootElement);
	var error = this.parseTextures(rootElement);
	var error = this.parseMaterials(rootElement);
	var error = this.parseLights(rootElement);
	var error = this.parseTransformations(rootElement);
	var error = this.parsePrimitives(rootElement);
	var error = this.parseComponents(rootElement);
	

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
}

MySceneGraph.prototype.toRGBA = function(element){
	
	var tmpData = {
		r : 0,
		g : 0,
		b : 0,
		a : 1
	};
	tmpData.r = this.reader.getFloat(element, 'r');
	tmpData.g = this.reader.getFloat(element, 'g');
	tmpData.b = this.reader.getFloat(element, 'b');
	tmpData.a = this.reader.getFloat(element, 'a');
	console.log(tmpData.r + " " + tmpData.g + " " + tmpData.b + " " + tmpData.a)
	return tmpData;
}

MySceneGraph.prototype.to4Vector = function(element){
	
	var point4v = {
		x : 0,
		y : 0,
		z : 0,
		w : 1.0
	};
		
	point4v.x = this.reader.getFloat(element, "x");
	point4v.y = this.reader.getFloat(element, "y");
	point4v.z = this.reader.getFloat(element, "z");
	point4v.w = this.reader.getFloat(element, "w");

	return point4v;
}

MySceneGraph.prototype.to3Vector = function(element){
	
	var point3v = {
		x : 0,
		y : 0,
		z : 0,
	};
		
	point3v.x = this.reader.getFloat(element, "x");
	point3v.y = this.reader.getFloat(element, "y");
	point3v.z = this.reader.getFloat(element, "z");

	return point3v;
}

/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample = function(rootElement) {
	
	var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null  || tempList.length==0) {
		return "list element is missing.";
	}
	
	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	}
};

MySceneGraph.prototype.parseGlobals = function(rootElement) {
	
	var elems =  rootElement.getElementsByTagName('scene');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.root = this.reader.getString(globals, 'root');
	this.axisLength = this.reader.getFloat(globals, 'axis_length');

	console.log("Globals read from file: {root=" + this.root + ", axis_length=" + this.axisLength + "}");

};

MySceneGraph.prototype.parseViews = function(rootElement) {
	
	var elems=rootElement.getElementsByTagName('views');

	if (elems == null  || elems.length == 0) {
		return "materials element is missing or is more than one";
	}
	
	var views = elems[0];
	this.defaultView = this.reader.getString(views, 'default');
	
	console.log("Default view: "+ this.defaultView);
	
	// iterate over every element	
	var nnodes=elems[0].children.length;
	
	for (var i=0; i < nnodes; i++)
	{
		var e = elems[0].children[i];
		var id = this.reader.getString(e, 'id');
		var near = this.reader.getFloat(e, 'near');
		var far = this.reader.getFloat(e, 'far');
		var angle = this.reader.getFloat(e, 'angle');
		var fromVector = this.to3Vector(e.getElementsByTagName('from')[0]);
		var toVector = this.to3Vector(e.getElementsByTagName('to')[0]);
		
		this.views[id] = new View(near, far, angle, fromVector, toVector);
		
		console.log("View read from file: {id=" + id + ", near=" + near + ", far=" + far + ", angle=" + angle + "}");
	}

}

MySceneGraph.prototype.parseIllumination = function(rootElement) {
	
	var elems=rootElement.getElementsByTagName('illumination');

	if (elems == null) {
		return "illumination element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'illumination' element found.";
	}
	
	// various examples of different types of access
	var illumination = elems[0];
	var doublesided = this.reader.getBoolean(illumination, 'doublesided');
	var local = this.reader.getBoolean(illumination, 'local');
	var ambient = this.toRGBA(illumination.children[0]);
	var background = this.toRGBA(illumination.children[1]);
	
	this.illumination = new Illumination(doublesided, local, ambient, background);

	console.log("Illumination read from file: {doublesided=" + doublesided + ", local=" + local + "}");
}

MySceneGraph.prototype.parseLights = function(rootElement) {
	var elems = rootElement.getElementsByTagName('lights');

	if (elems == null  || elems.length==0) {
		return "textures element is missing.";
	}
	
	var lights = elems[0];
	
	var nnodes=lights.children.length;
	
	for(var i=0; i<nnodes;i++){
		var e = lights.children[i];
			var id = this.reader.getString(e, 'id');
			var enabled = this.reader.getBoolean(e, 'enabled');
			var ambient =  this.toRGBA(e.getElementsByTagName('ambient')[0]);
			var diffuse = this.toRGBA(e.getElementsByTagName('diffuse')[0]);
			var specular = this.toRGBA(e.getElementsByTagName('specular')[0]);	
		if(e.tagName == "spot"){
			var location = this.to3Vector(e.getElementsByTagName('location')[0]);
			var target = this.to3Vector(e.getElementsByTagName('target')[0]);	
			var angle = this.reader.getFloat(e,'angle');
			var exponent = this.reader.getFloat(e,'exponent');
			this.lights[id] = new Light(false,enabled, location, ambient, diffuse, specular, target, angle, exponent);
		} else {
			var location = this.to4Vector(e.getElementsByTagName('location')[0]);
			this.lights[id] = new Light(true,enabled, location, ambient, diffuse, specular);
		}
		console.log("Light read from file: {id=" + this.lights[id].getLocation().x + ", enabled=" + enabled + ", location=" + location + ", ambient=" + ambient + ", diffuse=" + diffuse + ", specular=" + specular + ", angle=" + angle + ", exponent=" + exponent + "}");
	}
}

MySceneGraph.prototype.parseTextures = function(rootElement) {
	
	var tempList=rootElement.getElementsByTagName('textures');

	if (tempList == null  || tempList.length==0) {
		return "textures element is missing.";
	}
	
	this.textures=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];
		var file = e.attributes.getNamedItem("file").value;
		var s = e.attributes.getNamedItem("length_s").value;
		var t = e.attributes.getNamedItem("length_t").value;
		var texture = new Texture(file, s, t);
		
		// process each element and store its information
		this.textures[e.id]=texture;
		console.log("Read textures item id "+ e.id +" from file "+ file +" with length s: "+ s +" and length t: " + t);
	}

}

MySceneGraph.prototype.parseMaterials = function(rootElement) {
	
	var elems=rootElement.getElementsByTagName('materials');

	if (elems == null  || elems.length == 0) {
		return "materials element is missing or is more than one";
	}
	
	// iterate over every element	
	
	var nnodes=elems[0].children.length;
	
	for (var i=0; i < nnodes; i++)
	{
		var e = elems[0].children[i];
		var emission = this.toRGBA(e.getElementsByTagName("emission")[0]);
		var ambient = this.toRGBA(e.getElementsByTagName("ambient")[0]);
		var diffuse = this.toRGBA(e.getElementsByTagName("diffuse")[0]);
		var specular = this.toRGBA(e.getElementsByTagName("specular")[0]);
		var shininess = this.reader.getFloat(e.getElementsByTagName("shininess")[0], 'value');
		var material = new Material(emission, ambient, diffuse, specular, shininess);		
		
		this.materials[e.id] = material;
	}
		console.log("Read material item id "+ e.id );
}


MySceneGraph.prototype.parseTransformations = function(rootElement) {
	var tempList = rootElement.getElementsByTagName('transformations');

	if (tempList == null  || tempList.length==0) {
		return "textures element is missing.";
	}
	this.transformations=[];
	var transformations = tempList[0];
	
	var nnodes=transformations.children.length;
	
	for (var i=0; i < nnodes; i++)
	{
		var e = transformations.children[i]; 
		this.transformations[e.id] = new Transformation();
		for(var j = 0; j<e.children.length; j++)
		{
			var transf = e.children[j];
			switch(transf.tagName){
				case 'translate':
				var translating = this.to3Vector(transf);
				this.transformations[e.id].applyTranslation(translating);
				console.log("Read translate item id "+ e.id +"x: " + translating.x+ "y: " + translating.y+"z: " + translating.z);
				break;
				case 'rotate':
				var rotate_axis = this.reader.getString(transf,'axis');
				var rotate_angle = this.reader.getFloat(transf,'angle') * Math.PI/180;
				this.transformations[e.id].applyRotation(rotate_axis, rotate_angle);
				console.log("Read rotation item id "+ e.id +"axis: " + rotate_axis+ "angle: " + rotate_angle);
				break;
				case 'scale':
				var scaling = this.to3Vector(transf);
				this.transformations[e.id].applyScaling(scaling);
				console.log("Read scale item id "+ e.id + "x: " + scaling.x + "y: " + scaling.y+"z: " + scaling.z);
				break;

				transformations[e.id] = new Transformation();
			}
		}
		console.log(e.id + "ASDSDSDSADSADSA");
	}
};

MySceneGraph.prototype.parsePrimitives = function(rootElement) {
	var tempList=rootElement.getElementsByTagName('primitives');

	if (tempList == null  || tempList.length==0) {
		return "primitives element is missing.";
	}
	
	this.primitives=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e = tempList[0].children[i];
		var prim = e.children[0];
		switch (prim.nodeName){
			case "rectangle":
				var x1 = prim.attributes.getNamedItem("x1").value;
				var y1 = prim.attributes.getNamedItem("y1").value;
				var x2 = prim.attributes.getNamedItem("x2").value;
				var y2 = prim.attributes.getNamedItem("y2").value;
				this.primitives[e.id] = new Rectangle(this.scene, x1, y1, x2, y2);
				break;
			case "triangle":
				var x1 = prim.attributes.getNamedItem("x1").value;
				var y1 = prim.attributes.getNamedItem("y1").value;
				var z1 = prim.attributes.getNamedItem("z1").value;
				var x2 = prim.attributes.getNamedItem("x2").value;
				var y2 = prim.attributes.getNamedItem("y2").value;
				var z2 = prim.attributes.getNamedItem("z2").value;
				var x3 = prim.attributes.getNamedItem("x3").value;
				var y3 = prim.attributes.getNamedItem("y3").value;
				var z3 = prim.attributes.getNamedItem("z3").value;
				this.primitives[e.id] = new Triangle(this.scene, x1, y1, z1, x2, y2, z2, x3, y3, z3);
				break;
			case "cylinder":
				var base = prim.attributes.getNamedItem("base").value;
				var top = prim.attributes.getNamedItem("top").value;
				var height = prim.attributes.getNamedItem("height").value;
				var slices = prim.attributes.getNamedItem("slices").value;
				var stacks = prim.attributes.getNamedItem("stacks").value;
				this.primitives[e.id] = new Cylinder(this.scene, slices, stacks);
				break;
			case "sphere":
				var radius = prim.attributes.getNamedItem("radius").value;
				var slices = prim.attributes.getNamedItem("slices").value;
				var stacks = prim.attributes.getNamedItem("stacks").value;
				this.primitives[e.id] = new Sphere(this.scene, radius, slices, stacks);
				break;
			case "torus":
				var inner = this.reader.getInteger(prim,'inner');
				var outer =  prim.attributes.getNamedItem("outer").value;
				var slices = prim.attributes.getNamedItem("slices").value;
				var loops =  prim.attributes.getNamedItem("loops").value;
				
				var inner = this.reader.getString(prim,'inner');
				
				console.log("TORUS INNER: " + inner + "OUTER: " + outer + "SLICES: " + slices + "LOOPS: " + loops);
				this.primitives[e.id] = new Torus(this.scene, 1, outer, slices, 20);
				console.log("TORUS INNER: " + inner + "OUTER: " + outer + "SLICES: " + slices + "LOOPS: " + loops);
				//break;
		}
		
		
		console.log("Read primitives item id "+ e.id + prim.nodeName + this.primitives[e.id]);
	}

};

MySceneGraph.prototype.parseComponents = function(rootElement) {
	
	var elems=rootElement.getElementsByTagName('components');

	if (elems == null  || elems.length==0) {
		return "components element is missing.";
	}
	
	this.components=[];
	// iterate over every element
	var nnodes=elems[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e = elems[0].children[i];
		var transf = e.children[0];
		var temp_transf = new Transformation();
		for(var j=0; j< transf.children.length; j++){
			switch(transf.children[j].tagName){
 				case 'translate':
 				var translating = this.to3Vector(transf.children[j]);
 				temp_transf.applyTranslation(translating);
 				console.log("Read translate item id "+ e.id +"x: " + translating.x+ "y: " + translating.y+"z: " + translating.z);
 				break;
 				case 'rotate':
 				var rotate_axis = this.reader.getString(transf.children[j],'axis');
 				var rotate_angle = this.reader.getFloat(transf.children[j],'angle') * Math.PI/180;
 				temp_transf.applyRotation(rotate_axis, rotate_angle);
 				console.log("Read rotation item id "+ e.id +"axis: " + rotate_axis+ "angle: " + rotate_angle);
 				break;
 				case 'scale':
 				var scaling = this.to3Vector(transf.children[j]);
 				temp_transf.applyScaling(scaling);
 				console.log("Read scale item id "+ e.id +"x: " + scaling.x+ "y: " + scaling.y+"z: " + scaling.z);
 				break;
 				case 'transformationref':
				console.log(temp_transf.getMatrix());
				console.log("READ tranformation item id "+ (this.transformations[this.reader.getString(transf.children[j], "id")]).getMatrix());
 				temp_transf.multMatrix((this.transformations[this.reader.getString(transf.children[j], "id")]).getMatrix());
				console.log(temp_transf.getMatrix());
 				break;
 			}
		}
		var mat = e.children[1];
		var temp_mat=[];
		for(var j=0; j< mat.children.length; j++){
			temp_mat[j] = mat.children[j].id;
			//console.log("MATERIAL COMPONENT ID :" +mat.children[j].id +" DO COMP" + e.id);
		}
		var textu = e.children[2];
		var temp_text =  textu.id;
			console.log("TEXTURE COMPONENT ID :" +textu.id +" DO COMP" + e.id);
		var childrenc = e.children[3];
		var temp_child=[];
		for(var j=0; j< childrenc.children.length; j++){
			temp_child[j] = childrenc.children[j].id;
			console.log("CHILDREN COMPONENT ID :" +childrenc.children[j].id +" DO COMP" + e.id);
		}
		this.components[e.id] = new Component(temp_transf, temp_mat, temp_text, temp_child);

 			//console.log("Read components item id "+ e.id +  transf.nodeName + transf.children[j].nodeName);
	}
		//console.log("Read components item id "+ e.id + transf.nodeName);
};

	
/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError = function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
}
