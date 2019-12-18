const PostSchema = require('../models/post');
const responsePost = require('../models/response');

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

const sendPostAndRes = (req, res) => {
  const postAndRes = [];
  // eslint-disable-next-line max-len
  PostSchema.findOne({ userName: req.body.userName, date: req.body.date, header: req.body.header }, (err, post) => {
    if (err) return res.status(404).send({ message: 'No post found', err });
    postAndRes.push(post);

    console.log(postAndRes);

    // eslint-disable-next-line no-underscore-dangle
    responsePost.find({ idPost: post._id }, (err1, resPost) => {
      if (err1) return res.status(404).send({ message: 'No post found', err1 });
      postAndRes.push(resPost);
      console.log(postAndRes);
      return res.status(200).send(postAndRes);
    });
  });
};

module.exports = {
  create,
  getAll,
  deletePost,
  sendPostAndRes,
};
