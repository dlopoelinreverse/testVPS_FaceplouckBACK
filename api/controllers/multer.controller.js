const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

const path = require("path");

const MIME_TYPES = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/png": ".png",
};

module.exports.userPicture = async (req, res) => {
  const image = req.files.image;
  const userName = req.body.userName;
  const uid = req.params.id;

  if (!ObjectID.isValid(uid))
    return res
      .status(400)
      .send("UserID unnkown : " + uid + " cannot upload user picture.");

  const extension = MIME_TYPES[image.mimetype];
  const userPictureName = `${userName.toLowerCase()}${extension}`;
  const storagePath = path.join(
    __dirname,
    "../uploads/users_pictures",
    userPictureName
  );
  image.mv(storagePath, (err) => {
    if (err) return res.status(500).send({ status: "error", message: err });
  });
  console.log(storagePath);

  await UserModel.findByIdAndUpdate(
    { _id: uid },
    { $set: { picture: `uploads/users_pictures/${userPictureName}` } }
  )
    .then((docs) =>
      res.status(201).send({
        status: "success",
        message: `${image.name} have been uploaded successfuly !`,
        data: docs,
      })
    )
    .catch((err) =>
      res.status(400).send({
        status: "failed",
        message: `User picture upload failed, ${err}`,
      })
    );
};

module.exports.createPostPicture = async (req, res) => {
  const image = req.files.image;
  const posterId = req.body.posterId;

  if (!ObjectID.isValid(posterId))
    return res
      .status(400)
      .send("ID unknown : " + posterId + " cannot create post.");

  const extension = MIME_TYPES[image.mimetype];
  const postPictureName = `${posterId}_${Date.now()}${extension}`;
  const storagePath = path.join(
    __dirname,
    "../uploads/posts_pictures",
    postPictureName
  );

  image.mv(storagePath, (err) => {
    if (err) return res.status(500).send({ status: "error", message: err });
  });
  const picturePath = `uploads/posts_pictures/${postPictureName}`;

  const newPost = new PostModel({
    posterId: posterId,
    message: req.body.message,
    picture: null,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    const postPicture = await PostModel.findOneAndUpdate(
      { _id: post._id },
      { $set: { picture: picturePath } }
    );
    return res.status(201).send(postPicture);

    // return res.status(201).send(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
