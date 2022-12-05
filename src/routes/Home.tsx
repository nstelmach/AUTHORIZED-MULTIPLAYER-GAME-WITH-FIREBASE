import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useCreateRoom from "../hooks/useCreateRoom";

function Home() {
  const navigate = useNavigate();
  const { createRoom, isCreatingRoom } = useCreateRoom();

  async function handleCreateRoom() {
    const roomId = await createRoom();
    navigate(`/r/${roomId}`);
  }

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.contentWrapper}>
        <div className={classes.subtitles}>Choose one</div>
        <div className={classes.buttonsWrapper}>
          <div>
            <Button
              onClick={handleCreateRoom}
              type="button"
              disabled={false}
              className={classes.button}
              text={`Creat${isCreatingRoom ? "ing" : "e"} new room`}
            />
          </div>

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
