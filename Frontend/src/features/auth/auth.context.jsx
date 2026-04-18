import { useState, useEffect, createContext } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Run handleGetMe ONCE on app startup to restore session
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            // No token stored, skip the API call
            setLoading(false)
            return
        }

        getMe()
            .then((data) => {
                setUser(data.user)
            })
            .catch(() => {
                // Token is invalid/expired — clean up
                setUser(null)
                localStorage.removeItem("token")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}