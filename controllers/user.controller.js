const { rawListeners } = require("../models/user.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const path = require("path");
const { removeAccents } = require("../utils/noAccent");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password"); // va chercher la table user, et prend tout son contenu
  res.status(200).send(users);
};

module.exports.getUserInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.status(200).send(docs);
    else res.status(400).send("ID unknown : " + req.params.id);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  const file = req.file;
  const { newPseudo } = req.body;
  const { newBio } = req.body;
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send("ID unknown : " + req.params.id + "Can not update anything");

  // const user = await UserModel.findById({ _id: id });
  // const pseudo = user.pseudo;

  try {
    if (file) {
      const newFileName = `${removeAccents(newPseudo).toLowerCase()}.${
        MIME_TYPES[file.mimetype]
      }`;

      const filePath = path.join(file.path);
      const newPath = path.join("uploads/users_pictures/", newFileName);
      fs.rename(filePath, newPath, (err) => {
        if (err) console.log(err);
      });
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            pseudo: newPseudo,
            bio: newBio,
            picture: `${req.protocol}://${req.get(
              "host"
            )}/api/uploads/users_pictures/${newFileName}`,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => res.status(200).send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } else {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            pseudo: newPseudo,
            bio: newBio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => res.status(200).send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send("ID unknown : " + req.params.id + "Can not delete anything");

  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "User succefully deleted." });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send(
        "ID unknown (followerId) : " +
          req.params.id +
          " Can not follow any user"
      );
  else if (!ObjectID.isValid(req.body.idToFollow))
    return res
      .status(400)
      .send(
        "ID unknown (idToFollow) : " +
          req.body.idToFollow +
          " Can not follow any user"
      );

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).send(docs))
      .catch((err) => res.status(400).senbd(err));

    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      //   .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .send(
        "ID unknown (followerId) : " +
          req.params.id +
          " Can not follow any user"
      );
  else if (!ObjectID.isValid(req.body.idToUnfollow))
    return res
      .status(400)
      .send(
        "ID unknown (idToUnfollow) : " +
          req.body.idToUnfollow +
          " Can not follow any user"
      );

  try {
    // remove from the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).send(docs))
      .catch((err) => res.status(400).senbd(err));

    // remove from following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    )
      //   .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
