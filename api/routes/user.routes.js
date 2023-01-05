const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadControllerFS = require("../controllers/upload.controllerFS");

// const multer = require("../middleware/multer");
const multer = require("multer");
const upload = multer();
// const multer = require("../middleware/multer-config");
// const fileUpload = require("express-fileupload");
// const filesPayloadExists = require("../middleware/fileUploadMD/filesPayloadExists");
// const filesSizeLimiter = require("../middleware/fileUploadMD/fileSizeLimiter");
// const fileExtLimiter = require("../middleware/fileUploadMD/fileExtLimiter");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadControllerFS.uploadProfil);
// router.post(
//   "/upload",
//   fileUpload({ createParentPath: true }),
//   filesPayloadExists,
//   fileExtLimiter([".png", ".jpg", ".jpeg", ".JPG", ".PNG"]),
//   filesSizeLimiter,
//   uploadController.uploadProfil
// );

module.exports = router;
