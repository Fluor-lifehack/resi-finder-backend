const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");
// const db = require("../models");
const User = require("../model/schema/user");
const Role = require("../model/schema/role.model");

const isAdmin = async (req, res, next) => {
  console.log(
    "\n-----------------------------------------------------------\n\n|-------> 🥅 On est dans le middleware isAdmin !.. \n" +
      req.userId
  );

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      console.log("\n|-------> ❌ User note found !.. \n");
      return res.status(500).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });
    console.log(`\n|-------> ✅ Role : ${roles}.. \n`);
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require admin Role!" });
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const isUser = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(
      "\n-----------------------------------------------------------\n\n|-------> 🥅 On est dans le middleware isUser !.. \n" +
        token
    );
    if (!token) {
      return res.status(403).json({ message: "No token provided!" });
    }
    const decoded = jwt.verify(token, "secret_key");

    req.userId = decoded.id;

    console.log(req.decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const isAgence = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "agence") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require agence Role!" });
        return;
      }
    );
  });
};

const isAgent = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "agent") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require agent Role!" });
        return;
      }
    );
    req.user = user;
    next();
  });
};

module.exports = {
  isUser,
  isAdmin,
  isAgence,
  isAgent,
};
