const Conversation = require("../model/participant.model");
const MyChatAppMessage = require("../model/message.model");

const messagesController = {
  async sendMessage(req, res) {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [senderId, receiverId]
        });
      }

      const newMessage = new MyChatAppMessage({
        senderId,
        receiverId,
        message
      });

      if (newMessage) {
        console.log(newMessage._id);
        conversation.messages.push(newMessage._id);
        console.log("hit");
      }
      // await newMessage.save();
      // await conversation.save();

      await Promise.all([conversation.save(), newMessage.save()]);
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("error in send message ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getMessages(req, res) {
    try {
      const { id: chatWith } = req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, chatWith] }
      }).populate("messages");

      if (conversation) {
        res.status(200).json(conversation.messages);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      console.log("error in get message", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // async sendMessage(req, res) {},
  // async sendMessage(req, res) {},
  // async sendMessage(req, res) {},
};

module.exports = messagesController;
