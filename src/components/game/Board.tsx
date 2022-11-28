import React from "react";
import Square, { CircleOrCross } from "./Square";
import classes from "./Board.module.css";

export type BoardProps = {
  game: CircleOrCross[];
  onSquareClick: (index: number) => void;
};

function Board({ game, onSquareClick }: BoardProps) {
  const makeNineSquares = game.map((circleOrCross, index) => {
    return (
      <Square
        key={index}
        onClick={() => {
          onSquareClick(index);
        }}
        circleOrCross={circleOrCross}
      />
    );
  });
  return <div className={classes.board}>{makeNineSquares}</div>;
}

export default Board;
