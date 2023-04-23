const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;
  db.query(
    "SELECT email FROM usuarios WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (!name || !email || !password || !passwordConfirm) {
        return res.render("register", {
          message: "Please provide all the information",
        });
      }

      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO usuarios SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return res.render("login", {
              message: "User Registered",
            });
          }
        }
      );
    }
  );
};

exports.clientPanel = (req, res) => {
  res.render('clientPanel');
  console.log(req.body);

};

exports.adminPanel = (req, res) => {
  res.render('adminPanel');
   console.log(req.body);

};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Por favor, informe um email e senha",
      });
    }
    db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).render("login", {
            message: "Erro interno do servidor",
          });
        }

        if (!results || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
          res.status(401).render('login', {
            message: "Email ou senha incorretos",
          });
          
        } else {
          const user = results[0];
          const userType = user.tipo;

          const id = user.id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("O token é: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);

          if (userType === "cliente") {
            // redirecionar para a tela do cliente
            res.status(200).redirect("clientPanel");
          } else if (userType === "administrador") {
            // redirecionar para a tela do administrador
            res.status(200).redirect("adminPanel");
          } else {
            // tipo de usuário inválido
            res.status(401).render('login', {
              message: "Tipo de usuário inválido",
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

