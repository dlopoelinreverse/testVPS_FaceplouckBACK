const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    conversationTitle: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      required: true,
    },
    messages: {
      type: [
        {
          participantId: String,
          message: String,
          reactions: Object,
          timestamp: Number,
        },
      ],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("conversation", conversationSchema);
module.exports = ConversationModel;
