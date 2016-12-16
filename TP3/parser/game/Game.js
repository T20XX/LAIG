/**
 * Game
 * @constructor
 */
 
 
function Game(scene) {
	//call CGFinterface constructor 
	CGFinterface.call(this);
	this.scene = scene;
    this.board = [1,2];

	//GAMESTATES {INITIALIZING_GAME, WAITING_MOVE, MOVING_PIECE, GAME_END}
	this.gameState = "INITIALIZING_GAME";
};

Game.prototype = Object.create(CGFinterface.prototype);
Game.prototype.constructor = Game;

Game.prototype.initializeGame = function(gameMode, gameDifficulty){
	//this.board = [];
    var board;
	console.log("vou correr");
    this.board = getPrologRequest("initializeBoard", (function(data) {
        Game.board;
        board = data.target.response;
        console.log(Game.board);
    }),(function() {
        console.log("Erro");
    }));
    this.board = board;

	this.gameMode = gameMode || 1;
	this.gameDifficulty = gameDifficulty || 1;
	this.currentPlayer =  1;
	this.gameHistory = [];
	this.movesHistory = [];
	this.winner = 0;
	switch (this.gameMode){
        case 1:
            this.player1Type = 0;
            this.player2Type = 0;
            break;
        case 2:
            this.player1Type = 0;
            this.player2Type = 1;
            break;
        case 3:
            this.player1Type = 1;
            this.player2Type = 1;
            break;
		default:
			return false;
    }
    console.log(this.board);

    return true;
	
}

Game.prototype.changePlayer = function(){
	if (this.currentPlayer == 1){
		this.currentPlayer = 2;
	}else if (this.currentPlayer == 2){
		this.currentPlayer = 1;
	}else{
		return false;
	}
	return true;
}

Game.prototype.getBoard = function(){
    console.log(this.board);
    return this.board;
}

Game.prototype.setBoard = function(board){
    this.board = board;
}

Game.prototype.initializeBoardOnSuccess = function(data){
    console.log("BEFOOOOORE:  " + this.board);
    this.board = data;
    console.log("afteeeeer:  " + this.board);
}
