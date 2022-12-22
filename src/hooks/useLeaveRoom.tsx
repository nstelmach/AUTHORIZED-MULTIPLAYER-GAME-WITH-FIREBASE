import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { CircleOrCross } from "../types/types";

const useLeaveRoom = () => {
  const { roomId } = useParams();
  const [isLeaving, setIsLeaving] = useState(false);

  async function leaveRoom(player: CircleOrCross) {
    setIsLeaving(true);
    try {
      await updateDoc(doc(db, "rooms", roomId!), {
        [player === "X" ? "playerXId" : "playerOId"]: null,
        [player === "X" ? "playerXDisplayName" : "playerODisplayName"]: null,
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
