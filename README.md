# Othello

An implemantation of the classic board game Othello

![image](https://user-images.githubusercontent.com/59425912/153607497-302444e8-af8f-4d8e-8db1-a78bd98ca90d.png)
[live link](https://ypeikes18.github.io/othello/)

## Game Play

1. Black always moves first

2. If on their turn a player can't outflank and flip at least one opposing disk, their turn is skipped. However, if a move is available to them, they may not choose to forfeit their turn

3. Players may not skip over their own color disk(s) to outflank an opposing disk

4. Disk(s) may only be outflanked as a direct result of a move and must fall in the direct line of the disk placed down

5. All disks outflanked in any one move must be flipped 

6. Once a disk is placed, it can never be moved to another square later in the game

7. When neither player can move, the game is over. The player with more disks flipped to their color is the winner

## Technologies
- Javascript
- React 

## Photo
![image](https://user-images.githubusercontent.com/59425912/153607920-62a24089-9621-4e83-9355-81e28897c9c0.png)

## Functionality 
 
- Piece flipping logic - Game logic decides whether a turn is valid and flips pieces accordingly 
- Turns - Game switches turns correctly and skips a players turn when they have no valid move 
- Winner - Game notifies the players of a winner once the game is over

## Code Snippets 

The board uses a set to track and update a list of all spaces adjacent to occupied squares. This allows for efficent implementation in a couple areas:
- Turn logic - Instead of checking all spaces on the board to see if the current player has a valid move we only need to check the spaces in the set
- Gameover check - We can simply check if there are no edges to determine if the board is full

```
    updateEdges(coordinates) {
        this.edges.delete(coordinates.join(''));
        let newEdge, row, column;
        
        this.directions.forEach(direction => {
            row = coordinates[0] + direction[0]; 
            column = coordinates[1] + direction[1]; 
            newEdge = `${row}${column}`;

            if(this.onBoard([row, column]) && 
            this.grid[row][column] === 'none'){

                this.edges.add(newEdge)
                
            } else if(this.onBoard([row, column]) && 
              this.grid[row][column] !== 'none'){
                
                this.edges.delete(newEdge);
            }
        })
    }
```

## Features to come
- AI - An AI that makes skilled moves by searching the game tree
