import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const useClearBoard = () => {
  const [isClearing, setIsClearing] = useState(false);

  const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";

  async function clearBoard(updatePath: string[]) {
    setIsClearing(true);
    try {
      await updateDoc(doc(db, updatePath.join("/")), {
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
