export default class Board {

    constructor() {
        this.grid = this.createBoard();
        this.directions = [[-1,-1], [-1,0], [-1,1],
                           [1, -1], [1, 0], [1, 1],
                           [0,-1], [0,1]]
        this.edges = this.createEdges();
    }

    createBoard() {
        const grid = new Array;
        let arr;
        for(let i = 1; i <=8; i++) {
            arr = new Array(8);
            grid.push(arr.fill('none'))
        }
        [grid[3][4], grid[4][3]] = ['white', 'white'];
        [grid[4][4], grid[3][3]] = ['black', 'black'];

        return grid;
    }

    createEdges() {
        const edges = new Set();
        const initialEdges = ['22', '23', '24', '25',
                        '32', '35', '42', '45',
                        '52', '53', '54', '55'];
        initialEdges.forEach(edge => {
            edges.add(edge);
        })

        return edges;
    }

    updateEdges(coordinates) {
        this.edges.delete(coordinates.join(''));
        let newEdge, row, column;
        
        this.directions.forEach(direction => {
            row = coordinates[0] + direction[0]; 
            column = coordinates[1] + direction[1]; 
            newEdge = `${row}${column}`;
            if(this.onBoard([row, column]) && 
               this.grid[row][column] === 'none') {
                this.edges.add(newEdge)
            } else if(this.onBoard([row, column]) && 
              this.grid[row][column] !== 'none'){
                this.edges.delete(newEdge);
            }
        })
    }

    edgeToArray(edge) {
        const arr = [];
        edge.split('').forEach(point => {
            arr.push(parseInt(point))
        });
        return arr;
    }

    onBoard(coordinates) {
        const row = coordinates[0];
        const column = coordinates[1];

        return (row >= 0 && 
                row <= 7 && 
                column >= 0 && 
                column <= 7);
    }


    otherColor(color) {
        return (color === 'white' ? 'black' : 'white')
    }

    emptySpace(coordinates) {
        const [row, column] = [coordinates[0], coordinates[1]];
        return this.grid[row][column] === 'none';
    }


    //returns true if the direction can be flipped
    flipableDirection(color, coordinates, direction) {
        let row = coordinates[0] + direction[0];
        let column = coordinates[1] + direction[1];
        let flipped = false;
        let valid = false;

        while(this.onBoard([row, column])) {
                
              if(this.grid[row][column] === color) {
                  if(flipped) {
                    valid = true;
                    break;

                  } else {
                    valid = false;
                    break;

                  }
              } else if(this.grid[row][column] === 'none') {
                valid = false;
                break;
              } else {
                flipped = true;
              }
              row += direction[0];
              column += direction[1];
        }   
        return valid
    }

    //returns true or false depending on if move happened
    move(color, coordinates) {
        let flipped = false;
        if(!this.emptySpace(coordinates)) return false;

        this.directions.forEach(direction => {
            if(this.flipableDirection(color, coordinates, direction)){
                this.flip(color, coordinates, direction);
                this.updateEdges(coordinates);
                flipped = true;
            }
        })
        return flipped;
    }

    // flips directions we already know are flipable
    // by using the flipable method
    flip(color, coordinates, direction) {
        let [row, column] = [coordinates[0], coordinates[1]];
        this.grid[row][column] = color;
        row += direction[0];
        column += direction[1];

        while(this.grid[row][column] === this.otherColor(color)) {

            this.grid[row][column] = color;

            row += direction[0];
            column += direction[1];
        }
    }

    canMove(color) {
        let movable = false;
        for(const edge of this.edges) {
            if(movable) break;
            for(const direction of this.directions) {                
                if(this.flipableDirection(color, this.edgeToArray(edge), direction)) {
                    movable = true;
                    break;
                }
            }
        }
        return movable;
    }

    neitherCanMove() {
        return !(this.canMove('white') || 
                this.canMove('black'))
    }

    boardFull() {
        return !this.edges.size
    }

    winner() {
        const score = {white: 0, black: 0};
        this.grid.flat().forEach(ele => {
            score[ele] += 1;
        })

        if(score.white > score.black) {
            return 'White';
        } else {
            return 'Black';
        }
    }

}

