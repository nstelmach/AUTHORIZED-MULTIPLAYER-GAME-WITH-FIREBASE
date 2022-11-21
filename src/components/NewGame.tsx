import React from "react";
import Game from "./Game";
import classes from "./NewGame.module.css";
import Header from "./Header";

export type NewGameProps = {
  isPlayerGame: boolean;
};

function NewGame({ isPlayerGame }: NewGameProps) {
  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.contentWrapper}>
        <div className={classes.score}>
          <div>0</div>
          <div className={classes.colon}>:</div>
          <div>0</div>
        </div>
        <Game />
        {isPlayerGame && (
          <div className={classes.linkWrapper}>
            <div className={classes.subtitles}>Link to the game: </div>
            <div className={classes.link}>https://link.com</div>
          </div>
        )}
        {!isPlayerGame && (
          <div className={`${classes.link} ${classes.subtitles}`}>
            Reset Game
          </div>
        )}
      </div>
    </div>
  );
}

export default NewGame;
