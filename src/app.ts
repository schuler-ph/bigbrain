import * as dotenv from "dotenv";
dotenv.config();
const express = require("express");
import "reflect-metadata";
import db_conn from "./db_conn";

db_conn
    .initialize()
    .then(() => {
        console.log("Datenbankverbindung steht.");
    })
    .catch((err) => {
        console.log(console.error("Fehler bei Datenbankverbindung: ", err));
    });

const app = express();
app.use(express.json());

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

const bodyweightRoutes = require("./routes/bodyweight");
app.use("/api", bodyweightRoutes);

app.listen(3001);
