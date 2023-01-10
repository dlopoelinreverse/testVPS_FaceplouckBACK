const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tmp");
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + Date.now() + "." + extension);
  },
});

const upload = {
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error(
          "Seulment les formats .jpg, .jpeg, .png et gif sont acceptés."
        )
      );
    }
  },
};

module.exports = multer(upload).single("image");
