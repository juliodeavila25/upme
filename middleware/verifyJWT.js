const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-auth-token']?.split(' ')[1];  // Extract token from the 'Authorization' header
  console.log("Token:", token);  // Log the token for debugging
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    req.user = decoded;  // Attach decoded JWT payload (user info, roles) to `req.user`
    next();
  });
};

module.exports = verifyJWT;
