const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const passport = require("./config/passport"); 
const authRouter = require("./routes/auth.routes");
const cartRouter = require("./routes/cart.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

module.exports = app;