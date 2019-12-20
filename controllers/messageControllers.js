const Message = require('../models/message');

// eslint-disable-next-line consistent-return
const createMsg = (req, res) => {
  const newMsg = new Message({
    message: req.body.message,
    author: req.body.author,
    receiver: req.body.receiver,
  });

  newMsg.save((err) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    return res.status(200).send({ message: 'Message successfully sent' });
  });
};

const getSentMsg = (req, res) => {
  const { author } = req.body;
  const { receiver } = req.body;

  // Mensajes escritos por el author para el reciever
  Message.find({ author, receiver }, (err, msgA) => {
    if (err) return res.status(500).send({ message: 'Error', err });
    return res.status(200).send({ messages: msgA });
  }).sort({ date: -1 });
};

const getReceivedMsg = (req, res) => {
  const authorG = req.body.author;
  const receiverG = req.body.receiver;

  // Mensajes escritos por el receiver para el author
  Message.find({ receiver: authorG, author: receiverG }, (error, msgG) => {
    if (error) return res.status(200).send({ message: 'Error', error });
    return res.status(200).send({ messages: msgG });
  }).sort({ date: -1 });
};

module.exports = {
  createMsg,
  getReceivedMsg,
  getSentMsg,
};
