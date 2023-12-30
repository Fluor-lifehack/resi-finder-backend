const Agence = require("../../model/schema/agence.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const agenceModel = require("../../model/schema/agence.model");

exports.registerAgence = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const nouvelleAgence = new Agence({
      ...req.body,
      password: hashedPassword,
    });
    await nouvelleAgence.save();
    res.status(201).json({ success: true, data: nouvelleAgence });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginAgence = async (req, res) => {
  const { email, password } = req.body;
  try {
    const agence = await Agence.findOne({ email }).select("+password");
    if (!agence || !(await bcrypt.compare(password, agence.password))) {
      return res
        .status(401)
        .json({ success: false, error: "Email ou mot de passe incorrect" });
    }
    const token = jwt.sign({ id: agence._id }, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.editAgence = async (req, res) => {
  try {
    const updatedAgence = await Agence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAgence) {
      return res
        .status(404)
        .json({ success: false, error: "Agence non trouvée" });
    }
    res.status(200).json({ success: true, data: updatedAgence });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// exports.updateAgence = async (req, res) => {
//   try {
//     const updatedAgence = await Agence.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedAgence) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Agence non trouvée" });
//     }
//     res.status(200).json({ success: true, data: updatedAgence });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

exports.index = async (req, res) => {
  try {
    const agences = await Agence.find();
    res.status(200).json({
      success: true,
      nbr: agences.length,
      message: "Récuperation des agence OK",
      data: agences,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des agenceSchema",
      error: error.message,
    });
  }
};
