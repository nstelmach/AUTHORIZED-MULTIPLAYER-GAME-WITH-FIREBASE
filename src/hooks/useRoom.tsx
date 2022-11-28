import { useEffect, useState } from "react";
import { GameStatus } from "../routes/NewGame";
import { CircleOrCross } from "../components/game/Square";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router";

export interface Room {
  game: CircleOrCross[];
  gameStatus: GameStatus;
}

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
      if (doc.exists()) setRoom(doc.data() as Room);
      else console.log("Room Not Found");
      setIsFetching(false);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);
  return { isFetching, room };
};

export default useRoom;