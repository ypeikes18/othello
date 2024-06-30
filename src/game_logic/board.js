import {WHITE, BLACK, TIE} from "./constants.js";
import {InclusiveSet} from "./utils.js"

export default class Board {

    constructor() {
        this.grid = this.createBoard();
        this.directions = [[-1,-1], [-1,0], [-1,1],
                           [1, -1], [1, 0], [1, 1],
                           [0,-1], [0,1]]
        this.edges = this.createEdges(); //InclusiveSet
        this.emptySpace = this.emptySpace.bind(this)
        this.corners = [[0,0],[0,7],[7,0],[7,7]]
    }

    createBoard() {
        const grid = [];
        let arr;
        for(let i = 0; i <8; i++) {
            arr = new Array(8);
            grid.push(arr.fill(null))
        }
        [grid[3][4], grid[4][3]] = [WHITE, WHITE];
        [grid[4][4], grid[3][3]] = [BLACK, BLACK];

        return grid;
    }

    createEdges() {
        const initialEdges = [[2,2],[2,3], [2,4], [2,5],
                        [3,2], [3,5], [4,2], [4,5],
                        [5,2], [5,3], [5,4], [5,5]];
        return new InclusiveSet(initialEdges)
    }

    isCorner(coordinates) {
        for(let corner of  this.corners) {
            if(coordinates[0] === corner[0] && coordinates[1] === corner[1]) {
                return true;
            }
        }
        return false;
    }

    updateEdges(coordinates) {
        this.edges.delete(coordinates);
        this.directions.forEach(direction => {
            const row = coordinates[0] + direction[0]; 
            const column = coordinates[1] + direction[1]; 
            const candidateCoordinates = [row, column]
            if(this.onBoard(candidateCoordinates) && this.emptySpace(candidateCoordinates)) {
                this.edges.add(candidateCoordinates)
            }
        })
    }

    onBoard(coordinates) {
        const row = coordinates[0];
        const column = coordinates[1];
        return this.numOnBoard(row) && this.numOnBoard(column)
    }

    numOnBoard(num){
        return num >= 0 && num <=7
    }

    otherColor(color) {
        return (color === WHITE ? BLACK : WHITE)
    }

    emptySpace(coordinates) {
        const [row, column] = [coordinates[0], coordinates[1]];
        return this.grid[row][column] === null;
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
            } else if(this.grid[row][column] === null) {
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

    tryMove(color, coordinates) {
        if (!this.onBoard(coordinates)) {
            throw new Error(`Invalid Move: Coordinates ${coordinates} are out of bounds`);
        }
        if (!this.emptySpace(coordinates)) {
            throw new Error(`Invalid Move: Space at ${coordinates} is not empty`);
        }
        let flipped = false;
    
        for (let direction of this.directions) {
            if (this.flipableDirection(color, coordinates, direction)) {
                this.flip(color, coordinates, direction);
                flipped = true;
            }
        }
        if (flipped) {
            this.updateEdges(coordinates);
            return;
        }
        throw new Error(`Invalid Move: No pieces can be flipped from ${coordinates}`);
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
        for(const edge of this.edges.getElements()) {
            if(movable) break;
            for(const direction of this.directions) {                
                if(this.flipableDirection(color, edge, direction)) {
                    movable = true;
                    break;
                }
            }
        }
        return movable;
    }

    //returns a list
    getValidMoves(color) {
        const moves = new InclusiveSet()
        for(let coordinates of this.edges.getElements()) {
            if(this.isValidMove(color, coordinates)) {
                moves.add(coordinates)
            }
        }
        return moves.getElements()
    }

    isValidMove(color, coordinates) {
        for(let direction of this.directions) {
            const isValidDirection = this.flipableDirection(color, coordinates, direction) 
            if(isValidDirection) return true;
        }
        return false;
    }

    neitherCanMove() {
        return !(this.canMove(WHITE) || this.canMove(BLACK))
    }

    boardFull() {
        return !this.edges.getSize()
    }

    winner() {
        const score = {white: 0, black: 0, null: 0};
        this.grid.flat().forEach(ele => {
            score[ele] += 1;
        })

        if(score.white > score.black) {
            return WHITE;
        } else if (score.white < score.black){
            return BLACK;
        } else {
            return TIE
        }
    }

}

