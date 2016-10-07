
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	this.textures = [];
	
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
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);
	var error = this.parseTextures(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {
	
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
	};

};

MySceneGraph.prototype.parseTextures= function(rootElement) {
var elems =  rootElement.getElementsByTagName('textures');
	/*if (elems == null) {
		return "textures element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'textures' element found.";
	}

	// various examples of different types of access
	var textures = elems;
	for (var i = 0; i < textures.length; i++) // For each texture
		{
			var id = this.reader.getString(textures[i], 'id');
			var file = this.reader.getString(textures[i], 'file');
			var s = this.reader.getFloat(textures[i], 'length_s');
			var t = this.reader.getFloat(textures[i], 'length_t');
			
			this.textures[i] = new Texture(id, file, s, t);
		
		console.log("Textures read from file: {id=" + id + ", file=" + file + ", s=" + s + ", t=" + t + "}");

		}*/
		
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
	};

}
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


