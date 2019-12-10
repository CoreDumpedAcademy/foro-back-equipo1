const PostSchema = require('../models/post');

const create = (req, res) => {
  const post = new PostSchema(req.body);

  post.save((err) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    return res.status(200).send({ message: 'Post sucessfully uploaded' });
  });
};

module.exports = {
  create,
};
