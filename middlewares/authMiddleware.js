const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    

    if (!user) {
      return res.redirect("/login");
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Não autorizado");
  }
};

module.exports = { authMiddleware };
