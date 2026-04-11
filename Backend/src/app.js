const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const passport = require("./services/passport"); 
const authRouter = require("./routes/auth.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
app.enable('trust proxy');
app.use(express.static("./public"));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "https://shree-krishna-enterprises-pune.onrender.com"],
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
app.use("/api/orders", orderRouter);

app.use('*name', (req, res) => {
  res.sendFile(path.join(__dirname,"..", "public/index.html"));
});

module.exports = app;