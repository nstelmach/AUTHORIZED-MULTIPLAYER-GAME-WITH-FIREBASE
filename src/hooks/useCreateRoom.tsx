import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function genId(): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}

const useCreateRoom = () => {
  const { user } = useAuth();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  async function createRoom(): Promise<string | undefined> {
    if (!user) return undefined;

    setIsCreatingRoom(true);

    let output: string | undefined = undefined;

    try {
      const userDetails = await getDoc(doc(db, "users", user.uid));

      if (userDetails.data()?.roomId) {
        return (output = userDetails.data()?.roomId);
      }

      let newIdGenerated = false;

      let randomRoomId = genId();

      while (!newIdGenerated) {
        const foundRoom = await getDoc(doc(db, "rooms", randomRoomId));
        if (foundRoom.exists()) randomRoomId = genId();
        else newIdGenerated = true;
      }

      const startingTurn = Math.round(Math.random()) ? "oTurn" : "xTurn";

      await setDoc(doc(db, "rooms", randomRoomId), {
        game: [null, null, null, null, null, null, null, null, null],
        startingTurn: startingTurn,
        gameStatus: startingTurn,
        owner: user.uid,
      });
      await updateDoc(doc(db, "users", user.uid), {
        roomId: randomRoomId,
      });

      output = randomRoomId;
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingRoom(false);

      return output;
    }
  }
  return { createRoom, isCreatingRoom };
};

export default useCreateRoom;
