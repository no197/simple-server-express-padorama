const express = require("express");
const { upload, getResult, deleteUpload, deleteAll } = require("./router");
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));

server.get("/result", getResult);
server.post("/upload", upload);
server.delete("/upload/:name", deleteUpload);
server.delete("/", deleteAll);

server.listen(8000, () => {
  console.log("Server started!");
});
