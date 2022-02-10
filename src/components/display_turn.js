import React from "react";

const DisplayTurn = (props) => {
    const turn = props.currentPlayer;
    
    return (<div id='turn'>
        <div>
            <h3>Turn:</h3>
            <p className={`${turn}-turn turn`}>
                <strong>
                    {turn.toUpperCase()}
                </strong>
            </p>
        </div>        
    </div>)
}



export default DisplayTurn;