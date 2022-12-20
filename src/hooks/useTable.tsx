import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const useTable = () => {
  const [table, setTable] = useState<any[]>();
  const [isFetching, setIsFetching] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let historyArr: any[] = [];
    getDocs(collection(db, "users", user!.uid, "history"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            historyArr.push(doc.data());
          }
        });
        setTable(historyArr);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  return { table, isFetching };
};

export default useTable;
