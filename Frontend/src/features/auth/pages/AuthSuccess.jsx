import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"  // adjust path

export default function AuthSuccess() {
    const navigate = useNavigate()
    const { handleGetMe } = useAuth()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token")

        if (token) {
            // 1. Save token to localStorage
            localStorage.setItem("token", token)

            // 2. Fetch user profile → updates AuthContext user state
            handleGetMe().then(() => {
                navigate("/")
            }).catch(() => {
                navigate("/login")
            })
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100vh",
            color: "white",
            background: "#1a1d22",
            fontFamily: "sans-serif"
        }}>
            Signing you in...
        </div>
    )
}