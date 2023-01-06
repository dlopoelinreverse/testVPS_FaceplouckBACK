const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/png": ".png",
};

const options = multer({
  // destination: (req, file, cb) => {
  //   cb(null, "images");
  // },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];

    cb(null, name + "_" + Date.now() + extension);
  },
});

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype) {
//     return cb(null, true);
//   } else {
//     // cb("Error: Images Only!");
//     cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//   }
// };

module.exports = multer(options).single("image");
