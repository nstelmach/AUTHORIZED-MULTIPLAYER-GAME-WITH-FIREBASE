import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";

interface Output {
  clearBoard: () => void;
}

const useClearBoard = (): Output => {
  const { roomId } = useParams();

  const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";
  async function clearBoard() {
    try {
      await updateDoc(doc(db, "rooms", roomId!), {
        game: [null, null, null, null, null, null, null, null, null],
        gameStatus: startingTurn,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return { clearBoard };
};

export default useClearBoard;
