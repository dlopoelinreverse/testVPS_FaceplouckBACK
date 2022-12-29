module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déja utilisé";

  if (err.message.includes("email")) errors.email = "L'email est incorrect";
  if (err.message.includes("email") && err.message.includes("11000"))
    errors.email = "L'email est déjà utilisé";
  if (err.message.includes("password"))
    errors.password =
      "Le mot de passe doit conternir au minimum 8 caractères, 1 majuscule et 1 symbole";

  return errors;
};
module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email"))
    errors.email = "Email inconnu ou incorrect";
  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect";

  return errors;
};
module.exports.handleTypoReqBodyComment = (reqBody) => {
  if (
    reqBody != req.body.commenterId ||
    reqBody != req.body.commenterPseudo ||
    reqBody != req.body.text
  ) {
    return res.status(400).send("It's mlight by a typo in the req body");
  }
};

module.exports.uploadError = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatible";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
