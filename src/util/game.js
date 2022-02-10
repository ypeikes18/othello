import Board from "./board";

export default class Game {

    constructor() {
        this.board = new Board();
        this.players = ['white', 'black'];
        this.winner = undefined;
    }

    nextTurn() {
        this.players.unshift(this.players.pop());
    }

    currentPlayer() {
        return this.players[0]
    }

    turn(coordinates) {
       if(this.board.move(this.currentPlayer(), coordinates)) {
           this.nextTurn();
       } 
    //    if(this.gameOver) {
    //        this.winner = this.board.winner();
    //        break;
    //    }

       if(!this.board.canMove(this.currentPlayer())) {
         this.nextTurn();
       }
    }

    gameOver(){
        return (this.board.boardFull() || 
               this.board.neitherCanMove()) 
    }

}