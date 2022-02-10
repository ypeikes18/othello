import React from 'react';

import GameComponent from './game_component';
import Square from './square';

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    mapped() {
        const board = this.props.game.board.grid;

        return (<div id='board'>
            {board.map((row, rowIndex) => {
                return (<div key={rowIndex}
                             className='row'>                                 
                            {row.map((square, columnIndex) => {
                                return <Square key={`${rowIndex}${columnIndex}`} 
                                               color={square}
                                               game={this.props.game}
                                               coordinates={[rowIndex, columnIndex]}
                                               turn={this.props.turn}/>
                })    
                }
                </div>)
            })}
        </div>)
    }

    render() {
        return (
            this.mapped()
        )
    }

}