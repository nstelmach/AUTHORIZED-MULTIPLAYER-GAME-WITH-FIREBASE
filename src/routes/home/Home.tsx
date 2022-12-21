import React from "react";
import classes from "./Home.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import useCreateRoom from "../../hooks/useCreateRoom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";

function Home() {
  const navigate = useNavigate();

  const { createRoom, isCreatingRoom } = useCreateRoom();
  const { user } = useAuth();

  async function handleCreateRoom() {
    const roomId = await createRoom();
    navigate(`/r/${roomId}`);
  }

  async function handleCreateComputerRoom() {
    const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";

    let computerDetails = await getDoc(
      doc(db, "users", user!.uid, "computer", "computer")
    );
    if (computerDetails.exists()) {
      navigate("computer");
    } else {
      await setDoc(doc(db, "users", user!.uid, "computer", "computer"), {
        game: [null, null, null, null, null, null, null, null, null],
        startingTurn: startingTurn,
        gameStatus: startingTurn,
        owner: user?.displayName,
      });
      navigate("/computer");
    }
  }

  return (
    <>
      <div className={classes.subtitles}>Choose one</div>
      <div className={classes.buttonsWrapper}>
        <Button
          onClick={handleCreateRoom}
          type="button"
          disabled={false}
          className={classes.button}
          text={isCreatingRoom ? "Loading..." : "Play with another user"}
        />
        <Button
          onClick={handleCreateComputerRoom}
          type="button"
          disabled={false}
          className={classes.button}
          text={isCreatingRoom ? "Loading..." : "Play with computer"}
        />
      </div>
    </>
  );
}

export default Home;
