import React from "react";
import Board from "./Board";
import classes from "./Game.module.css";
import GameEnd from "../modal/GameEnd";
import { GameStatus } from "../../routes/NewGame";
import { CircleOrCross } from "./Square";

export type GameProps = {
  onSquareClick: (index: number) => void;
  game: CircleOrCross[];
  gameStatus: GameStatus;
  onClick: () => void;
};

function Game({ onSquareClick, game, gameStatus, onClick }: GameProps) {
  return (
    <div className={classes.game}>
      <Board onSquareClick={onSquareClick} game={game} />
      {(gameStatus === GameStatus.OWinner ||
        gameStatus === GameStatus.XWinner) && <GameEnd onClick={onClick} />}
    </div>
  );
}

export default Game;
