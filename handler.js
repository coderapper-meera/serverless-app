'use strict';
const s3Util = require('./s3-util')
const convert = require('./convert')

module.exports.init = async event => {
  const eventRecord = event.Records && event.Records[0]
  const bucket = eventRecord.s3.bucket.name
  const key = eventRecord.s3.object.key
  const filePath = './temp/file1.xlsx'
  const convertedfilePath = filePath.replace(/\.[^.]+$/, 'csv')

  const result = await s3Util.downloadFileFromS3(filePath, bucket, key)
  if (result) {
    await convert(filePath, convertedfilePath)
    await s3Util.uploadFileToS3(convertedfilePath, bucket, key)
  }
  return { message: 'Function executed successfully!'};
};
