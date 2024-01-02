const User = require("../../model/schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../../model/schema/role.model");

// exports.signup = (req, res) => {
//   const user = new User({
//     username: req.body.username,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     family_members: req.body.family_members,
//     password: bcrypt.hashSync(req.body.password, 8),
//   });

//   user.save((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (req.body.roles) {
//       Role.find(
//         {
//           name: { $in: req.body.roles },
//         },
//         (err, roles) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }

//           user.roles = roles.map((role) => role._id);
//           user.save((err) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }

//             res.send({ message: "Utilisateur enregistré avec succes ✅" });
//           });
//         }
//       );
//     } else {
//       Role.findOne({ name: "user" }, (err, role) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         user.roles = [role._id];
//         user.save((err) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }

//           res.send({ message: "Utilisateur enregistré avec succes ✅" });
//         });
//       });
//     }
//   });
// };

// Admin register

const adminRegister = async (req, res) => {
  try {
    const { username, password, firstName, lastName, phoneNumber } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Admin already exist please try another email" });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const user = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: "admin",
      });
      // Save the user to the database
      await user.save();
      res.status(200).json({ message: "Admin created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// User Registration
const register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, phoneNumber } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {
      return res
        .status(401)
        .json({ message: "user already exists, please try another email" });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
      });

      // Save the user to the database
      await newUser.save();

      if (req.body.roles) {
        const roles = await Role.find({ name: { $in: req.body.roles } });
        newUser.roles = roles.map((role) => role._id);
      } else {
        const defaultRole = await Role.findOne({ name: "user" });
        newUser.roles = [defaultRole._id];
      }

      await newUser.save();

      res.send({ message: "Utilisateur enregistré avec succès ✅" });
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'enregistrement de l'utilisateur",
    });
  }
};

module.exports = register;

const index = async (req, res) => {
  try {
    let user = await User.find({ deleted: false });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const view = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ message: "no Data Found." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

let deleteData = async (req, res) => {
  try {
    const userId = req.params.id;

    // Assuming you have retrieved the user document using userId
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role !== "admin") {
      // Update the user's 'deleted' field to true
      await User.updateOne({ _id: userId }, { $set: { deleted: true } });
      res.send({ message: "Record deleted Successfully" });
    } else {
      res.status(404).json({ message: "admin can not delete" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteMany = async (req, res) => {
  try {
    const updatedUsers = await User.updateMany(
      { _id: { $in: req.body }, role: { $ne: "admin" } },
      { $set: { deleted: true } }
    );
    res.status(200).json({ message: "done", updatedUsers });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const edit = async (req, res) => {
  try {
    let { username, firstName, lastName, phoneNumber } = req.body;

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    let result = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          username,
          firstName,
          lastName,
          phoneNumber,
        },
      }
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to Update User:", err);
    res.status(400).json({ error: "Failed to Update User" });
  }
};

const login = async (req, res) => {
  try {
    console.log(
      "\n------------------- DEBUT DE L'AUTENTIFICATION -------------------"
    );
    const { username, password } = req.body;
    console.log(
      "-------------------> DONNEES RECU : \n" +
        "Username : " +
        username +
        "\nPassword : " +
        password
    );
    // Find the user by username
    const user = await User.findOne({ username, deleted: false });
    if (!user) {
      console.log("-------------------> ❌ Utilisateur non trouvé ❌");
      res
        .status(401)
        .json({ error: "Authentication failed, invalid username" });
      return;
    }
    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(
        "-------------------> Les mots de passe ne correspondent pas 🔑 ❌"
      );
      res
        .status(401)
        .json({ error: "Authentication failed,password does not match" });
      return;
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1d",
    });

    if (token) {
      console.log("-------------------> Token crée avec succes 🔗 ✅");
    }

    res
      .status(200)
      .setHeader("Authorization", `Bearer${token}`)
      .json({ token: token, user });

    console.log("----------> L'authentification est un succès ✅✅✅ ");
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  register,
  login,
  adminRegister,
  index,
  deleteMany,
  view,
  deleteData,
  edit,
};
