import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Room, Computer } from "../types/types";
import { getUpdatedGame } from "../utils/calculateGameStatus";

const useMarkBoard = () => {
  const [isMarking, setIsMarking] = useState<boolean>(false);

  async function markBoard(
    boardIndex: number,
    room: Room | Computer,
    pathToUpdate: string[]
  ) {
    setIsMarking(true);
    try {
      const { game, gameStatus } = room;
      const { updatedGame, updatedGameStatus } = getUpdatedGame(
        game,
        gameStatus,
        boardIndex
      );

      await updateDoc(doc(db, pathToUpdate.join("/")), {
        game: updatedGame,
        gameStatus: updatedGameStatus,
      });
    } catch (err) {
      console.error(err);
    }
    setIsMarking(false);
  }

  return { isMarking, markBoard };
};

export default useMarkBoard;
