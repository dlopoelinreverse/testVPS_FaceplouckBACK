const router = require("express").Router();
const conversationController = require("../controllers/conversation.controller");

router.get("/:id", conversationController.getAllConversations);
router.post("/", conversationController.createConversation);
router.patch("/add/:id", conversationController.addParticipant);
router.patch("/pull-participant/:id", conversationController.pullParticipant);
// delete conversation ?
router.patch("/message/:id", conversationController.message);
router.patch("/message/edit/:id", conversationController.editMessage);
router.delete("/message/delete/:id", conversationController.deleteMessage);

module.exports = router;
