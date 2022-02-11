import React from "react";

const WinnerMessage = ({ winner }) => {
    return (
    <h1 className="winner-message">
        {winner} wins!!!
    </h1>)
}

export default WinnerMessage;