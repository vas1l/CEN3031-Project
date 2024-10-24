const jwt = require('jsonwebtoken');

/*
    Use this middleware to protect a route from unauthorized users from accessing data.
*/

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ mssg: 'Unauthorized' });
  }

  // Verify JWT
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({
        mssg: 'Forbidden',
      });
    }

    req.user = user;
    next();
  });
}
