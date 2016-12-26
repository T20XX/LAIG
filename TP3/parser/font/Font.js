/**
 * Font
 * @param scene
 * @constructor
 */
function Font(scene, color, backgroundColor) {
	CGFobject.call(this,scene);
	this.scene = scene;

	this.du = 11;
	this.su = 9;
	this.color = color;
	this.backgroundColor = backgroundColor;

	this.board = new Plane(this.scene,1,1,10,10);


	this.shader = new CGFshader(this.scene.gl, "shaders/Font.vert", "shaders/Font.frag");

	this.shader.setUniformsValues({du: this.du});
	this.shader.setUniformsValues({su: this.su});
	this.shader.setUniformsValues({color: this.color});
    this.shader.setUniformsValues({backgroundColor: this.backgroundColor});

	this.appearance = new CGFappearance(this.scene);
	this.appearance.loadTexture("./font/font.png");

}


Font.prototype = Object.create(CGFobject.prototype);
Font.prototype.constructor=Font;

Font.prototype.display = function(){
this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.setActiveShader(this.shader);
	this.board.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
}
Font.prototype.displayNumber = function(number){
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.setActiveShader(this.shader);
	do{
		this.scene.pushMatrix();
        this.setChar(number%10);
        this.scene.translate(number.toString().length-1,0,0);
        this.board.display();
        this.scene.popMatrix();
        number = Math.floor(number/10);
	}while (number != 0);
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
}

Font.prototype.displayTime = function(minutes, seconds){
	this.scene.pushMatrix();
	this.displayNumber(minutes);
    this.scene.translate(minutes.toString().length,0,0);
    this.displayTimeSeparator();
    this.scene.translate(1,0,0);
    this.displayNumber(seconds);
	this.scene.popMatrix();

}

Font.prototype.displayTimeSeparator = function(){
	this.scene.pushMatrix();
        this.setChar(10);
        this.display();
    this.scene.popMatrix();

}

Font.prototype.setChar = function(char){
	this.su = char;
	this.shader.setUniformsValues({su: this.su});
}