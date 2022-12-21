import React, { useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SYMBOL } from "../../types/types";
import classes from "./ComputerPlayerDisplay.module.css";
import useComputer from "../../hooks/useComputer";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export type ComputerGameDisplayProps = {
  player: SYMBOL;
};

function ComputerGameDisplay({ player }: ComputerGameDisplayProps) {
  const { user } = useAuth();
  const { computerGame } = useComputer();

  const playerDisplayName = useMemo(
    () =>
      player === "X"
        ? computerGame?.playerXDisplayName
        : computerGame?.playerODisplayName,
    [player, computerGame]
  );

  async function joinRoomHandler() {
    const updateId =
      player === "X"
        ? { computer: "playerOId", user: "playerXId" }
        : { computer: "playerXId", user: "playerOId" };
    const updateName =
      player === "X"
        ? { computer: "playerODisplayName", user: "playerXDisplayName" }
        : { computer: "playerXDisplayName", user: "playerODisplayName" };
    await updateDoc(doc(db, "users", user!.uid, "computer", "computer"), {
      [updateId.user]: user!.uid,
      [updateId.computer]: "computer",
      [updateName.user]: user?.displayName,
      [updateName.computer]: "computer",
    });
  }

  return (
    <div className={classes.player}>
      Player {player}:
      {playerDisplayName ? (
        <div className={classes.wrapper}>
          <div className={classes.user}>{playerDisplayName}</div>
        </div>
      ) : (
        <div className={classes.join} onClick={joinRoomHandler}>
          Join
        </div>
      )}
    </div>
  );
}

export default ComputerGameDisplay;
