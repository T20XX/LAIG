/**
 * Interface
 * @constructor
 */
 
 
function Interface(scene) {
	//call CGFinterface constructor 
	CGFinterface.call(this);
	this.scene = scene;
};

Interface.prototype = Object.create(CGFinterface.prototype);
Interface.prototype.constructor = Interface;

/**
 * init
 * @param {CGFapplication} application
 */
Interface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	dat.GUI.prototype.removeFolder = function(name) {
	    var folder = this.__folders[name];
	    if (!folder) {
	      return;
	    }
	    folder.close();
	    this.__ul.removeChild(folder.domElement.parentNode);
	    delete this.__folders[name];
	    this.onResize();
	  }
	
	dat.GUI.prototype.folderExists = function(name) {
	    var folder = this.__folders[name];
	    if (!folder) {
	      return false;
	    }
	    return true;
	  }
	
	this.gui = new dat.GUI();

	// add a group of controls (and open/expand by defult)
	
	this.lights=this.gui.addFolder("Lights");
	this.lights.open();

	
	return true;
};

Interface.prototype.addFolder = function(name) {
	switch(name) {
	case "Lights":
		if(!this.gui.folderExists(name))
			this.lights = this.gui.addFolder(name);	
		return;
	case "Play Mode":
		if(!this.gui.folderExists(name))
			this.modeFolder = this.gui.addFolder(name);
		return;
	case "Start Game":
		if(!this.gui.folderExists(name))
			this.startGameFolder = this.gui.addFolder(name);
		return;
	case "Game Movie":
		if(!this.gui.folderExists(name))
			this.gameMovieFolder = this.gui.addFolder(name);
		return;
	}
}


Interface.prototype.removeFolder = function(name) {
	switch(name) {
	case "Lights":
		if(this.gui.folderExists(name))
			this.lights = this.gui.removeFolder(name);	
		return;
	case "Play Mode":
		if(this.gui.folderExists(name))
			this.modeFolder = this.gui.removeFolder(name);
		return;
	case "Start Game":
		if(this.gui.folderExists(name))
			this.startGameFolder = this.gui.removeFolder(name);
		return;
	case "Game Movie":
		if(this.gui.folderExists(name))
			this.gameMovieFolder = this.gui.removeFolder(name);
		return;
	}
}

Interface.prototype.resetFolders = function() {
	var names = ["Play Mode", "Start Game", "Game Movie"];
	for(var i = 0; i < names.length; ++i) {
		this.removeFolder(names[i]);
	}
}
Interface.prototype.resetFolder = function(name) {
	if(name == "Lights" || name == "Play Mode" || name == "Start Game" || name == "Game Movie") {
		this.removeFolder(name);
		this.addFolder(name);
	}
}

Interface.prototype.initStartMenu = function(movie) {
	this.resetFolders();
	this.resetFolder("Start Game");
	this.startGameFolder.add(this.scene, 'startGameDifficulty', this.scene.startGameDifficulties).name("Game Type");
	this.startGameFolder.add(this.scene, 'scenarioName', this.scene.scenarioNames).name("Scenario");
	var play_timeout = this.startGameFolder.add(this.scene, 'timeoutTurn', 10, 120, 1);
	play_timeout.name("Play Timeout");
	play_timeout.step(5);
	this.startGameFolder.add(this.scene, 'gameMovie').name("Last Game Movie");
	this.startGameFolder.add(this.scene, 'startGame').name("Start Game");
	
	this.startGameFolder.open();
}

Interface.prototype.initPlayMode = function() {
	this.resetFolders();
	this.resetFolder("Play Mode");
	
	this.camera = this.modeFolder.add(this.scene, 'curCameraName', this.scene.camerasName).name("Camera");

    this.modeFolder.add(this.scene, "showScoreboard").name("Scoreboard");
	
	this.modeFolder.add(this.scene, "undo").name("Undo Move");
	this.modeFolder.add(this.scene, "backMenu").name("Main Menu");
	this.modeFolder.add(this.scene, "startGame").name("Restart game");
	
	this.modeFolder.open();
}


Interface.prototype.initGameMovie = function() {
	this.resetFolders();
	this.resetFolder("Game Movie");
	
	this.camera = this.gameMovieFolder.add(this.scene, 'curCameraName', this.scene.camerasName).name("Camera");
	this.gameMovieFolder.add(this.scene, 'gameMovie').name("Restart Game Movie");
	this.gameMovieFolder.add(this.scene, "backMenu").name("Main Menu");
	//this.gameMovieFolder.add(this.scene, "gameEndMovie").name("End movie");
	
	this.gameMovieFolder.open();
}

Interface.prototype.addLights = function(lights) {
	this.scene.lightStates = [];
	var i = 0;
    for(id in lights)
    {
        this.scene.lightStates[i] = lights[id].isEnabled();
        this.lights.add(this.scene.lightStates, i);
		i++;
    }
}

Interface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyDown.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (118):
   			this.scene.processVDown();
   			break;
  		case (86):
   			this.scene.processVDown();
   			break;
		case (109):
			this.scene.processMDown();
			break;
		case (77):
			this.scene.processMDown();
			break;
	};
};