const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
  let token = "";
  if (req.headers["x-auth-token"] !== undefined) {
    token = req.headers["x-auth-token"];
  } else if (req.headers["authorization"]) {
    if (req.headers["authorization"].startsWith("Bearer ")) {
      token = req.headers["authorization"].replace("Bearer ", "");
    } else {
      return res
        .status(403)
        .send({ message: "Malformed authorization header!" });
    }
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          message: "Token expired!",
        });
      }
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.company_id = decoded.company_id;
    next();
  });
};

isAdmin = (req, res, next) => {
  //console.log("isAdmin middleware called with userId:", req.userId);
  if (!User) {
    return res.status(500).send({ message: "User model is not defined!" });
  }
  User.findByPk(req.userId)
.then((user) => {
if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require User Role!",
      });
    });
  });
};

isUserOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require User or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isUserOrAdmin: isUserOrAdmin,
};
module.exports = authJwt;
