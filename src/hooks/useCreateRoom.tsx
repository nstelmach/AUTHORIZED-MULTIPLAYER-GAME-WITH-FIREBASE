import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function genId(): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}

interface Output {
  createRoom: () => void;
  isCreatingRoom: boolean;
}

const useCreateRoom = (): Output => {
  const { user } = useAuth();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  async function createRoom(): Promise<string | undefined> {
    if (!user) return undefined;

    setIsCreatingRoom(true);

    let roomId: string | undefined = undefined;

    try {
      if (roomId) {
        const foundUserRoom = await getDoc(doc(db, "rooms", roomId));
        if (foundUserRoom.exists()) return roomId;
      } else {
        let newIdGenerated = false;

        let roomId = genId();

        while (!newIdGenerated) {
          const foundRoom = await getDoc(doc(db, "rooms", roomId));
          if (foundRoom.exists()) roomId = genId();
          else newIdGenerated = true;
        }

        await updateDoc(doc(db, "users", user?.uid), {
          roomId,
        });
      }

      const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";
      await setDoc(doc(db, "rooms", roomId!), {
        game: [null, null, null, null, null, null, null, null, null],
        gameStatus: startingTurn,
        owner: user?.uid,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingRoom(false);

      return roomId;
    }
  }
  return { createRoom, isCreatingRoom };
};

export default useCreateRoom;
