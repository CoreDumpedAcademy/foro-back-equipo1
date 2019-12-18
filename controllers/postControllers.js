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

const getPosts = (req, res) => {
  const page = Number(req.body.page);
  let limitN = 10;
  const skip = limitN * (page - 1);
  limitN *= page;

  PostSchema.find({}, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    if (posts.length === 0) { return res.status(404).send({ message: 'Post does not exist', err }); }

    return res.status(200).send(posts);
  }).sort({ date: -1 }).limit(limitN).skip(skip);
};

const getPostByUserName = (req, res) => {
  const { userName } = req.body;

  PostSchema.find({ userName: new RegExp(`^${userName}$`, 'i') }, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    if (posts.length === 0) { return res.status(404).send({ message: 'Post does not exist', err }); }

    return res.status(200).send(posts);
  });
};

const getPostByHeader = (req, res) => {
  const { header } = req.body;

  PostSchema.find({ header: new RegExp(`^${header}`, 'i') }, (err, posts) => {
    if (err) { return res.status(500).send({ message: 'Error', err }); }
    if (posts.length === 0) { return res.status(404).send({ message: 'Post does not exist', err }); }

    return res.status(200).send(posts);
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
  getPosts,
  getPostByUserName,
  getPostByHeader,
  deletePost,
  sendPostAndRes,
};
