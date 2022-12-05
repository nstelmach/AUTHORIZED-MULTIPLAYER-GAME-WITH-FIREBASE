import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { useState } from "react";

interface Output {
  clearBoard: () => void;
  isClearing: boolean;
}

const useClearBoard = (): Output => {
  const { roomId } = useParams();
  const [isClearing, setIsClearing] = useState(false);

  const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";

  async function clearBoard() {
    setIsClearing(true);
    try {
      await updateDoc(doc(db, "rooms", roomId!), {
        game: [null, null, null, null, null, null, null, null, null],
        gameStatus: startingTurn,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsClearing(false);
    }
  }

  return { clearBoard, isClearing };
};

export default useClearBoard;
