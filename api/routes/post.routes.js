const router = require("express").Router();
const postController = require("../controllers/post.controller");
// const fileUpload = require("express-fileupload");
// const filesPayloadExists = require("../middleware/fileUploadMD/filesPayloadExists");
// const filesSizeLimiter = require("../middleware/fileUploadMD/fileSizeLimiter");
// const fileExtLimiter = require("../middleware/fileUploadMD/fileExtLimiter");

const multer = require("multer");

const FILE_PATH = "uploads";

const upload = multer({
  dest: `${FILE_PATH}/`,
});

router.post("/testUpload", upload.single("postPic"), async (req, res) => {
  try {
    const postPic = req.file;

    if (!postPic) {
      res.status(400).send({
        status: "failed",
        data: "No file is selected.",
      });
    } else {
      const maxSize = 625000;
      if (postPic.size > maxSize) {
        res.status(500).send({
          status: "failed",
          message:
            "Image trop volumineuse, choisir un fichier de moins de 5MB.",
        });
      }
      res.send({
        status: "success",
        message: "File is uploaded.",
        data: {
          name: postPic.originalname,
          mimetype: postPic.mimetype,
          size: postPic.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPost);
router.get("/userPosts/:posterId", postController.getUserPosts);
router.post("/", postController.createPost);
// router.post(
//   "/picture",
//   fileUpload({ createParentPath: true }),
//   filesPayloadExists,
//   fileExtLimiter([".png", ".jpg", ".jpeg", ".JPG", ".PNG"]),
//   filesSizeLimiter,
//   postController.createPostPicture
// );

router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/like/:id", postController.likePost);
router.patch("/unlike/:id", postController.unlikePost);

router.patch("/comment/:id", postController.commentPost);
router.patch("/comment/edit/:id", postController.editCommentPost);
router.delete("/comment/delete/:id", postController.deleteCommentPost);

module.exports = router;
