const Data = require('../models/DataModel');
const fs = require('fs');
const path = require('path');

/**
 * Function to upload data to the server
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadData = async (req, res) => {
    if (!req.file || !req.body.name || !req.body.carModel || !req.body.description) {
        return res.status(400).json({ error: 'Bad Request' });
    }

    const { name, carModel, description } = req.body;
    const { file } = req.file;

    const data = new Data({
        filename: file.filename,
        uploader: name,
        carModel: carModel,
        uploadDate: Date.now(),
        description: description,
        path: file.path
    });

    await data.save();

    res.status(200).json({
        message: "Data uploaded successfully!",
        data: data
    });
}

exports.getDataInformation = async (req, res) => {
    const dataInfo = await Data.find();

    res.status(200).json({
        message: "Data fetched successfully!",
        data: dataInfo
    });
}

exports.downloadFile = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'Bad Request' });
    }

    const dataId = req.params.id;
    const data = await Data.findById(dataId);
    
    if (!data) {
        return res.status(404).json({ error: 'File not found' });
    }

    res.download(data.filePath);

    // res.status(200).json({
    //     message: "File downloaded successfully!",
    //     data: data
    // });
};

exports.downloadAllFiles = async (req, res) => {
    const data = await Data.find();

    if (!data) {
        return res.status(404).json({ error: 'Files not found' });
    }

    const zip = new require('node-zip')();
    const zipName = 'data.zip';

    data.forEach(file => {
        const data = fs.readFileSync(file.path);
        zip.file(file.filename, data);
    });

    const dataToSend = zip.generate({ base64: false, compression: 'DEFLATE' });

    fs.writeFileSync(zipName, dataToSend, 'binary');

    res.download(zipName);

    res.status(200).json({
        message: "Files downloaded successfully!",
        data: data
    });

    fs.unlinkSync(zipName);
}




