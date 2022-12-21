import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const useResetGame = () => {
  const [isReseting, setIsReseting] = useState(false);
  const { user } = useAuth();

  const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";

  async function resetGame() {
    setIsReseting(true);
    try {
      await updateDoc(doc(db, "users", user!.uid, "computer", "computer"), {
        game: [null, null, null, null, null, null, null, null, null],
        gameStatus: startingTurn,
        playerXId: null,
        playerOId: null,
        playerXDisplayName: null,
        playerODisplayName: null,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsReseting(false);
    }
  }

  return { resetGame, isReseting };
};

export default useResetGame;
