var Cell = function(location){
	this.clicked = false;
	this.row = location[0];
	this.cell = location[1];
	this.isMine = false;
	this.numOfMines = 0;
};

var Game = function(boardSize, totalMines){
	this.boardSize = boardSize;
	this.totalMines = totalMines;
	this.mines;
	this.board = []; 
	this.clickedCells = 0;
	this.isGameOver = false;
	this.maxClearCells = (this.boardSize[0] * this.boardSize[1]) - this.totalMines;

	this.generateMines = function(){
		var mineLocations = [];
		var row = 0;
		var cell = 0;
		var that = this;

		function isThereADup(array, object){
			for(var i = 0; i < array.length - 1; i++){
				if(array[i].row == object.row && array[i].cell == object.cell){
					return true;
				}
			}
			return false;
		}
		function generateLocation(){
			row = Math.floor(Math.random() * (that.boardSize[0] - 0)) + 0;
			cell = Math.floor(Math.random() * (that.boardSize[1] - 0)) + 0;

			return {row: row,cell: cell};
		}
		for(var i = 0; i < this.totalMines; i++){
			var location = generateLocation();
			var check = isThereADup(mineLocations, location);

			while(check){
				location = generateLocation();
				check = isThereADup(mineLocations, location);
			}

			mineLocations.push(location);
		}

		this.mines = mineLocations;
	}

	this.createAreaBox = function(currentLocation){
		var mainRow = currentLocation[0];
		var mainCell = currentLocation[1];
		var topRow = mainRow - 1;
		var bottomRow = mainRow + 1;
		var maxWidth = this.boardSize[1] - 1;
		var maxHeight = this.boardSize[0] - 1;

		if(topRow < 0){
			if(mainCell == 0){
				var box = [[mainRow, mainCell + 1],[bottomRow, mainCell],[bottomRow, mainCell + 1]];	
			} else if(mainCell == maxWidth){
				var box = [[mainRow, mainCell - 1],[bottomRow, mainCell],[bottomRow, mainCell - 1]];
			} else {
				var box = [[mainRow, mainCell-1],[mainRow, mainCell + 1],[bottomRow, mainCell - 1],[bottomRow, mainCell],[bottomRow, mainCell + 1]];
			}
		}else if(bottomRow > maxHeight){
			if(mainCell == 0){
				var box = [[topRow, mainCell],[topRow, mainCell + 1],[mainRow, mainCell + 1]];
			}else if(mainCell == maxWidth){
				var box = [[topRow, mainCell],[topRow, mainCell - 1],[mainRow, mainCell - 1]];
			}else {
				var box = [[topRow, mainCell - 1],[topRow, mainCell],[topRow, mainCell + 1],[mainRow, mainCell-1],[mainRow, mainCell + 1]]
			}
		}else{
			if (mainCell == 0){
				var box = [[topRow, mainCell],[topRow, mainCell + 1],[mainRow, mainCell + 1],[bottomRow, mainCell],[bottomRow, mainCell + 1]]
			}else if(mainCell == maxWidth){
				var box = [[topRow, mainCell],[topRow, mainCell - 1],[mainRow, mainCell - 1],[bottomRow, mainCell],[bottomRow, mainCell - 1]]
			}else{
				var box = [[topRow, mainCell - 1],[topRow, mainCell],[topRow, mainCell + 1],[mainRow, mainCell-1],[mainRow, mainCell + 1],[bottomRow, mainCell - 1],[bottomRow, mainCell],[bottomRow, mainCell + 1]]
			}
		}
		return box;
	}

	this.findMines = function(currentLocation){
		var totalMines = 0;
		var row = currentLocation[0];
		var cell = currentLocation[1];

		if(this.board[row][cell].isMine == false){
			var areaBox = this.createAreaBox([row,cell]);
			for(var y = 0; y < areaBox.length;y++){
				var abRow = areaBox[y][0];
				var abCell = areaBox[y][1];
				
				if(this.board[abRow][abCell].isMine == true){
					totalMines++;
				}
			}
		}
		this.board[row][cell].numOfMines = totalMines;		
	}

	this.generateBoard = function(){
		this.generateMines();
		for(var i = 0; i < this.boardSize[0]; i++){
			var currentRow = [];
			for(var x = 0; x < this.boardSize[1]; x++){
				var newCell = new Cell([i,x]);
				var y;
				for(y in this.mines){
					if(this.mines[y].row == i && this.mines[y].cell == x){
						newCell.isMine = true;
						break;
					}
				}
				currentRow.push(newCell);
			}
			this.board.push(currentRow);
		}
	}

	this.printCell = function(location){
		var row = Number.parseInt($(location).parent().get(0).id);
		var cell = Number.parseInt(location.id);
		var $htmlloc = $(location);
		var boardLoc = this.board[row][cell];

		boardLoc.clicked = true;
		this.clickedCells++;
		this.findMines([row,cell]);

		if(boardLoc.isMine == true){
			for(var i = 0; i < this.mines.length; i++){
				mine = this.mines[i];
				$("tr#" + mine.row + " > td[id='"+ mine.cell + "']").addClass("mine");
			}
			this.isGameOver = true;
					
		} else if(boardLoc.numOfMines > 0){
			var numOfMinesText = boardLoc.numOfMines.toString();
			$htmlloc.addClass("mine-"+numOfMinesText);
			$htmlloc.text(numOfMinesText);
			if(this.clickedCells == this.maxClearCells){
				console.log("hello from the last clicked cell with a mine near it");
				this.isGameOver == true;
			}
		} else {
			$htmlloc.addClass("no-mine");
			if(this.clickedCells == this.maxClearCells){
				console.log("hello from the last clicked cell without a mine near it");
				this.isGameOver == true;
			}
		}

	}

	this.clearBoard = function(){
		$("tr").each(function(index, element){
			$(element).remove();
		});
	}

	this.printBoard = function(){
		this.clearBoard();
		var rows = this.boardSize[0];
		var cells = this.boardSize[1];

		for(var i = 0;i < rows;i++){
			var htmlString = "<tr id='" + i + "'>";
			for(var x = 0;x < cells;x++){
				htmlString = htmlString + "<td id='"+ x + "'></td>";
			}
			$("#gameboard").append(htmlString + "</tr>");
		}
	}
};

$(document).ready(function(){
	$("button").on("click", function(){
		var board = this.id; 
		switch(board){
			case "easy":
				var newGame = new Game([9,9],9);
				break;
			case "medium":
				var newGame = new Game([16,16],40);
				break;
			case "hard":
				var newGame = new Game([16,30],99);
				break;
			default:
				var newGame = new Game([9,9],9);
		}
		newGame.printBoard();
		newGame.generateBoard();
		$("td").on("click", function(e){
			// e.preventDefault();
			newGame.printCell(this);
			if (newGame.isGameOver == true) {
				$("td").each(function(index,element){
					$(element).addClass("disabled");
				});	
			}
		});
	});
});