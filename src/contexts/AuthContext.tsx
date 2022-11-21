import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import React, { useContext, useState, useEffect, ReactNode } from "react";
import { useOutletContext } from "react-router-dom";
import { auth } from "../firebase";

export type AuthContextType = {
  currentUser: null | User;
  signup: (email: string, password: string) => Promise<UserCredential | void>;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export type AuthProviderProps = {
  children: ReactNode;
};

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
