const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    //Are the file extension allowed
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );

      let errors = {
        format: "format incorrect, veuillez essayer avec .jpg/.jpeg/.png",
        fileSize: "",
      };
      // return res.status(422).send({ status: "error", message });
      return res.status(200).send({ errors });
    }

    next();
  };
};

module.exports = fileExtLimiter;
