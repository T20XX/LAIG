
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	this.textures = [];
	this.materials = [];
	this.primitives = [];
	this.components = [];
	this.omniLights = [];
	this.spotLights = [];
	
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
	var error = this.parseGlobalsExample(rootElement);
	var error = this.parseTextures(rootElement);
	var error = this.parsePrimitives(rootElement);


	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

MySceneGraph.prototype.toRGBA = function(element){
	
	var tmpData = {
		r : 0,
		g : 0,
		b : 0,
		a : 1
	};
	tmpData.r = this.reader.getFloat(element, "r");
	tmpData.g = this.reader.getFloat(element, "g");
	tmpData.b = this.reader.getFloat(element, "b");
	tmpData.a = this.reader.getFloat(element, "a");

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

	return point;
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

	return point;
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
	
	var tempList=rootElement.getElementsByTagName('materials');

	if (tempList == null  || tempList.length!=1) {
		return "materials element is missing or is more than one";
	}
	
	// iterate over every element	
	
	var nnodes=tempList[0].children.length;
	
	for (var i=0; i< nnodes; i++)
	{
		var e = tempList[0].children[i];
		var emission = e.attributes.getNamedItem("emission").value;
		var ambient = e.attributes.getNamedItem("ambient").value;
		var diffuse = e.attributes.getNamedItem("diffuse").value;
		var specular = e.atributes.getNamedItem("specular").value;
		var shininess = e.atributes.getNamedItem("shininess").value;
		var material = new Material(emission, ambient, diffuse, specular, shininess);		
		
		materials[e.id] = material;
		
		console.log("Read material item id "+ e.id );
}


MySceneGraph.prototype.parseLights = function(rootElement) {
	var tempList = rootElement.getElementsByTagName('lights');

	if (tempList == null  || tempList.length==0) {
		return "textures element is missing.";
	}
	
	var lights = tempList[0];
	
	var nnodes=lights.children.length;
	
	for(var i=0; i<nnodes;i++){
		var e = lights.children[i];
		if(e.tagName == "omni"){
			var id = this.reader.getString(omni, "id");
			var enable = this.reader.getBoolean(omni, "enabled");
			var location = this.to4Vector(e.getElementsByTagName("location")[0]);
			var ambient =  this.toRGBA(e.getElementsByTagName("ambient")[0]);
			var diffuse = this.toRGBA(e.getElementsByTagName("diffuse")[0]);
			var specular = this.toRGBA(e.getElementsByTagName("specular")[0]);	
			omniLights[e.id] = omniLight();
		}
		else if(e.tagName == "spot"){
			var id = this.reader.getString(spot, "id");
			var enable = this.reader.getBoolean(spot, "enabled");
			var angle = this.reader.getFloat(spot,"angle");
			var exponent = this.reader.getFloat(spot,"exponent");
			
			var location = this.to3Vector(e.getElementsByTagName("location")[0]);
			var target = this.to3Vector(e.getElementsByTagName("target")[0]);
			var ambient =  this.toRGBA(e.getElementsByTagName("ambient")[0]);
			var diffuse = this.toRGBA(e.getElementsByTagName("diffuse")[0]);
			var specular = this.toRGBA(e.getElementsByTagName("specular")[0]);
			
			spotLights[e.id] = spotLight();
		}
		console.log("Read LIGHT item id "+ e.id );
	}
}


MySceneGraph.prototype.parseTransformations = function(rootElement) {
	var tempList = rootElement.getElementsByTagName('transformations');

	if (tempList == null  || tempList.length==0) {
		return "textures element is missing.";
	}
	
	var transformations = tempList[0];
	
	var nnodes=transformations.children.length;
	
	
	for (var i=0; i< nnodes; i++)
	{
		var e = transformations.children[i].children;
		for(var j = 0; j<e.length; j++)
		{
			var transf = e[j];
			switch(transf.tagName){
				case 'translate':
				var translating = this.to3Vector(transf);
				break;
				case 'rotate':
				var rotate_axis = this.reader.getString(child,'axis');
				var rotate_angle = this.reader.getFloat(child,'angle') * Math.PI/180;
				break;
				case 'scale':
				var scaling = this.to3Vector(transf);
				break;
			}
		}
	}
}

MySceneGraph.prototype.parsePrimitives = function(rootElement) {
	
	var tempList=rootElement.getElementsByTagName('primitives');

	if (tempList == null  || tempList.length==0) {
		return "textures element is missing.";
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
				this.primitives[e.id] = new Sphere(this.scene, slices, stacks);
				break;
				
		}
		
		
		console.log("Read primitives item id "+ e.id + prim.nodeName);
	};

}

MySceneGraph.prototype.parseComponents = function(rootElement) {
	var tempList=rootElement.getElementsByTagName('components');

	if (tempList == null  || tempList.length==0) {
		return "textures components is missing.";
	}
	
	var nnodes=tempList[0].children.length;
	
	for (var i=0; i< nnodes; i++){
		var e = tempList[0].children[i];
		var comp= e.children;
		
		for(var j=0;j< comp.length;j++){
			
			if(comp[j].tagName == "transformation"){
			
				var childTrans = comp[j].children;
			
				for(var k =0;k< childTrans.length; k++){
					if(childTrans[k].tagName == "translate"){
						
					}
					else if(childTrans[k].tagName == "rotate"){
						
					}
					else if(childTrans[k].tagName == "scale"){
						
					}
				}
			}
			
			if(comp[j].tagName == "materials"){
				
			}
			
			if(comp[j].tagName == "texture"){
				
			}
			
			if(comp[j].tagName == "children"){
				
			}
		}
	}
}
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError = function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


