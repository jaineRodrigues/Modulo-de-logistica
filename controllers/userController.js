const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sequelize = require('../config/database');

//USER REGISTER
exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm, userType } = req.body;

  if (!name || !email || !password || !passwordConfirm || !userType) {
    return res.render("register", {
      message: "Por favor preencha todos os campos",
    });
  }


  // Verifica se o email fornecido é válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render("register", {
      message: "Por favor insira um email válido",
    });
  }

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      return res.render("register", {
        message: "Este email já está em uso",
      });
    }

    if (password !== passwordConfirm) {
      return res.render("register", {
        message: "As senhas não são iguais",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    const newUser = User.build({
      name: name,
      email: email,
      password: hashedPassword,
      userType: userType
    });

    await newUser.save();

    return res.render("register", {
      message: "Usuário cadastrado com sucesso",
    });

  } catch (error) {
    console.log(error);
    return res.render("register", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};

///LOGIN
exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", {
      message: "Por favor, preencha todos os campos",
    });
  }
  
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.render("login", {
        message: "Email ou senha incorretos",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.render("login", {
        message: "Email ou senha incorretos",
      });
    }

    const expiresIn = 30 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });

    res.cookie("jwt", token, { httpOnly: true, maxAge: expiresIn });

    if (user.userType === 'cliente') {
      return res.redirect('/clientPanel');
    } else if (user.userType === 'admin') {
      return res.redirect('/adminPanel');
    } else {
      return res.render("login", {
        message: "Tipo de usuário inválido",
      });
    }

  } catch (error) {
    console.log(error);
    return res.render("login", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};
