// const jwt = require("jsonwebtoken");

// function authMiddleware(req, res, next) {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; 
//     next();

//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// }

// module.exports = authMiddleware;

// middleware/auth.middleware.js
const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    // Check Authorization header first (localStorage token)
    const authHeader = req.headers["authorization"]
    const headerToken = authHeader && authHeader.split(" ")[1]

    // Fallback to cookie (Google auth token)
    const cookieToken = req.cookies?.token

    const token = headerToken || cookieToken

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = authMiddleware