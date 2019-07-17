const IncomingForm = require("formidable").IncomingForm;
const rimraf = require("rimraf");
var { PythonShell } = require("python-shell");
const uuidv4 = require("uuid/v4");

exports.upload = function upload(req, res) {
  let form = new IncomingForm();
  form.parse(req);

  form.on("fileBegin", function(name, file) {
    file.path = __dirname + "/data/" + file.name;
  });
  form.on("file", function(name, file) {
    console.log("Uploaded " + file.name);
  });
  form.on("end", () => {
    res.json();
  });

};

exports.getResult = (req, res) => {
  const filename = uuidv4();
  //Call python
  const options = {
    args: ["--images", "data", "--output", `result/output_${filename}.png`],
  };
  PythonShell.run("image_stitching.py", options, function(err) {
    if (err) throw err;
    console.log("finished");
    return res.sendFile(__dirname + `/result/output_${filename}.png`);
  });
};

exports.deleteUpload = (req, res) => {
  rimraf(__dirname + "/data/" + req.params.name, function() {
    console.log("done");
  });
  res.status(200).send("Delete success");
};

exports.deleteAll = (req, res) => {
  rimraf(__dirname + "/data/*", function() {
    console.log("done");
  });
  res.status(200).send("Delete success");
};
