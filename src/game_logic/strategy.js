import {factorial, loadModel} from "./utils";

class MoveEvaluator {

    constructor() {
        this.model = null;
    }

    canTakeCorner(board) {
        for(let corner of board.corners) {
        }
    }

    getMaxNumGameTreeNodes(board) {
        const emptySpaces = 64 - board.edges;
        return factorial(emptySpaces);
    }


    async getBestMove(game) {
        if(!this.model) this.model = loadModel();
    }
    
}

export default MoveEvaluator;
