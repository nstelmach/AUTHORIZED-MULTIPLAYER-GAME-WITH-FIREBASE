import React from "react";
import Game from "../components/game/Game";
import classes from "./NewGame.module.css";
import Header from "../components/Header";
// import { useState } from "react";
import { useParams } from "react-router";
import useRoom from "../hooks/useRoom";
import useMarkBoard from "../hooks/useMark";
import { CircleOrCross } from "../components/game/Square";

export type NewGameProps = {
  isPlayerGame: boolean;
};

export enum GameStatus {
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

function NewGame({ isPlayerGame }: NewGameProps) {
  const { id } = useParams();
  const { isFetching, room } = useRoom(id || "");
  const { isMarking, markBoard } = useMarkBoard(id || "", room!);
  const { game, gameStatus } = room || {};

  if (isFetching) return <h1>Loading Room...</h1>;
  if (!room) return <h1>Room Not Found</h1>;

  // const [stateGame, setStateGame] = useState<{
  //   game: CircleOrCross[];
  //   gameStatus: GameStatus;
  // }>({
  //   game: [null, null, null, null, null, null, null, null, null],
  //   gameStatus: GameStatus.OTurn,
  // });

  function onSquareClickHandler(index: number) {
    if (!isMarking && game![index] === null) markBoard(index, room!);
    if (isMarking) {
      game![index] = null;
    }

    // setStateGame(({ game, gameStatus }) => {
    //   if (
    //     gameStatus === GameStatus.Draw ||
    //     gameStatus === GameStatus.OWinner ||
    //     gameStatus === GameStatus.XWinner ||
    //     game[index] !== null
    //   ) {
    //     return { game, gameStatus };
    //   }
    //   if (gameStatus === GameStatus.OTurn) {
    //     game[index] = "O";
    //   }
    //   if (gameStatus === GameStatus.XTurn) {
    //     game[index] = "X";
    //   }
    //   const computedGameStatus = calculateGameStatus(game, gameStatus);
    //   return { game, gameStatus: computedGameStatus };
    // });
  }

  function resetGameHandler() {
    // setStateGame(({ game, gameStatus }) => {
    //   game = [null, null, null, null, null, null, null, null, null];
    //   gameStatus = GameStatus.OTurn;
    //   return { game, gameStatus };
    // });
  }

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.contentWrapper}>
        <div className={classes.score}>
          <div>0</div>
          <div className={classes.colon}>:</div>
          <div>0</div>
        </div>
        <Game
          onSquareClick={onSquareClickHandler}
          game={game || []}
          gameStatus={gameStatus!}
        />
        {isPlayerGame && (
          <div className={classes.linkWrapper}>
            <div className={classes.subtitles}>Link to the game: </div>
            <div className={classes.link}>https://link.com/{id}</div>
          </div>
        )}
        {!isPlayerGame && (
          <div
            onClick={resetGameHandler}
            className={`${classes.link} ${classes.subtitles}`}
          >
            Reset Game
          </div>
        )}
      </div>
    </div>
  );
}

export default NewGame;
