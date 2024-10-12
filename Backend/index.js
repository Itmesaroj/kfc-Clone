const express = require("express");
require("dotenv").config({ path: "./.env" });
const mongoose=require("mongoose")
const userAuthRouter = require("./routes/userAuth.route");
const paymentRouter = require("./routes/paymentIntegrate.route");
const menuRouter = require("./routes/menu.route");
const cartRouter = require("./routes/cart.route");
const searchRouter = require("./routes/serach.route");
const landingRouter = require("./routes/landing.route");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("database connected successfully")
}).catch((err)=>{
  console.log("some error occure",err)
})
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`KFC API Server started on localhost:${PORT}`);
});

server.use("/Auth", userAuthRouter);
server.use("/api/home", landingRouter);
server.use("/api/searchapi", searchRouter);
server.use("/api/product", menuRouter);
server.use("/api/productcart", cartRouter);
server.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 8080;

server.listen(process.env.PORT,()=>{
  console.log("server listning request")
})