require("dotenv").config();

import express, { Application } from "express";
import cors from "cors";

import userRouter from "./routers/user_router";
import userAddressRouter from "./routers/user_addresses_router";
import itemRouter from "./routers/items_router";
import itemImageRouter from "./routers/items_images_router";

const router = express.Router();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
//use cors middleware

//enable pre-flight

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/address", userAddressRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/itemImages", itemImageRouter);

app.get("/", (req, res) => {
  res.send(`Welcome to Givelah`);
});

app.listen(PORT, () => {
  console.log(`Givelah's backend listening on port ${PORT}`);
});
