import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [sessionCode, setSessionCode] = useState(null);
  const [sessionRole, setSessionRole] = useState(null); // "master" | "player"
  const [currentChar, setCurrentChar] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  const value = {
    user,
    loadingAuth,
    sessionCode,
    setSessionCode,
    sessionRole,
    setSessionRole,
    currentChar,
    setCurrentChar,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}