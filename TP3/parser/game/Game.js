var board = [1,2];
var gameMode;
var gameDifficulty;
var currentPlayer;
var gameHistory;
var movesHistory;
var winner;
var player1Type;
var player2Type;

function initializeGameVariables(newGameMode, newGameDifficulty){
    this.board = getPrologRequest("initializeBoard", (function(data) {
        setBoard(JSON.parse(data.target.response));
    }),(function() {
        console.log("Erro");
    }));

	gameMode = newGameMode || 1;
    gameDifficulty = newGameDifficulty || 1;
     currentPlayer =  1;
     gameHistory = [];
     movesHistory = [];
     winner = 0;
	switch (this.gameMode){
        case 1:
             player1Type = 0;
             player2Type = 0;
            break;
        case 2:
            player1Type = 0;
            player2Type = 1;
            break;
        case 3:
            player1Type = 1;
            player2Type = 1;
            break;
		default:
			return false;
    }

    return true;
	
}

function changePlayer(){
	if (currentPlayer == 1){
		currentPlayer = 2;
	}else if (currentPlayer == 2){
		currentPlayer = 1;
	}else{
		return false;
	}
	return true;
}

function setBoard(newBoard){
    board = newBoard;
}