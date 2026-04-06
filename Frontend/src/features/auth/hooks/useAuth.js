import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            if (data.token) localStorage.setItem("token", data.token)
            toast.success("Account created successfully!")
            return data
        } catch (err) {
            const errorData = err.response?.data;
            const message = errorData?.errors?.[0]?.msg || errorData?.message || "Registration failed";
            toast.error(message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ email, password }) {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            if (data.token) localStorage.setItem("token", data.token)
            toast.success("Logged in successfully!")
            return data
        } catch (err) {
            const errorData = err.response?.data;
            const message = errorData?.errors?.[0]?.msg || errorData?.message || "Login failed";
            toast.error(message)
            throw err
        } finally {
            setLoading(false)
        }
    }

async function handleGetMe() {
    setLoading(true)
    try {
        const data = await getMe()
        setUser(data.user)
        return data        
    } catch (err) {
        setUser(null)
        localStorage.removeItem("token")
        throw err          
    } finally {
        setLoading(false)
    }
}

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            localStorage.removeItem("token")
            toast.success("Logged out successfully!")
        } catch (err) {
            toast.error("Logout failed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return ({
        user, loading, handleRegister, handleLogin, handleGetMe, handleLogout
    })
}


