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
	
	this.gui = new dat.GUI();

	// add a group of controls (and open/expand by defult)
	
	this.luzes=this.gui.addFolder("Lights");
	this.luzes.open();

	return true;
};

Interface.prototype.addLights = function(lights) {
	this.scene.lightStates = [];
	var i = 0;
    for(id in lights)
    {
        this.scene.lightStates[i] = lights[id].isEnabled();
        this.luzes.add(this.scene.lightStates, i);
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