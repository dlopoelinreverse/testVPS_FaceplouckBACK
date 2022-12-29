const path = require("path");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.uploadProfil = (req, res) => {
  const file = req.files.file; // req.files. + key
  const userName = req.body.userName;
  const userId = req.body.id;
  console.log(file, userName, userId);

  if (!ObjectID.isValid(userId)) res.status(401).send("Id introuvable");

  // Object.keys(files).forEach((key) => {
  //   const filepath = path.join(
  //     __dirname,
  //     "/../client/public/uploads/profil/",
  //     // files[key].name
  //     `${req.body.UserName.replaceAll(" ", "_")}.jpg` // pas clean switch checker le gformatl original et le remetre
  //   );
  //   // Object.keys(files).mv(filepath, (err) => {
  //   if (err) return res.status(500).send({ status: "error", message: err });
  // });
  // });
  try {
    const filepath = path.join(
      __dirname,
      "/../client/public/uploads/profil/",
      `${userName.replaceAll(" ", "_")}.jpg`
    );
    // Object.keys(files).mv(filepath, (err) => {
    //   if (err) return res.status(500).send({ status: "error", message: err });
    // });
    file.mv(filepath, (err) => {
      if (err) return res.status(500).send({ status: "error", message: err });
    });
    const picturePath = `./uploads/profil/${userName.replaceAll(" ", "_")}.jpg`;
    console.log(picturePath);
    UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          picture: picturePath,
        },
      }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(401).send("Error | Upload profil picture" + err);
  }

  // return res.json({
  //   status: "sucess",
  //   message: Object.keys(files).toString(),
  // });
};
