import Board from "./board";
import _ from "lodash"; 
import {WHITE, BLACK, HUMAN, AI, TIE} from "./constants";
import {Player} from "./player";


export default class Game {

    constructor() {
        this.board = new Board();
        this.players = [new Player(WHITE, HUMAN), new Player(BLACK, AI)];
        this.winner = null;
        this.previousState = null
        this.aiPlayer = this.getPlayerOfType(AI)
        this.humanPlayer = this.getPlayerOfType(HUMAN)
    }

    executePostTurnLogic() {
        this.goToNextTurn()
        if(this.getCurrentPlayer().isAI() && !this.winner) {
            // maybe add a delay but the montecarlo doesn't have the delay
            this.aiTurn()
        }
    }

    goToNextTurn() {
        this.players.unshift(this.players.pop());
        if(this.gameOver()) {
            this.winner = this.board.winner();
            console.log("WINNER WINNER", this.winner)
            return;
        }
        const getCurrentPlayerCanMove = this.board.canMove(this.getCurrentPlayer().color)
        if(!getCurrentPlayerCanMove) {
            this.goToNextTurn();
        }
    }

    aiTurn() {
        // TODO build in a delay that the montecarlo search can ignore 
        const move = this.getCurrentPlayer().getMove(this);
        console.log({aiTurn: "", move})
        this.turn(move);
        this.executePostTurnLogic()
    }

    humanTurn(coordinates) {
        if(this.getCurrentPlayer().isHuman() && this.turn(coordinates)) {
            console.log({humanTurn: coordinates})
            this.executePostTurnLogic()
        }    
    }

    // coordinates is an array
    // can be called by clicking a square if currentPlayer is human
    // can be called by montecarlo calling doAction
    // can be called by AI turn
    turn(coordinates) {
        console.log({turn: coordinates})
        try {
            this.board.tryMove(this.getCurrentPlayer().color, coordinates)
        } catch {
            return
        }
    }

    getCurrentPlayer() {
        return this.players[0]
    }

    gameOver(){
        return (this.board.boardFull() || 
               this.board.neitherCanMove()) 
    }

    getResult() {
        console.log("getResult",{winner: this.winner})
        if(this.winner === TIE) {
            return 0.5;
        }
        if(this.winner === this.aiPlayer.color) {
            return 1;
        }
        if(this.winner === this.humanPlayer.color) {
            return 0;
        }
        return null;        
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
        this.saveState()
        this.turn(coordinates);
        this.goToNextTurn()
    }
    
    getAvailableActions() {
        console.log('getAvailableActions', this.board.getValidMoves())
        return this.board.getValidMoves(this.getCurrentPlayer().color)
    }

    getPlayerOfType(playerType) {
        if(this.players[0].type === playerType) {
            return this.players[0];
        }
        return this.players[1]
    }

}