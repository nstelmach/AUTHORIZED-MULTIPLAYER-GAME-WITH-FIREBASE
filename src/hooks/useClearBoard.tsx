import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { GameStatus } from "../routes/NewGame";

interface Output {
  clearBoard: () => void;
}

const useClearBoard = (): Output => {
  const { roomId } = useParams();

  async function clearBoard() {
    try {
      await updateDoc(doc(db, "rooms", roomId!), {
        game: [null, null, null, null, null, null, null, null, null],
        gameStatus: GameStatus.OTurn,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return { clearBoard };
};

export default useClearBoard;
