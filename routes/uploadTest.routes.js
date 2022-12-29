const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "/uploads/" });
const uploadTestController = require("../controllers/uploadTest.controller");

router.post("/", upload.single("files"), uploadTestController.uploadFiles);

module.exports = router;
