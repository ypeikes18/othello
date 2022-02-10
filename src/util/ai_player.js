import Board from "./board";

class AIPlayer {
    
    constructor(board, color) {
        this.board = new Board();
        this. color = color;
        this.gameTree = new GameTree()
    }



}

const factorials = (num) => {
    if(num === 1 || num === 0) {
        return num;
    }
    return num * factorials(num - 1);
}