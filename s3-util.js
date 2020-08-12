const aws = require('aws-sdk')
const fs = require('fs')

const downloadFileFromS3 = async (filePath, bucket, key) => {
  const s3 = new aws.S3({
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRET,
    Bucket: bucket
  })

  var params = { Bucket: bucket, Key: key }

  try {
    const res = await s3.getObject(params).promise()
    await fs.writeFileSync(filePath, res.Body)
    console.log(`File is dowloaded in ${filePath} `)
    return true
  } catch (error) {
    console.log('error', error)
    return false
  }
}

const uploadFileToS3 = async (filePath, bucket, key) => {
  const s3 = new aws.S3({
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRET,
    Bucket: bucket
  })
  fs.readFile(filePath, (err, data) => {
    if (err) console.error(err)
    var base64data = Buffer.from(data, 'binary')
    var uploadParams = {
      Bucket: bucket,
      Key: key.replace(/\.[^.]+$/, 'csv'),
      Body: base64data
    }
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(`Upload Error ${err}`)
      } else {
        console.log('Converted file is uploaded to s3!')
      }
    })
  })
}

module.exports = {
  downloadFileFromS3,
  uploadFileToS3
}
