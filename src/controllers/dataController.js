const Data = require("../models/DataModel");
const fs = require("fs").promises;
const archiver = require('archiver');
const { sendUploadWebhook } = require("../utils/discord");

/**
 * Function to upload a file with corresponding information to the database
 * @param {*} req the HTTP request object
 * @param {*} res the HTTP response object
 */
exports.uploadData = async (req, res) => {

  // Check that request body contains all required fields
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

  // Format date to DD.MM.YYYY
  const formatNumber = (number) => number.toString().padStart(2, "0");
  const formattedDate = `${formatNumber(date.getDate())}.${formatNumber(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;

  // Create new data object
  const data = new Data({
    filename: file.originalname,
    uploader: name,
    uploadDate: formattedDate,
    description: description,
    model: model,
    file: fileContent,
  });

  // Save data object to database
  await data.save();
  sendUploadWebhook(data.uploader, data.filename, data.description);

  // Send ok response if successful
  res.status(200).json({
    message: "OK",
    data: data,
  });
};

/**
 * Function to get all data from the database
 * @param {*} req the HTTP request object
 * @param {*} res the HTTP response object
 */
exports.getDataInformation = async (req, res) => {

  // Get all data from database
  const dataInfo = await Data.find();

  // Send response with all data if successful
  res.status(200).json({
    message: "OK",
    data: dataInfo,
  });
};

/**
 * Function to get a specific data entry from the database and send it as a file in response
 * @param {*} req the HTTP request object
 * @param {*} res the HTTP response object
 */
exports.downloadFile = async (req, res) => {

  // Check that request contains an id
  if (!req.params.id) {
    return res.status(400).json({ error: "Bad Request" });
  }

  // Find data entry by id
  const dataId = req.params.id;
  const data = await Data.findOne({ id: dataId });

  // Send file if data entry was found
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
    return res.status(404).json({ error: "Not found" });
}

};

/**
 * Function to get all data entries from the database and send them as a zip file in response
 * @param {*} req the HTTP request object
 * @param {*} res the HTTP response object
 */
exports.downloadAllFiles = async (req, res) => {

  // Get all data from database
  const allData = await Data.find();

  // Send error if no data was found
  if (!allData || allData.length === 0) {
      return res.status(404).json({ error: "Not found" });
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

  archive.finalize();
};