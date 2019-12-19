const Message = require('../models/message');

// eslint-disable-next-line consistent-return
const createMsg = (req, res) => {
  const newMsg = new Message({
    message: req.body.message,
    author: req.body.author,
    reciever: req.body.reciever,
  });

  newMsg.save((err) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    return res.status(200).send({ message: 'Message successfully sent' });
  });
};

const getSentMsg = (req, res) => {
  const { author } = req.body;
  const { reciever } = req.body;

  // Mensajes escritos por el author para el reciever
  Message.find({ author, reciever }, (err, msgA) => {
    if (err) return res.status(500).send({ message: 'Error', err });
    return res.status(200).send(msgA);
  }).sort({ date: -1 });
};

const getReceivedMsg = (req, res) => {
  const authorG = req.body.author;
  const recieverG = req.body.reciever;

  // Mensajes escritos por el reciever para el author
  Message.find({ reciever: authorG, author: recieverG }, (error, msgG) => {
    if (error) return res.status(200).send({ message: 'Error', error });
    return res.status(200).send(msgG);
  }).sort({ date: -1 });
};

module.exports = {
  createMsg,
  getReceivedMsg,
  getSentMsg,
};
