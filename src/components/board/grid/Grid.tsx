import React from "react";
import { CircleOrCross } from "../../../types/types";
import Square from "../square/Square";
import classes from "./Grid.module.css";

export type GridProps = {
  game: CircleOrCross[];
  onSquareClick: (index: number) => void;
};

function Grid({ game, onSquareClick }: GridProps) {
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

export default Grid;
