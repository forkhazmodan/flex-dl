const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('/opt/venv/bin/yt-dlp');
const fs = require('fs');
const path = require('path');
const router = express.Router();
global.downloadProgress = {};
const multer = require('multer');
const upload = multer();

require('dotenv').config();

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file from your local system to S3
const uploadFileToS3 = async (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  const uploadParams = {
    Bucket: 'chmax.mediastore.v1', // Replace with your bucket name
    Key: `uploads/${fileName}`,  // File name you want to save as in S3
    Body: fileContent,           // The file content
  };

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command); // Upload the file to S3
  return uploadParams;       // Return the key of the uploaded file
};

function updateProgress(fileId, progress) {
  console.log(fileId, progress)
  global.downloadProgress[fileId] = progress
}

//
// // Function to upload a file from your local system to S3
// const uploadFileToS3 = (filePath) => {
//   // Read the file from the local filesystem
//   const fileContent = fs.readFileSync(filePath);
//   const fileName = path.basename(filePath);
//
//   // Set the parameters for the S3 upload
//   const params = {
//     Bucket: 'chmax.mediastore.v1', // Replace with your bucket name
//     Key: `uploads/${fileName}`,  // File name you want to save as in S3
//     Body: fileContent,           // The file content
//   };
//
//   // Upload the file to S3
//   return s3.upload(params).promise(); // Returns a promise
// };

/* GET home page. */
router.post('/', upload.none(), function(req, res, next) {
  const { id, url } = req.body;

  updateProgress(id, {
    percent: 0,
    totalSize: undefined,
    currentSpeed: undefined,
    eta: undefined,
    updateAt: Date.now()
  })

  let ytDlpEventEmitter = ytDlpWrap.exec([
    url,
    '-f',
    'best',
    '-o',
    `/app/public/downloads/${id}.mp4`,
  ])
  .on('progress', (progress) => {
    updateProgress(id, {
      percent: progress.percent,
      totalSize: progress.totalSize,
      currentSpeed: progress.currentSpeed,
      eta: progress.eta,
      updateAt: Date.now(),
      url: undefined,
      status: undefined
    })

    console.log(
        ytDlpEventEmitter.ytDlpProcess.pid,
        progress.percent,
        progress.totalSize,
        progress.currentSpeed,
        progress.eta,
        progress.status
    )
  })
  .on('ytDlpEvent', (eventType, eventData) => {
    console.log(eventType, eventData)
    downloadProgress[id].status = "downloading"
  })
  .on('error', (error) => console.error(error))
  .on('close', async () => {
    downloadProgress[id].status = "preparing"

    const uploadParams = await uploadFileToS3(`/app/public/downloads/${id}.mp4`);

    // Generate a pre-signed URL for the uploaded file with 15 minutes expiration
    const signedUrl = await getSignedUrl(s3Client, new PutObjectCommand({
      Bucket: 'chmax.mediastore.v1', // Replace with your bucket name
      Key: uploadParams.Key,                    // The same key used during the upload
    }), { expiresIn: 15 * 60 });  // 15 minutes in seconds



    const s3Url = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Bucket}/${uploadParams.Key}`;


    downloadProgress[id].url = s3Url
    downloadProgress[id].location = uploadParams.Location
    downloadProgress[id].signedUrl = signedUrl
    downloadProgress[id].status = "ready"
  });

  console.log(ytDlpEventEmitter.ytDlpProcess.pid);

  res.json({
    url: `http://localhost:3000/download/${id}`
  })
});

/* GET progress by pid */
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (downloadProgress[id]) {
    res.json(downloadProgress[id]);
  } else {
    res.status(404).json({ error: 'No download in progress for this UUID' });
  }
});




module.exports = router;
