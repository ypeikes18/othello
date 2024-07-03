import Game from "../src/game_logic/game.js";
import {csvToListOfDicts, writeListOfDictsToJSON} from "./util.js"

export async function processCSV(filePath) {
  const gameDicts = await csvToListOfDicts(filePath);
  const trainingData = [];
  for (let i = 0; i < 5; i++) {
    const gameDict = gameDicts[i];
    console.log(`Processing game ${i + 1}: ${gameDict.eOthello_game_id}`);
    const gameMovesString = gameDict["game_moves"];
    gameDict["game_moves"] = gameStringToMoveCoordinates(gameMovesString);
    const gameTrainingData = getTrainingData(gameDict);
    trainingData.push(...gameTrainingData);
  }
  return trainingData;
}

const gameStringToMoveCoordinates = (gamestring) => {
  const lettersToNumbers = {
    a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7
  };
  const moves = [];
  for (let i = 0; i < gamestring.length; i += 2) {
    const row = lettersToNumbers[gamestring[i].toLowerCase()];
    const col = parseInt(gamestring[i+1]) - 1;
    if (row === undefined || isNaN(col) || row < 0 || row > 7 || col < 0 || col > 7) {
      throw new Error(`Invalid move at position ${i}: ${gamestring[i]}${gamestring[i+1]}`);
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
      label: numToOneHotEncodedLabel(gameDict.winner),
      board: game.board.grid
    })
  }
  return trainingData
}

const numToOneHotEncodedLabel = (num) => {
  const integer = parseInt(num)
  if (integer === 1) return [1, 0, 0]; // Black wins
  if (integer === 0) return [0, 1, 0]; // Draw
  if (integer === -1) return [0, 0, 1]; // White wins
  throw new Error("Lable must be one hot encoding")
}

writeListOfDictsToJSON(await processCSV("./othello_dataset.csv"), "./training_data.json")
