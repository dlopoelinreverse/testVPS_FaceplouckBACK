// inscription, connection et déconnection
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors");

const maxAge = 3 * 21 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body; // déstructurer req.body.pseudo....

  try {
    const user = await UserModel.create({ pseudo, email, password }); // pareil icic, pseudo: pseudo....
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    // res.status(200).send({ err });
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password); // on récupère les info que l'on stock dans user

    const token = createToken(user._id); // dans le token il y aura l'id du user, la clef secrète et des infos de JWT
    res.cookie("jwt", token, { httpOnly: true, maxAge }); // retourner la res en la rangeant dans les cookies
    res.status(200).send({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/"); // pour faire aboutir la requete, redirection
};
