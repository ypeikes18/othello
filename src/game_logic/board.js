import {WHITE, BLACK, TIE} from "./constants";

export default class Board {

    constructor() {
        this.grid = this.createBoard();
        this.directions = [[-1,-1], [-1,0], [-1,1],
                           [1, -1], [1, 0], [1, 1],
                           [0,-1], [0,1]]
        this.edges = this.createEdges();
        this.emptySpace = this.emptySpace.bind(this)
        this.corners = [[0,0],[0,7],[7,0],[7,7]]
    }

    createBoard() {
        const grid = [];
        let arr;
        for(let i = 1; i <=8; i++) {
            arr = new Array(8);
            grid.push(arr.fill(null))
        }
        [grid[3][4], grid[4][3]] = [WHITE, WHITE];
        [grid[4][4], grid[3][3]] = [BLACK, BLACK];

        return grid;
    }

    createEdges() {
        const initialEdges = ['[2,2]', '[2,3]', '[2,4]', '[2,5]',
                        '[3,2]', '[3,5]', '[4,2]', '[4,5]',
                        '[5,2]', '[5,3]', '[5,4]', '[5,5]'];
        return new Set(initialEdges)
    }

    isCorner(coordinates) {
        for(let corner of  this.corners) {
            if(coordinates[0] == corner[0] && coordinates[1] == corner[1]) {
                return true;
            }
        }
        return false;
    }

    updateEdges(coordinates) {
        this.edges.delete(JSON.stringify(coordinates));
        this.directions.forEach(direction => {
            const row = coordinates[0] + direction[0]; 
            const column = coordinates[1] + direction[1]; 
            const candidateCoordinates = [row, column]
            const newEdge = JSON.stringify(candidateCoordinates);
            if(!this.onBoard(candidateCoordinates) && this.emptySpace(candidateCoordinates)) {
                this.edges.add(newEdge)
            }
        })
    }

    edgeToArray(edge) {
        return JSON.parse(edge)
    }

    getEdgeArrays() {
        const edgeArrays = [];
        for (let edge of this.edges) {
            edgeArrays.push(this.edgeToArray(edge))
        }
        return edgeArrays;
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
        let flipped = false;
        if(!this.emptySpace(coordinates)) throw new Error("Invalid Move");

        this.directions.forEach(direction => {
            if(this.flipableDirection(color, coordinates, direction)){
                this.flip(color, coordinates, direction);
                flipped = true;
            }
        })
        if(flipped) {
            this.updateEdges(coordinates);
            return
        }
        throw new Error("Invalid Move");
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

    getValidMoves(color) {
        const moves = []
        for(const edge of this.edges) {
            for(const direction of this.directions) {
                const coordinates = this.edgeToArray(edge)   
                if(this.flipableDirection(color, coordinates, direction)) {
                    moves.push(coordinates)
                }
            }
        }
        return moves
    }

    neitherCanMove() {
        return !(this.canMove(WHITE) || this.canMove(BLACK))
    }

    boardFull() {
        return !this.edges.size
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

