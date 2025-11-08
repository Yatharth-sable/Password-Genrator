

const express = require("express");
const app = express()
const userRoutes = require("./routes/User");
// const { collection } = require('mongodb');
require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
const cors = require("cors");
const database = require("../backend/config.js/database");

const port = process.env.PORT || 3001;

console.log("this is the port", port);

app.use(cors());
app.use(bodyparser.json());

database.connect();

app.use("/api/auth", userRoutes);

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running ✅" + port);
});
