const express = require("express");
const {
  upload,
  getResult,
  deleteUpload,
  deleteAll,
  getAllResult,
} = require("./router");
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.static("result"));

server.get("/result", getResult);
server.get("/all", getAllResult);
server.post("/upload", upload);
server.delete("/upload/:name", deleteUpload);
server.delete("/", deleteAll);

server.listen(8000, () => {
  console.log("Server started!");
});
