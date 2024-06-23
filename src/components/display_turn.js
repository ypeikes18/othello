import React from "react";

const DisplayTurn = (props) => {
    const color = props.color;
    
    return (<div id='turn'>
        <div>
            <h3>Turn:</h3>
            <p className={`${color}-turn turn`}>
                <strong>
                    {color.toUpperCase()}
                </strong>
            </p>
        </div>        
    </div>)
}



export default DisplayTurn;