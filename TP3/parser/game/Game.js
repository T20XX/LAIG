/**
 * Game
 * @constructor
 */
 
 
function Game(scene) {
	//call CGFinterface constructor 
	CGFinterface.call(this);
	this.scene = scene;
	//GAMESTATES {WAITING_MOVE, MOVING_PIECE, INITIALIZING_GAME, GAME_END}
	this.gameState = "INITIALIZING_GAME";
	this.initializeGame();
};

Game.prototype = Object.create(CGFinterface.prototype);
Game.prototype.constructor = Game;

Game.prototype.initializeGame = function(){
	this.board = [];
	
}
