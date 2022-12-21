import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Computer } from "../types/types";
import { useAuth } from "../contexts/AuthContext";

const useComputer = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [computerGame, setComputerGame] = useState<Computer | undefined>();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, "users", user.uid, "computer", "computer"),
        (doc) => {
          if (doc.exists()) {
            setComputerGame({ ...doc.data() } as Computer);
          } else console.log("Computer Game Not Found");
          if (isFetching) setIsFetching(false);
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [user, isFetching]);
  return { computerGame, isFetching };
};

export default useComputer;
