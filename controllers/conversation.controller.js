const ConversationModel = require("../models/conversation.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllConversations = (req, res) => {
  ConversationModel.find({ participant: req.params.id })
    .then((docs) => res.send(docs))
    .catch((err) =>
      res
        .status(400)
        .send("Error to get specific conversations data of : " + req.params.id)
    );
};

module.exports.createConversation = async (req, res) => {
  const participant1 = req.body.participantId1;
  const participant2 = req.body.participantId2;

  const title = req.body.title;

  if (!ObjectID.isValid(participant1) || !ObjectID.isValid(participant2))
    return res.status(400).send("Error | Check the participants ids");

  const newConversation = new ConversationModel({
    conversationTitle: title,
    participants: [participant1, participant2],
    messages: [],
    color: "default",
  });

  try {
    const conversation = await newConversation.save();
    const conversationId = conversation._id;

    UserModel.findByIdAndUpdate(
      participant1,
      {
        $addToSet: { conversations: conversationId },
      },
      { new: true }
    )
      // .then((docs) => res.send(docs))
      .catch((err) => res.send(err));

    UserModel.findByIdAndUpdate(
      participant2,
      {
        $addToSet: { conversations: conversationId },
      },
      { new: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.send(err));
  } catch (err) {
    return res
      .status(400)
      .send("Error | Cannot create a new conversation (try/catch) " + err);
  }
};

module.exports.addParticipant = async (req, res) => {
  const conversationId = req.params.id;
  const newParticipant = req.body.participantId;
  if (!ObjectID.isValid(newParticipant))
    return res
      .status(400)
      .send(
        "Error | Cannot add this participant, this id is not found : " +
          newParticipant
      );
  if (!ObjectID.isValid(conversationId))
    return res
      .status(400)
      .send(
        "Error | Cannot add new participant, id conversation not found : " +
          conversationId
      );
  // if (ConversationModel.findOne)
  const conversationParticipants = await ConversationModel.findOne({
    _id: conversationId,
  }).then((docs) => docs.participants);
  if (conversationParticipants.includes(newParticipant))
    return res
      .status(400)
      .send("Error | The new participant ID already in the conversation");
  try {
    ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        $push: { participants: newParticipant },
      },
      { new: true }
    )
      // .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res
          .status(400)
          .send("Error | Cannot add this new participant to " + req.params.id)
      );
    UserModel.findByIdAndUpdate(
      newParticipant,
      {
        $addToSet: { conversations: conversationId },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res
          .status(400)
          .send(
            "Error | Cannot add the conversation ID to the new participant user profil " +
              err
          )
      );
  } catch (err) {
    return res.status(400).send("Error | Cannot add this new participant");
  }
};

module.exports.pullParticipant = (req, res) => {
  const participantToRemove = req.body.participantId;
  const conversationId = req.params.id;
  if (!ObjectID.isValid(participantToRemove))
    return res
      .status(400)
      .send(
        "Error | Cannot remove this participant, this id is not found : " +
          participantToRemove
      );
  if (!ObjectID.isValid(conversationId))
    return res
      .status(400)
      .send(
        "Error | Cannot remove particiaent, id conversation not found : " +
          conversationId
      );

  try {
    ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        $pull: { participants: participantToRemove },
      },
      { new: true }
    )
      // .then((docs) => res.send(docs))
      .catch((err) =>
        res
          .status(400)
          .send(
            "Error | Cannot remove this participant : " + participantToRemove
          )
      );
    UserModel.findByIdAndUpdate(
      participantToRemove,
      {
        $pull: { conversations: conversationId },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res
          .status(400)
          .send(
            "Error | Cannot remove the conversation ID from the leaving participant"
          )
      );
  } catch (err) {
    return res.status(400).send("Error | Cannot remove participant");
  }
};

module.exports.message = (req, res) => {
  const userId = req.body.userId;
  const conversationId = req.params.id;
  const message = req.body.message;

  if (!ObjectID.isValid(userId))
    return res.status(400).send("Error | The user id not found : " + userId);

  if (!ObjectID.isValid(conversationId))
    return res
      .status(400)
      .send("Error | The conversation id not found : " + conversationId);

  const newMessage = {
    participantId: userId,
    message: message,
    reactions: { likes: 0, applauses: 0, smiley: 0 },
    timestamp: Date.now(),
  };

  try {
    ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: { messages: newMessage },
      },
      { new: true }
    ).then((docs) => res.status(200).send(docs));
  } catch (err) {
    return res
      .status(400)
      .send("Error | Cannot add a new message to the conversation " + err);
  }
};

module.exports.editMessage = (req, res) => {
  const conversationId = req.params.id;
  const messageId = req.body.messageId;
  const newContent = req.body.newContent;

  if (!ObjectID.isValid(conversationId))
    return res
      .status(400)
      .send("Error | Conversation id not found : " + conversationId);

  if (!ObjectID.isValid(messageId))
    return res.status(400).send("Error | Message id not found : " + messageId);

  try {
    ConversationModel.findById(conversationId).then((docs) => {
      const messageToEdit = docs.messages.find((message) =>
        message._id.equals(messageId)
      );

      if (!messageToEdit)
        return res.status(400).send("Error | Message not found");
      messageToEdit.message = newContent;
      return docs
        .save()
        .then((docs) => res.status(200).send(docs))
        .catch((err) =>
          res
            .status(400)
            .send("Error | Failed to edit message : " + messageId + err)
        );
    });
  } catch (err) {
    return res.status(400).send("Error | Cannot edit message " + err);
  }
};

module.exports.deleteMessage = (req, res) => {
  const messageId = req.body.messageId;
  const conversationId = req.params.id;

  if (!ObjectID.isValid(conversationId))
    return res
      .status(400)
      .send("Error | Conversation id not found : " + conversationId);

  if (!ObjectID.isValid(messageId))
    return res.status(400).send("Error | Message id not found : " + messageId);

  try {
    ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        $pull: {
          messages: {
            _id: messageId,
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res
          .status(400)
          .send("Error | Failed to delete message : " + messageId + err)
      );
  } catch (err) {
    return res.status(400).send("Error | Cannot delete message " + err);
  }
};
