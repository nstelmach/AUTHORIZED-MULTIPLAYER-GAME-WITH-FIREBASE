import { useState } from "react";
import { useParams } from "react-router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Output {
  isJoining: boolean;
  joinRoom: (player: "X" | "O", userId: string) => void;
}

const useJoinRoom = (): Output => {
  const { roomId } = useParams();
  const [isJoining, setIsJoining] = useState(false);

  async function joinRoom(player: "X" | "O", userId: string) {
    setIsJoining(true);
    try {
      await updateDoc(doc(db, "rooms", roomId!), {
        [player === "X" ? "playerXId" : "playerOId"]: userId,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  }
  return { isJoining, joinRoom };
};

export default useJoinRoom;
