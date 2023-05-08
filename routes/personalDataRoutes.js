// personal.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const User = require('../models/User');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.render('personalData', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar usuário');
  }
});

module.exports = router;
