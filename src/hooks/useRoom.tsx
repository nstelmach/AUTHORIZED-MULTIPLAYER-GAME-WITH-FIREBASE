import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Room } from "../types/types";

interface Output {
  isFetching: boolean;
  room?: Room;
}

const useRoom = (): Output => {
  const { roomId } = useParams();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [room, setRoom] = useState<Room | undefined>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "rooms", roomId!), (doc) => {
      if (doc.exists()) setRoom({ ...doc.data(), id: doc.id } as Room);
      else console.log("Room Not Found");
      if (isFetching) setIsFetching(false);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId, isFetching]);
  return { isFetching, room };
};

export default useRoom;
