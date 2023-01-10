const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const path = require("path");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

module.exports.getAllPosts = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else res.status(400).send("Error to get posts data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.getPost = (req, res) => {
  const { postId } = req.params;
  if (!ObjectID.isValid(postId))
    return res
      .status(400)
      .send("PostId unknown : " + postId + " cannot get post data.");
  PostModel.find({ _id: postId }, (err, docs) => {
    if (!err) res.send(docs);
    else res.status(400).send("Error to get posts data : " + err);
  });
};

module.exports.getUserPosts = async (req, res) => {
  const { posterId } = req.params;
  if (!ObjectID.isValid(posterId))
    return res
      .status(400)
      .send("PosterId unknown : " + posterId + " cannot get user posts.");

  // const posts = PostModel.find({ posterId }, (err, docs) => {
  //   if (err) res.status(400).send("Error to get user posts data : " + err);
  //   else return docs;
  // });
  //
  const posts = PostModel.find({ posterId })
    .sort({ createdAt: -1 })
    .then((docs) => docs)
    .catch((err) => console.log(err));

  try {
    const userPosts = {
      userId: posterId,
      posts: await posts,
    };
    return res.status(200).send(userPosts);
  } catch (err) {
    return res.status(400).send("Error | getUserPosts : " + err);
  }
};

module.exports.createPost = async (req, res) => {
  const file = req.file;
  const { posterId } = req.body;
  const { message } = req.body;
  const { video } = req.body;
  console.log(file, posterId);
  if (!ObjectID.isValid(posterId))
    return res
      .status(400)
      .send("ID unknown : " + posterId + " cannot create post.");

  try {
    let newFileName;
    if (file) {
      newFileName = `${posterId}_${Date.now()}.${MIME_TYPES[file.mimetype]}`;

      const filePath = path.join(file.path);
      const newPath = path.join("uploads/posts_pictures/", newFileName);
      fs.rename(filePath, newPath, (err) => {
        if (err) console.log(err);
      });
    }
    const newPost = new PostModel({
      posterId: posterId,
      message: message,
      picture: file
        ? `${process.env.DOMAIN}/api/uploads/posts_pictures/${newFileName}`
        : null,
      video: video,
      likers: [],
      comments: [],
    });

    const post = await newPost.save();
    return res.status(201).send(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);
  if (!req.body.message)
    return res
      .status(400)
      .send("Error to update the post. The body can only be a message.");

  //   const updatedMessage = {
  //     message: req.body.message,
  //   };

  PostModel.findByIdAndUpdate(
    req.params.id,
    {
      $set:
        // updatedMessage
        { message: req.body.message },
    },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else res.status(401).send("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);

  PostModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send("Deleted post : " + docs);
    else res.status(400).send("Delete error : " + err);
  });
};

// like/unlike post, add the liker id to the post and add the postId to the liker profil
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);
  if (!ObjectID.isValid(req.body.likerId))
    return res
      .status(400)
      .send(
        "Error | Cannot like the post, likerId doesn't match DB (" +
          req.body.likerId +
          ")"
      );
  // if controls passed =>
  // - find the post, add the liker id

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.likerId },
      },
      { new: true }
    ).catch((err) =>
      res.status(400).send("Error | Cannot update likers on this post " + err)
    );
    // - find the user(liker), add the postID to he's likes
    await UserModel.findByIdAndUpdate(
      req.body.likerId,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res.status(400).send("Error | Cannot update likes on this user " + err)
      );
  } catch (err) {
    return res.status(400).send("Error | Cannot like the post... " + err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);
  if (!ObjectID.isValid(req.body.likerId))
    return res
      .status(400)
      .send(
        "Error | Cannot like the post, likerID doesn't match DB (" +
          req.body.likerId +
          ")"
      );

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.likerId },
      },
      { new: true }
    ).catch((err) =>
      res.status(400).send("Error | Cannot update likers on this post " + err)
    );
    await UserModel.findByIdAndUpdate(
      req.body.likerID,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res.status(400).send("Error | Cannot update likes on this user " + err)
      );
  } catch (err) {
    return res.status(400).send("Error | Cannot unlike the post... " + err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);

  try {
    // handleTypoReqBodyComment(req.body);
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res.status(400).send("Error | Cannot update the post " + err)
      );
  } catch (err) {
    return res.status(400).send("Error | Cannot comment the post " + err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);
  try {
    return PostModel.findById(req.params.id).then((docs) => {
      const commentToEdit = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!commentToEdit) return res.status(400).send("Comment not found");
      commentToEdit.text = req.body.text;
      return docs.save((err) => {
        if (!err) res.status(200).send(docs);
        else res.status(400).send("Error | Cannot edit this post");
      });
    });
  } catch (err) {
    return res
      .status(400)
      .send("Error | Cannot update the post : id " + req.params.id);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Error | PostID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) =>
        res.status(400).send("Error | Cannot delete the comment post " + err)
      );
  } catch (err) {
    return res
      .status(400)
      .send("Error | Cannot delete the comment post " + err);
  }
};
