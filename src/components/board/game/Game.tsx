import React from "react";
import Board from "../grid/Grid";
import classes from "./Game.module.css";
import ConfirmModal from "../../modal/ConfirmModal";
import { GameStatus, CircleOrCross } from "../../../types/types";

export type GameProps = {
  onSquareClick: (index: number) => void;
  game: CircleOrCross[];
  gameStatus: GameStatus;
  onConfirm: () => void;
  onDecline: () => void;
  winnerName: string | null | undefined;
};

function Game({
  onSquareClick,
  game,
  gameStatus,
  onConfirm,
  onDecline,
  winnerName,
}: GameProps) {
  return (
    <div className={classes.game}>
      <Board onSquareClick={onSquareClick} game={game} />
      {(gameStatus === GameStatus.OWinner ||
        gameStatus === GameStatus.XWinner ||
        gameStatus === GameStatus.Draw) && (
        <ConfirmModal
          winnerName={winnerName}
          onConfirm={onConfirm}
          onDecline={onDecline}
        />
      )}
    </div>
  );
}

export default Game;
