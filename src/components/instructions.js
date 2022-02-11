import React from "react";

const Instructions = ({ winner }) => {
    return (
    <ul className="instructions">
        <li>Black always moves first</li>
        <li>If on their turn a player can't outflank and flip at least one opposing disk, their turn is skipped. However, if a move is available to them, they may not choose to forfeit their turn</li>
        <li>Players may not skip over their own color disk(s) to outflank an opposing disk</li>
        <li>Disk(s) may only be outflanked as a direct result of a move and must fall in the direct line of the disk placed down</li>
        <li>All disks outflanked in any one move must be flipped</li>
        <li>Once a disk is placed, it can never be moved to another square later in the game</li>
        <li>When neither player can move, the game is over. The player with more disks flipped to their color is the winner</li>
    </ul>)
}

export default Instructions;