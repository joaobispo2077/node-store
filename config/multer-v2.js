/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
require('dotenv/config');
const multer = require('multer');
const crypto = require('crypto');
const MulterAzureStorage = require('multer-azure-storage');

function setFileName(req, file, cb) {
  const hash = crypto.randomBytes(6).toString('hex');
  console.log(req.file);
  const fileName = `${hash}-${file.originalname}`;

  return fileName;
}

const azureStorage = new MulterAzureStorage({

    azureStorageAccessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT,
    containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
    containerSecurity: 'blob',
    // fileName: setFileName,
});

const upload = multer({ storage: azureStorage });

module.exports = upload;