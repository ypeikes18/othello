import Board from "./board.js";
import _ from "lodash"; 
import {WHITE, BLACK, HUMAN, AI, TIE} from "./constants.js";
import {Player} from "./player.js";


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
            return;
        }
        const currentPlayerCanMove = this.board.canMove(this.getCurrentPlayer().color)
        if(!currentPlayerCanMove) {
            this.goToNextTurn();
        }
    }

    aiTurn() {
        // TODO build in a delay that the montecarlo search can ignore 
        const move = this.getCurrentPlayer().getMove(this);
        this.turn(move);
        this.executePostTurnLogic()
    }

    humanTurn(coordinates) {
        if(this.getCurrentPlayer().isHuman()) {
            try {
                this.turn(coordinates);
                this.executePostTurnLogic()
            } catch {
                console.log(`Illegal Move: ${coordinates}`)
                return
            }
        }    
    }

    // coordinates is an array
    // can be called by clicking a square if currentPlayer is human
    // can be called by montecarlo calling doAction
    // can be called by AI turn
    turn(coordinates) {
        this.board.tryMove(this.getCurrentPlayer().color, coordinates)
    }

    getCurrentPlayer() {
        return this.players[0]
    }

    gameOver(){
        return (this.board.boardFull() || 
               this.board.neitherCanMove()) 
    }

    getResult() {
        if(this.winner === TIE) {
            return 0.5;
        } else if(this.winner === this.aiPlayer.color) {
            return 1;
        } else if(this.winner === this.humanPlayer.color) {
            return 0;
        }
        return null;        
    }

    doAction(coordinates) {
        // this.saveState()
        this.turn(coordinates);
        this.goToNextTurn()
    }
    
    getAvailableActions() {
        return this.board.getValidMoves(this.getCurrentPlayer().color)
    }

    getPlayerOfType(playerType) {
        if(this.players[0].type === playerType) {
            return this.players[0];
        }
        return this.players[1]
    }

}