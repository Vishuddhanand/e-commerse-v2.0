import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout, verifyOtp } from "../services/auth.api";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password, adminKey }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password, adminKey })
            // Don't set user and token immediately since OTP verification is required
            // setUser(data.user)
            // if (data.token) localStorage.setItem("token", data.token)
            toast.success(data.message || "Account created successfully! Please verify OTP.")
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
            if (data.accessToken) localStorage.setItem("token", data.accessToken)
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

    async function handleVerifyOtp({ email, otp }) {
        setLoading(true)
        try {
            const data = await verifyOtp({ email, otp })
            setUser(data.user)
            if (data.token) localStorage.setItem("token", data.token)
            if (data.accessToken) localStorage.setItem("token", data.accessToken)
            toast.success("Email verified successfully!")
            return data
        } catch (err) {
            const errorData = err.response?.data;
            const message = errorData?.message || "OTP Verification failed";
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
        user, loading, handleRegister, handleVerifyOtp, handleLogin, handleGetMe, handleLogout
    })
}


