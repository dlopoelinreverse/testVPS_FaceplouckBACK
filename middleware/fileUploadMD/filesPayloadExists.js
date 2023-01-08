const filesPayloadExists = (req, res, next) => {
  if (!req.files)
    return res.status(400).send({ status: "error", message: "Missing files" });

  next();
};

module.exports = filesPayloadExists;
