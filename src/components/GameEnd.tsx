import React from "react";
import { Link } from "react-router-dom";
import classes from "./GameEnd.module.css";
import Button from "./Button";

function GameEnd() {
  return (
    <div className={classes.background}>
      <div className={classes.wrapper}>
        <div className={classes.subtitles}>Winner:</div>
        <div className={classes.subtitles}>Wanna play again?</div>
        <div className={classes.buttonsWrapper}>
          <Button
            type="button"
            disabled={false}
            className={classes.button}
            text="Yes"
          />
          <Link className={classes.button} to="/">
            <Button
              type="button"
              disabled={false}
              className={classes.button}
              text="No"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GameEnd;
