const AWS = require('aws-sdk');
const { Config, Credentials } = AWS;

const config = new Config();
const region = process.env.REGION || config.region || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || config.credentials.accessKeyId;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || config.credentials.secretAccessKey;

AWS.config.update({
  region,
  credentials: new Credentials(accessKeyId, secretAccessKey),
});

module.exports = AWS;
