const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/fileUploadMD/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileUploadMD/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileUploadMD/fileSizeLimiter");
const uploadController = require("../controllers/upload.controller");

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
router.put(
  "/update/:id",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg", ".gif"]),
  fileSizeLimiter(5), // MB
  uploadController.userPicture
);

module.exports = router;
