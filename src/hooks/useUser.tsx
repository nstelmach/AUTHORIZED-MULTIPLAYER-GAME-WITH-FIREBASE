import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
// import { User } from "../types/types";
import { User } from "firebase/auth";

interface Output {
  user?: User;
  isFetching: boolean;
}

const useUser = (userId?: string): Output => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(doc(db, "users", userId!), (doc) => {
        if (doc.exists()) setUser({ ...doc.data(), uid: userId } as User);
        else console.log("User Not Found");
        if (isFetching) setIsFetching(false);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [userId, isFetching]);

  return { isFetching, user };
};

export default useUser;
