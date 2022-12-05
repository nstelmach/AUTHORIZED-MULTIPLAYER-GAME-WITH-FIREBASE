import { useState } from "react";
import { useParams } from "react-router";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { SYMBOL } from "../types/types";

interface Output {
  isJoining: boolean;
  joinRoom: (player: SYMBOL, userId: string) => void;
}

const useJoinRoom = (): Output => {
  const { roomId } = useParams();
  const [isJoining, setIsJoining] = useState(false);

  async function joinRoom(player: SYMBOL, userId: string) {
    setIsJoining(true);
    try {
      const document = await getDoc(doc(db, "rooms", roomId!));
      if (document.exists()) {
        const data = document.data();
        if (data.playerOId === userId || data.playerXId === userId)
          return alert("You can't join the game more than once!");
        await updateDoc(doc(db, "rooms", roomId!), {
          [player === "X" ? "playerXId" : "playerOId"]: userId,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  }
  return { isJoining, joinRoom };
};

export default useJoinRoom;
