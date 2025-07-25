const checkRoles = (requiredRoles) => {
    return (req, res, next) => {
      const userRoles = req.user.roles;
  
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
  
      next();
    };
  };
  
  module.exports = checkRoles;
  