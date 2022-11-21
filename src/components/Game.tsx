import React from "react";
import Board from "./Board";
import { useState } from "react";
import classes from "./Game.module.css";
import { CircleOrCross } from "./Square";
import GameEnd from "./GameEnd";

enum GameStatus {
  Draw = "draw",
  XWinner = "xWinner",
  OWinner = "oWinner",
  XTurn = "xTurn",
  OTurn = "oTurn",
}

function calculateGameStatus(
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

function Game() {
  const [stateGame, setStateGame] = useState<{
    game: CircleOrCross[];
    gameStatus: GameStatus;
  }>({
    game: [null, null, null, null, null, null, null, null, null],
    gameStatus: GameStatus.OTurn,
  });

  function onSquareClickHandler(index: number) {
    setStateGame(({ game, gameStatus }) => {
      if (
        gameStatus === GameStatus.Draw ||
        gameStatus === GameStatus.OWinner ||
        gameStatus === GameStatus.XWinner ||
        game[index] !== null
      ) {
        return { game, gameStatus };
      }
      if (gameStatus === GameStatus.OTurn) {
        game[index] = "O";
      }
      if (gameStatus === GameStatus.XTurn) {
        game[index] = "X";
      }

      const computedGameStatus = calculateGameStatus(game, gameStatus);

      console.log(game, gameStatus, computedGameStatus);
      return { game, gameStatus: computedGameStatus };
    });
  }

  return (
    <div className={classes.game}>
      <Board onSquareClick={onSquareClickHandler} game={stateGame.game} />
      {(stateGame.gameStatus === GameStatus.OWinner ||
        stateGame.gameStatus === GameStatus.XWinner) && <GameEnd />}
    </div>
  );
}

export default Game;
