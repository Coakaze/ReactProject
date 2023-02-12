import React, { createContext, useEffect, useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState("");

    const Register = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const Login = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }
    const Logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (initializing) {
                setInitializing(false);
            }
        });
        return () => {
            unsubscribe();
        }
    });

    if (initializing) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, Register, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContextProvider;
