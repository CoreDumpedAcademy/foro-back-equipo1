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
  let userNameLC = [];

  PostSchema.find({ }, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }

    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].userName.toLowerCase().includes(userName.toLowerCase())) {
        userNameLC.push(posts.userName);
      }
    }
    return res.status(200).send(userNameLC);
  });
};

const getPostByHeader = (req, res) => {
  const { header } = req.body;

  PostSchema.find({ header: { $regex: header } }, (err, posts) => {
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
