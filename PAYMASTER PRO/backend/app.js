const express = require("express");
const connectDB = require("./db");
const cors = require('cors');
const router = require("./routes");
const PORT = 8000;

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api/v1", router);

connectDB();

app.listen(PORT, () => console.log("Server Started!"));