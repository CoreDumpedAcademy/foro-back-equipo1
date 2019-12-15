/* eslint-disable consistent-return */
const PostSchema = require('../models/post');
const ResponseSchema = require('../models/response');

const createResponse = (req, res) => {
  // eslint-disable-next-line max-len
  PostSchema.findOne({ userName: req.body.userName, date: req.body.date, header: req.body.header }, (err, post) => {
    if (err) return res.status(404).send({ messsage: 'Post doen\'t exist', err });

    // eslint-disable-next-line no-underscore-dangle
    const idPostUser = post._id;

    const response = new ResponseSchema({
      idPost: idPostUser,
      bodyText: req.body.bodyText,
      userNameCreator: req.body.userNameCreator,
    });

    response.save((err1) => {
      if (err1) return res.status(500).send({ messsage: 'No response saved', err1 });
      return res.status(200).send({ messsage: 'Response saved' });
    });
  });
};

module.exports = {
  createResponse,
};
