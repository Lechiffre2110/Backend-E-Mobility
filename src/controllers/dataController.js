const Data = require("../models/DataModel");
const fs = require("fs").promises;
const archiver = require('archiver');
const { sendUploadWebhook } = require("../utils/discord");

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
  sendUploadWebhook(data.uploader, data.filename, data.description);

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
  const allData = await Data.find();

  if (!allData || allData.length === 0) {
      return res.status(404).json({ error: "Files not found" });
  }

  // Create a new archive
  const archive = archiver('zip', {
      zlib: { level: 9 }
  });

  // Register an error handler
  archive.on('error', (err) => {
      res.status(500).send({ error: err.message });
  });

  // Set headers
  res.setHeader('Content-Disposition', 'attachment; filename=allFiles.zip');
  res.setHeader('Content-Type', 'application/zip');

  // Pipe the archive to the response
  archive.pipe(res);

  // Append files to the archive
  for (const data of allData) {
      const fileBuffer = Buffer.from(data.file.buffer);
      archive.append(fileBuffer, { name: data.filename });
  }

  // Finalize the archive
  archive.finalize();
};