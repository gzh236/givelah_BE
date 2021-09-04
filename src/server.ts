require("dotenv").config();

import express, { Application, Request, Response } from "express";
import db from "../db/models/index";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Givelah listening on port ${PORT}`);
  });
});
