import React from 'react'

const NewGame = (props) => {
    return (
        <div onClick={props.newGame}
        className='new-game-button'>New Game
        </div>
    )
}

export default NewGame;