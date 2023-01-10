const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("../middleware/multer.middleware");

router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPost);
router.get("/userPosts/:posterId", postController.getUserPosts);
router.post("/", multer, postController.createPost);

router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch("/like/:id", postController.likePost);
router.patch("/unlike/:id", postController.unlikePost);

router.patch("/comment/:id", postController.commentPost);
router.patch("/comment/edit/:id", postController.editCommentPost);
router.delete("/comment/delete/:id", postController.deleteCommentPost);

module.exports = router;
