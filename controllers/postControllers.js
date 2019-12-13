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

  PostSchema.find({}, (err, users) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }

    return res.status(200).send(users);
  }).sort({ date: -1 }).limit(limitN).skip(skip);
};

module.exports = {
  create,
  getPosts,
};
