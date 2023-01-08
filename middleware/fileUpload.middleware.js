// const multer = require("multer");

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/gif": "gif",
//   "image/png": "png",
// };

// const options = multer.diskStorage({
//   //   destination: function (req, file, cb) {
//   //     cb(null, "../client/public/uploads/test/userPicsProfil/");
//   //   },
//   //   path: function (req, file, cb) {
//   //     const extension = MIME_TYPES[file.mimetype];
//   //     console.log(extension);

//   //     cb(null, file.filename + "." + extension);
//   //   },
//   fileFilter: function (req, file, cb) {
//     // The function should call `cb` with a boolean
//     // to indicate if the file should be accepted

//     // To reject this file pass `false`, like so:
//     if (
//       file.mimetype !== "image/png" ||
//       file.mimetype !== "image/jpg" ||
//       file.mimetype !== "image/jpeg" ||
//       file.mimetype !== "image/gif"
//     ) {
//       console.log("Got file of type", file.mimetype);
//       return cb(new Error("Only image files are allowed!"));
//     }

//     // To accept the file pass `true`, like so:
//     cb(null, true);
//   },
// });

// module.exports = multer({ options });
