const PostSchema = require('../models/post');

const create = (req, res) => {
  const post = new PostSchema(req.body);

  post.save((err) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    return res.status(200).send({ message: 'Post sucessfully uploaded' });
  });
};

const getPosts = (req, res) => {
  const page = Number(req.body.page);
  let limitN = 10;
  const skip = limitN * (page - 1);
  limitN *= page;

  PostSchema.find({}, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }

    return res.status(200).send(posts);
  }).sort({ date: -1 }).limit(limitN).skip(skip);
};

const getPostByUserName = (req, res) => {
  const { userName } = req.body;

  PostSchema.find({ userName: new RegExp(`^${userName}$`, 'i') }, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }

    return res.status(200).send(posts);
  });
};

const getPostByHeader = (req, res) => {
  const { header } = req.body;

  PostSchema.find({ header: new RegExp(header, 'i') }, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }

    return res.status(200).send(posts);
  });
};

module.exports = {
  create,
  getPosts,
  getPostByUserName,
  getPostByHeader,
};
