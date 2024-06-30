import Game from "../src/game_logic/game.js";
import fs from 'fs/promises';

const csvToListOfDicts = (csvString) => {
    // Split the CSV string into lines
    const lines = csvString.trim().split('\n');
    
    // Extract headers from the first line
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Process remaining lines
    const result = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
  
    return result;
  }



const readCSVFile = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

export async function processCSV(filePath) {
  const csvString = await readCSVFile(filePath);
  const listOfDicts = csvToListOfDicts(csvString);
  const trainingData = [];
  for (let i = 0; i < listOfDicts.length; i++) {
    const gameDict = listOfDicts[i];
    console.log(`Processing game ${i + 1}: ${gameDict.eOthello_game_id}`);
    const gameMovesString = gameDict["game_moves"];
    gameDict["game_moves"] = processGameString(gameMovesString);
    const gameTrainingData = getTrainingData(gameDict);
    trainingData.push(...gameTrainingData);
  }
  return trainingData;
}
const processGameString = (gamestring) => {
  const lettersToNumbers = {
    a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7
  };
  const moves = [];
  for (let i = 0; i < gamestring.length; i += 2) {
    const row = lettersToNumbers[gamestring[i].toLowerCase()];
    const col = parseInt(gamestring[i+1]) - 1;
    if (row === undefined || isNaN(col) || row < 0 || row > 7 || col < 0 || col > 7) {
      console.error(`Invalid move at position ${i}: ${gamestring[i]}${gamestring[i+1]}`);
      continue;
    }
    moves.push([row, col]);
  }
  return moves;
};

// game dict has eOthello_game_id,winner,game_moves (the last is represented by an array of arrays of coordinates)
const getTrainingData = (gameDict) => {
  const trainingData = []
  const game = new Game()
  for(let move of gameDict.game_moves) {
    game.doAction(move)
    trainingData.push({
      label: gameDict.winner,
      board: game.board.grid
    })
  }
  return trainingData
}



// Usage
async function main() {
  try {
    console.log("Current working directory:", process.cwd());
    const res = await processCSV('./othello_dataset.csv');
    console.log(res[0]);
  } catch (error) {
    console.error('Error in main:', error);
  }
}

main();
