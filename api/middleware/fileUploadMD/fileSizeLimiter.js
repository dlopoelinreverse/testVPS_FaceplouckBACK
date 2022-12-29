const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const filesSizeLimiter = (req, res, next) => {
  const files = req.files;
  const filesOverLimit = [];
  // Wich files are over the limit ?
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length) {
    const properVerb = filesOverLimit > 1 ? "are" : "is";

    const sentence =
      `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB`.replace(
        ",",
        ", "
      );

    const message =
      filesSizeLimiter < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/,(?=[^,]*$)/, " and");

    // return res.status(413).send({ status: "error", message });
    let errors = {
      format: "",
      fileSize: "fichier supérieur à 5MB",
    };
    console.log(errors.fileSize);
    return res.status(200).send({ errors });
  }

  next();
};

module.exports = filesSizeLimiter;
