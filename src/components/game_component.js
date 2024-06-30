import React from 'react';
import Game from '../game_logic/game.js';
import Board from './board.js';
import NewGame from './new_game.js';
import DisplayTurn from './display_turn.js';
import Links from './links.js';
import Modal from './modal.js';


export default class GameComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {game: new Game(), instructions: this.showRules() };
        this.newGame = this.newGame.bind(this);
        this.turn = this.turn.bind(this);
        this.showRules = this.showRules.bind(this);
    }

    newGame() {
        this.setState({game: new Game()})
    }

    turn(coordinates) {
       this.state.game.humanTurn(coordinates);
       this.setState({game: this.state.game});
    }

    showRules() {
        return(<Modal type={'instructions'} key={Math.random()}/>)
    }

    render() {
        const { game, instructions } = this.state;
        const color = game.getCurrentPlayer().color;
        
        const winnerMessage = game.winner ? (
            <Modal type={'winner'} winner={game.winner}/>
        ) : null;

        return (
            <div id='game' onChange={this.handleChange}>
                {winnerMessage}
                {instructions}

                <h1 id='header'>Othello</h1>
                <div id='game-div'>
                    <div id='dashboard'>
                        <DisplayTurn color={color}/>
                        <NewGame newGame={this.newGame}/>
                        <div 
                        onClick={() => this.setState({ instructions: this.showRules()}) }
                        className='instructions-button'>
                            Instructions
                        </div>
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