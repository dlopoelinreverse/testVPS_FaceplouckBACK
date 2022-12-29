const router = require("express").Router();
const postController = require("../controllers/post.controller");
const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/fileUploadMD/filesPayloadExists");
const filesSizeLimiter = require("../middleware/fileUploadMD/fileSizeLimiter");
const fileExtLimiter = require("../middleware/fileUploadMD/fileExtLimiter");

router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPost);
router.get("/userPosts/:posterId", postController.getUserPosts);
router.post("/", postController.createPost);
router.post(
  "/picture",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg", ".JPG", ".PNG"]),
  filesSizeLimiter,
  postController.createPostPicture
);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/like/:id", postController.likePost);
router.patch("/unlike/:id", postController.unlikePost);

router.patch("/comment/:id", postController.commentPost);
router.patch("/comment/edit/:id", postController.editCommentPost);
router.delete("/comment/delete/:id", postController.deleteCommentPost);

module.exports = router;
