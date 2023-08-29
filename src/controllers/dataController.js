const Data = require("../models/DataModel");
const fs = require("fs").promises;
const path = require("path");

/**
 * Function to upload data to the server
 * @param {*} req
 * @param {*} res
 */
exports.uploadData = async (req, res) => {
  if (!req.file || !req.body.name || !req.body.description) {
    return res
      .status(400)
      .json({ error: "Bad Request: " + JSON.stringify(req.body) });
  }

  const name = req.body.name;
  const description = req.body.description;
  const model = req.body.model;
  const file = req.file;
  const fileContent = await fs.readFile(file.path);
  const date = new Date();

  const formatNumber = (number) => number.toString().padStart(2, "0");
  const formattedDate = `${formatNumber(date.getDate())}.${formatNumber(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;

  const data = new Data({
    filename: file.originalname,
    uploader: name,
    uploadDate: formattedDate,
    description: description,
    model: model,
    file: fileContent,
  });

  await data.save();

  res.status(200).json({
    message: "Data uploaded successfully!",
    data: data,
  });
};

exports.getDataInformation = async (req, res) => {
  const dataInfo = await Data.find();

  res.status(200).json({
    message: "Data fetched successfully!",
    data: dataInfo,
  });
};

exports.downloadFile = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const dataId = req.params.id;
  const data = await Data.findOne({ id: dataId });

  if (data) {
    const fileData = data.file; 
    const filename = data.filename;
    const fileBuffer = Buffer.from(fileData.buffer);

    // Set headers for the response
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('Content-Type', 'application/octet-stream');

    // Send the buffer as a file
    res.end(fileBuffer);
} else {
    console.log("Document not found");
    return res.status(404).json({ error: "File not found" });
}

};

exports.downloadAllFiles = async (req, res) => {
  const data = await Data.find();

  if (!data) {
    return res.status(404).json({ error: "Files not found" });
  }

  const zip = new require("node-zip")();
  const zipName = "data.zip";

  data.forEach((file) => {
    const data = fs.readFileSync(file.path);
    zip.file(file.filename, data);
  });

  const dataToSend = zip.generate({ base64: false, compression: "DEFLATE" });

  fs.writeFileSync(zipName, dataToSend, "binary");

  res.download(zipName);

  res.status(200).json({
    message: "Files downloaded successfully!",
    data: data,
  });

  fs.unlinkSync(zipName);
};