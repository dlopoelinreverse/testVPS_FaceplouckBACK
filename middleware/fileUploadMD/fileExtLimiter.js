const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const image = req.files.image;
    console.log(image);

    const fileExtension = path.extname(image.name).toLowerCase();

    console.log("File extension : ", fileExtension);

    const allowed = allowedExtArray.includes(fileExtension);

    if (!allowed) {
      let errors = {
        format: "format incorrect, veuillez essayer avec .jpg/.jpeg/.png",
        fileSize: "",
      };
      return res.status(400).send({ errors });
    }

    next();
  };
};

module.exports = fileExtLimiter;
