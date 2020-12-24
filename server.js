require("dotenv").config();

const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.use(cors());
app.use(express.json());

const receiptsRouter = require("./routes/receipts");
app.use("/receipts", receiptsRouter);

app.get("/", (req, res) => {
  res.send("Using https!");
});

var key = fs.readFileSync(__dirname + "/certs/key.pem");
var cert = fs.readFileSync(__dirname + "/certs/cert.pem");
var options = {
  key: key,
  cert: cert,
};
console.log(key, cert);

var server = https.createServer(options, app);

server.listen(process.env.PORT, () =>
  console.log(`server has started at port ${process.env.PORT}`)
);
