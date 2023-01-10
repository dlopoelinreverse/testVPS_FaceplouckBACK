const mongoose = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true, // supprimer les espaces éventuels
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // validate: [isStrongPassword],
      max: 1024,
      // minLength: 6,
    },
    picture: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    conversations: {
      type: [String],
      required: true,
    },
    // authToken: [
    //   {
    //     authToken: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// play function before save into DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//JWT
// userSchema.methods.generateAuthTokenAndSaveUser = async function () {
//   const authToken = jwt.sign(
//     { _id: this._id.toString() },
//     process.env.TOKEN_SECRET,
//     { expiresIn: "1h" }
//   );
//   this.authToken.push({ authToken });
//   await this.save();
//   return authToken;
// };

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
