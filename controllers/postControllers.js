const PostSchema = require('../models/post');
// const responsePost = require('../models/post');

const create = (req, res) => {
  const post = new PostSchema({
    header: req.body.header,
    bodyText: req.body.bodyText,
    userName: req.body.userName,
  });

  post.save((err) => {
    if (err) return res.status(500).send({ message: 'Error', err });
    return res.status(200).send({ message: 'Post sucessfully uploaded' });
  });
};

const getAll = (req, res) => {
  PostSchema.find({}, (err, users) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }

    return res.status(200).send(users);
  });
};

const deletePost = (req, res) => {
  PostSchema.findOneAndDelete({ userName: req.body.userName, header: req.body.header }, (err) => {
    if (err) return res.status(404).send({ message: 'Post doen\'t exist' });
    return res.status(200).send({ message: 'Post deleted' });
  });
};

module.exports = {
  create,
  getAll,
  deletePost,
};
