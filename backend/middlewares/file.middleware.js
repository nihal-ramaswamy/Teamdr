const config = require("config");

var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const s3Config = config.get("s3");

const isProd = config.get("isProd");

var storage;

const s3 = new aws.S3({
    accessKeyId: s3Config.AWSAccessKeyId,
    secretAccessKey: s3Config.AWSSecretKey,
});

if (isProd) {
    storage = multerS3({
        s3: s3,
        bucket: s3Config.bucketName,
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname);
        },
    });
} else {
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images");
        },
        filename: (req, file, cb) => {
            cb(
                null,
                file.fieldname + "-" + Date.now() + "_" + file.originalname
            );
        },
    });
}

exports.upload = multer({ storage: storage });
