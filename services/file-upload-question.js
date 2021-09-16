require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_ID,
    // region: "us-east-2",
});
const s3 = new aws.S3();



const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype == "image/jpeg" ||  file.mimetype == "video/mp4") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: process.env.AWS_BUCKET_QUESTION_NAME,
        metadata: function (req, file, cb) {
            console.log("metafata");
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log("key");
            cb(null, Date.now().toString() + "." + file.mimetype.split("/")[1]);
        }
    })
})

module.exports = upload;

