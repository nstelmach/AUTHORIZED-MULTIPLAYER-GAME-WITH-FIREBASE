import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Room } from "./useRoom";
import { getUpdatedGame } from "../routes/NewGame";

interface Output {
  isMarking: boolean;
  markBoard: (boardIndex: number, room: Room) => void;
}

const useMarkBoard = (roomId: string, room: Room): Output => {
  const [isMarking, setIsMarking] = useState<boolean>(false);

  async function markBoard(boardIndex: number) {
    setIsMarking(true);
    try {
      // const document = await getDoc(doc(db, "rooms", roomId));
      // if (!document.exists())
      //   return console.error("Room with thai ID does not exist");

      const { game, gameStatus } = room;

      const { updatedGame, updatedGameStatus } = getUpdatedGame(
        game,
        gameStatus,
        boardIndex
      );

      await updateDoc(doc(db, "rooms", roomId), {
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
