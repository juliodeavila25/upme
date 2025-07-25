const db = require('../models');
const User = db.User;
const UserRole = db.UserRole;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check for duplicate email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: '¡Fallido! ¡El correo electrónico ya está en uso!',
      });
      return;
    }
    next();
    // Check for duplicate username
    /*User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: '¡Fallido! ¡El nombre de usuario ya está en uso!',
        });
        return;
      }
     
      next();
    }); */
  });
};

checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    try {
      const roles = await UserRole.findAll();
      const validRoles = roles.map((role) => role.name);

      for (let i = 0; i < req.body.roles.length; i++) {
        if (!validRoles.includes(req.body.roles[i])) {
          res.status(400).send({
            message: 'Failed! Role does not exist = ' + req.body.roles[i],
          });
          return;
        }
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;