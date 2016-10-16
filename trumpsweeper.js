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
		function isThereADup(array, object){
			for(var i = 0; i < array.length - 1; i++){
				if(array[i].row == object.row && array[i].cell == object.cell){
					return true;
				}
			}
			return false;
		}
		function generateLocation(){
			row = Math.floor(Math.random() * (9 - 0)) + 0;
			cell = Math.floor(Math.random() * (9 - 0)) + 0;

			return {row: row,cell: cell};
		}
		for(var i = 0; i < 9; i++){
			var location = generateLocation();
			var check = isThereADup(mineLocations, location);

			while(check){
				location = generateLocation();
				check = isThereADup(mineLocations, location);
			}

			mineLocations.push(location);
		}

	
		console.log(mineLocations);
		return mineLocations;
	}
	this.generateBoard = function(){
		var generatedMines = this.generateMines();

		for(var i = 0; i < 9; i++){
			var currentRow = "row" + i;
			for(var x = 0; x < 9; x++){
				this.board[currentRow].push(new Cell([i,x]));
			}
		}
		var x;
		for(x in generatedMines){
			var row = "row" + generatedMines[x].row;
			var cell = generatedMines[x].cell;
			this.board[row][cell].isMine = true;
		}
	}
	this.printBoard = function(){
		for(var x = 0; x < 9; x++){
			var row = "row" + x;
			for(var y = 0; y < 9; y++){
				if(this.board[row][y].isMine == true){
					$("#row-"+x+">#cell-"+y).text("X");
				}
			}
		}
	}
	this.clearBoard = function(){
		for(var x = 0; x < 9; x++){
			for(var y = 0; y < 9; y++){
				$("#row-"+x+">#cell-"+y).text("");
			}
		}
	}
};

$(document).ready(function(){
	$("button").on("click", function(){
		var newGame = new Game();
		newGame.clearBoard();
		newGame.generateBoard();
		newGame.printBoard();
		
	})
});