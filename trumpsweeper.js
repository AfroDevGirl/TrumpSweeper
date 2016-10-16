var Cell = function(location){
	this.clicked = false;
	this.row = location[0];
	this.cell = location[1];
	this.isMine = false;
	this.numOfMines = 0;
};

var Game = function(){
	this.board = {
		"row0": [],
		"row1": [],
		"row2": [],
		"row3": [],
		"row4": [],
		"row5": [],
		"row6": [],
		"row7": [],
		"row8": [],
	}; 
	this.generateMines = function(){
		var mineLocations = [];
		var row = 0;
		var cell = 0;

		for(var i = 0; i < 9; i++){
			row = Math.random() * (9 - 0) + 0;
			cell = Math.random() * (9 - 0) + 0;
			mineLocations.push({row: row,cell: cell});
		}

		mineLocations.sort(function(a,b){
			if(a.row > b.row){
				return 1;
			}
			if(a.row < b.row){
				return -1;
			}
			return 0;
		})
		console.log(mineLocations);
		return mineLocations;
	}
	this.generateBoard = function(){
		var generatedMines = this.generateMines;
		for(var i = 0; i < 9; i++){
			var currentRow = "row" + i;
			for(var x = 0; x < 9; x++){
				this.board[currentRow].push(new Cell([i,x]));
			}
		}
	}
};

$(document).ready(function(){
	console.log("hello");
	$("button").on("click", function(){
		// var newGame = new Game();
		// newGame.generateBoard();
		console.log("newGame");
	})
});