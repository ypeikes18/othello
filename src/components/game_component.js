import React from 'react';
import Game from '../util/game.js';
import Board from './board';
import NewGame from './new_game';
import DisplayTurn from './display_turn.js';
import Links from './links';
import Modal from './modal';


export default class GameComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {game: new Game()};
        this.newGame = this.newGame.bind(this);
        this.turn = this.turn.bind(this);
    }

    newGame() {
        this.setState({game: new Game()})
    }

    turn(coordinates) {
       this.state.game.turn(coordinates);
       this.setState({game: this.state.game});
    }

    render() {
        const { game } = this.state;
        const currentPlayer = game.currentPlayer();
        
        const winnerMessage = game.winner ? (
            <Modal type={'winner'} winner={game.winner}/>
        ) : null;

        return (
            <div id='game' onChange={this.handleChange}>
                {winnerMessage}
                <h1 id='header'>Othello</h1>
                <div id='game-div'>
                    <div id='dashboard'>
                        <DisplayTurn currentPlayer={currentPlayer}/>
                        <NewGame newGame={this.newGame}/>
                    </div>

                    <Board 
                    game={this.state.game}
                    turn={this.turn}/>
                </div>
                <Links/>

            </div>
        )
    }

}