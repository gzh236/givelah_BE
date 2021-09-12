require("dotenv").config();

import express, { Application } from "express";
import cors from "cors";

import userRouter from "./routers/user_router";
import userAddressRouter from "./routers/user_addresses_router";
import itemRouter from "./routers/items_router";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Givelah's backend listening on port ${PORT}`);
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/address", userAddressRouter);
app.use("/api/v1/items", itemRouter);
