import { CircleOrCross, GameStatus } from "../types/types";

export function calculateGameStatus(
  game: CircleOrCross[],
  currentGameStatus: GameStatus
) {
  const winningCombinatons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const element of winningCombinatons) {
    const isWin = element.map((index) => {
      return game[index];
    });

    const isXWinner = isWin.every((circleOrCross) => {
      return circleOrCross === "X";
    });

    if (isXWinner) {
      return GameStatus.XWinner;
    }
    const isOWinner = isWin.every((circleOrCross) => {
      return circleOrCross === "O";
    });

    if (isOWinner) {
      return GameStatus.OWinner;
    }
  }
  const isDraw = game.every((value) => {
    return value !== null;
  });

  if (isDraw) {
    return GameStatus.Draw;
  }
  return currentGameStatus === GameStatus.XTurn
    ? GameStatus.OTurn
    : GameStatus.XTurn;
}

export function getUpdatedGame(
  game: CircleOrCross[],
  gameStatus: GameStatus,
  boardIndex: number
) {
  let updatedGame: CircleOrCross[] = [...game];
  let updatedGameStatus: GameStatus = gameStatus;
  if (
    gameStatus === GameStatus.Draw ||
    gameStatus === GameStatus.OWinner ||
    gameStatus === GameStatus.XWinner ||
    game[boardIndex] !== null
  ) {
    return { updatedGame, updatedGameStatus };
  }
  if (gameStatus === GameStatus.OTurn) {
    updatedGame[boardIndex] = "O";
  }
  if (gameStatus === GameStatus.XTurn) {
    updatedGame[boardIndex] = "X";
  }
  updatedGameStatus = calculateGameStatus(updatedGame, gameStatus);
  return { updatedGame, updatedGameStatus };
}
