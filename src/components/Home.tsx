import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import Header from "./Header";
import Button from "./Button";

function Home() {
  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.contentWrapper}>
        <div className={classes.subtitles}>Choose one</div>
        <div className={classes.buttonsWrapper}>
          <Link to="/playergame">
            <Button
              type="button"
              disabled={false}
              className={classes.button}
              text="Create new room"
            />
          </Link>
          <Link to="/computergame">
            <Button
              type="button"
              disabled={false}
              className={classes.button}
              text="Play with computer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
