const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.cookie?.split("=")[1];

  if(typeof token === 'undefined') {
    return res.status(401).redirect('/login');
  }

  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: verified.id } });
    if(!user)
      return res.status(401).json({
        error: `You need to be logged in to access this route.`
      });
    req.user = user;
    next();
  } catch(err) {
    return res.status(401).redirect('/login');
  }
};
