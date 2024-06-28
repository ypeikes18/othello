import {factorial} from "./utils";

class MoveEvaluator {

    constructor() {
        
    }

    canTakeCorner(board) {
        for(let corner of board.corners) {
        }
    }

    getMaxNumGameTreeNodes(board) {
        const emptySpaces = 64 - board.edges;
        return factorial(emptySpaces);
    }
    
}

export default MoveEvaluator;
