import React from 'react';
import Square from './square.js';

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    mapped() {
        const board = this.props.game.board.grid;
        const {turn} = this.props

        return (<div id='board'>
            {board.map((row, rowIndex) => {
                return (<div key={rowIndex}
                             className='row'>                                 
                            {row.map((square, columnIndex) => {
                                let color = null;
                                if(square === -1) color = "white"
                                if(square === 1) color = "black"
                                return <Square key={`${rowIndex}${columnIndex}`} 
                                               color={color}
                                               game={this.props.game}
                                               coordinates={[rowIndex, columnIndex]}
                                               turn={turn}/>
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