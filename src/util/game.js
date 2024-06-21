import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.production.min";
import Board from "./board";
const _ = require("lodash")

export default class Game {

    constructor() {
        this.board = new Board();
        this.players = ['black', 'white'];
        this.winner = null;
        this.previousState = this.saveState()
    }

    nextTurn() {
        if(this.gameOver()) {
            this.winner = this.board.winner();
        }
        if(!this.board.canMove(this.currentPlayer())) {
          this.nextTurn();
        }
        this.players.unshift(this.players.pop());
    }

    currentPlayer() {
        return this.players[0]
    }

    // coordinates is an array
    turn(coordinates) {
        if(this.board.move(this.currentPlayer(), coordinates)) {
            this.nextTurn();
        }
    }

    gameOver(){
        return (this.board.boardFull() || 
               this.board.neitherCanMove()) 
    }

    getResult() {
        if(this.winner === null) {
            return 0
        } else if(this.winner === "White") {
            return 1
        } else {
            return -1
        }
    }

    saveState() {
        this.previousState = _.cloneDeep(this);
    }

    // Does not take advantage of backtracking
    undoAction() {
        this.board = this.previousState.board;
        this.players = this.previousState.players;
        this.winner = this.previousState.winner;
        this.previousState = this.previousState.previousState;
    }

    doAction(coordinates) {
        this.turn(coordinates);
    }
    
    getAvailableActions() {
        return this.board.getEdgeArrays()
    }

}