const filesSizeLimiter = (MB) => {
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;
  return (req, res, next) => {
    const image = req.files.image;
    console.log(image);

    let fileOverLimit;
    if (image.size > FILE_SIZE_LIMIT) {
      fileOverLimit = image.name;
    }

    if (fileOverLimit) {
      console.log("Image over than 5MB");

      let errors = {
        format: "",
        fileSize: `fichier supérieur à ${MB}MB`,
      };
      return res.status(400).send({ errors });
    }

    next();
  };
};

module.exports = filesSizeLimiter;
