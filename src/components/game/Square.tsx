import React from "react";
import classes from "./Square.module.css";

export type CircleOrCross = "X" | "O" | null;

export type SquareProps = {
  circleOrCross: CircleOrCross;
  onClick: () => void;
};

function Square({ circleOrCross, onClick }: SquareProps) {
  return (
    <div onClick={onClick} className={classes.square}>
      <span className={circleOrCross === "X" ? classes.XValue : classes.OValue}>
        {circleOrCross}
      </span>
    </div>
  );
}

export default Square;
