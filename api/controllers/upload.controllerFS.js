const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadError } = require("../utils/errors");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  // multer envoi un req.file à exploiter

  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/jpeg" &&
      req.file.detectedMimeType !== "image/png"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadError(err);
    return res.status(201).send({ errors });
  }

  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );
};
