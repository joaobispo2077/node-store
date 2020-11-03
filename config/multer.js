/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
require('dotenv/config');
const multer = require('multer');
const crypto = require('crypto');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

function setFileName(req, file) {
  const hash = crypto.randomBytes(6).toString('hex');

  const fileName = `${hash}-${file.originalname}`;

  return fileName;
}

const resolveBlobName = (req, file) => {
  return new Promise((resolve, reject) => {
      const blobName = setFileName(req, file);
      resolve(blobName);
  });
};

function setMetaData(req, file) {
  const { title, slug } = req.body;

  const metadata = { title, slug };

  return metadata;
}

const resolveMetadata = (req, file) => {
  return new Promise((resolve, reject) => {
      const metadata = setMetaData(req, file);
      resolve(metadata);
  });
};


const azureStorage = new MulterAzureStorage({
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    accessKey: process.env.AZURE_STORAGE_ACCESS_KEY,
    accountName: process.env.AZURE_STORAGE_ACCOUNT,
    containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
    containerAccessLevel: 'blob',
    blobName: resolveBlobName,
    metadata: resolveMetadata,
    urlExpirationTime: 60,  mimetype: 'image/jpeg'
});

const upload = multer({ storage: azureStorage});

module.exports = upload;