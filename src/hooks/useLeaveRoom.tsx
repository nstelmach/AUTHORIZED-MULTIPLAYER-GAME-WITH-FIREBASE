import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { SYMBOL } from "../types/types";

interface Output {
  isLeaving: boolean;
  leaveRoom: (player: SYMBOL) => void;
}

const useLeaveRoom = (): Output => {
  const { roomId } = useParams();
  const [isLeaving, setIsLeaving] = useState(false);

  async function leaveRoom(player: SYMBOL) {
    setIsLeaving(true);
    try {
      await updateDoc(doc(db, "rooms", roomId!), {
        [player === "X" ? "playerXId" : "playerOId"]: null,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLeaving(false);
    }
  }
  return { isLeaving, leaveRoom };
};

export default useLeaveRoom;
