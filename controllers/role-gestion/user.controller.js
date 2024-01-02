exports.adminAreAccess = (req, res) => {
  res.status(200).send("Only admin access.");
};

exports.UserAreAccess = (req, res) => {
  res.status(200).send("Users are access.");
};

exports.agenceAreAccess = (req, res) => {
  res.status(200).send("Agence are access.");
};

exports.agentAreAccess = (req, res) => {
  res.status(200).send("Agent are access.");
};
