import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export type AuthContextType = {
  user: undefined | User;
  signup: (email: string, password: string) => Promise<UserCredential | void>;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  logout: () => Promise<void>;
};

export type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  async function signup(email: string, password: string) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = res.user;

      await setDoc(doc(db, "users", currentUser.uid), {
        id: currentUser.uid,
        displayName: currentUser?.email?.split("@")[0],
        email: currentUser.email,
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("This user already exists");
      }
      console.error(error);
    }
    return;
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        const document = await getDoc(doc(db, "users", user?.uid));
        if (document.exists())
          return setUser({ ...document.data(), uid: document.id } as User);
      }
      setUser(undefined);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
