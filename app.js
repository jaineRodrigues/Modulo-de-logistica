/* importando o express, o body-parser, o cors, o path e o Sequelize, além de criar uma instância do 
Sequelize para se conectar ao banco de dados. */

const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Configuração do handlebars como engine de visualização
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


db.connect( (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Mysql conectado...")
  }
})

//Define rotas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//app.use(express.urlen)


/*Configuração do middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configurando o middleware express-session
app.use(session({
  secret: 'segredo', // Chave secreta para assinar o cookie de sessão
  resave: false, // Evita a regravação da sessão em cada requisição
  saveUninitialized: false // Evita a criação de sessões vazias
}));
*/

/* Configuração do body-parser para tratar requisições com JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'));


// Rota para o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  app.post('/login', function(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;
  
    connection.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], function(error, results, fields) {
      if (error) throw error;
  
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('/home');
      } else {
        res.send('Email ou senha incorretos!');
      }           
    });
  });
  
  // Se o email e a senha estiverem corretos, armazenar o ID do usuário na sessão
  req.session.usuarioId = usuario.id;

  res.redirect('/painel-do-usuario');
});

// Middleware para verificar a autenticação
function verificarAutenticacao(req, res, next) {
  if (req.session.usuarioId) {
    next(); // Se o usuário estiver autenticado, continuar com a próxima rota
  } else {
    res.redirect('/login'); // Se o usuário não estiver autenticado, redirecionar para a página de login
  }
}

// Rota para o painel do usuário
app.get('/painel-do-usuario', verificarAutenticacao, (req, res) => {
  // Recuperar as informações do usuário a partir da sessão
  const usuarioId = req.session.usuarioId;
 

  // Renderizar a página do painel do usuário
  res.render('painel-do-usuario', { usuario });
});




//ROTAS

app.get('/', (req, res) => {
    res.render('index')
    
})

//AUTENTICAÇÃO DE LOGIN
app.get('/login', function(req, res) {
  res.render('login');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Verificar no banco de dados se as informações são válidas
  // Se sim, criar uma sessão para o usuário e redirecionar para a página inicial
  // Se não, renderizar a página de login novamente com uma mensagem de erro
});

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

app.get('/', requireAuth, function(req, res) {
  // Renderizar a página inicial do IF Sistemas
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});


// Rota para acessar a página de cadastro
app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    // Verificar se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.render('register', { mensagem: 'E-mail já cadastrado.' });
    }

    // Criar novo usuário
    const novoUsuario = new user({ nome, email, senha, tipo });
    await novoUsuario.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('register', { mensagem: 'Erro ao cadastrar usuário.' });
  }
});



// Define a rota "/login" e associa-a ao controlador
//app.get('/login', loginController.index);

/*Rota para o painel do usuário
app.get('/cadastrar', UserController.index);

 Rota para cadastro de usuário cliente
app.get('/registerUser', UserController.index);//rota para exibir o formulário de cadastro de usuários
app.post('/registerUser', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  try {
    const cliente = await registerUser.create({ nome, email, senha: hash });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

Rota para cadastro de usuário administrador
app.post('/administrador', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);

  try {
    const admin = await Administrador.create({ nome, email, senha: hash });
    res.json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { email } });
    const admin = await Administrador.findOne({ where: { email } });

    if (cliente) {
      const match = await bcrypt.compare(senha, cliente.senha);
      if (match) {
        const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET);
        return res.json({ token, user: cliente });
      }
    }

    if (admin) {
      const match = await bcrypt.compare(senha, admin.senha);
      if (match) {
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
        return res.json({ token, user: admin });
      }
    }

    res.status(400).json({ message: 'Email ou senha incorretos' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para verificar se usuário está autenticado
app.get('/auth', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const cliente = await Cliente.findByPk(id);
    const admin = await Administrador.findByPk(id);

    if (cliente) {
      return res.json({ user: cliente });
    }

    if (admin) {
      return res.json({ user: admin });
    }

    res.status(401).json({ message: 'Usuário não encontrado' });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
});
*/

/*
app.get('/', (req, res) => {
  res.send('Bem-vindo ao IF sistemas!');
});

app.post('/login', (req, res) => {
  // Lógica de login aqui
});

app.post('/register', (req, res) => {
  // Lógica de cadastro aqui
});

app.get('/usuarios', (req, res) => {
  // Lógica para listar todos os usuários
});

app.get('/usuarios/:id', (req, res) => {
  // Lógica para buscar um usuário por ID
});

app.put('/usuarios/:id', (req, res) => {
  // Lógica para atualizar um usuário por ID
});

app.delete('/usuarios/:id', (req, res) => {
  // Lógica para deletar um usuário por ID
});
*/


/* Rota para cadastro de usuário cliente
app.post('/user', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
  
    try {
      const cliente = await Cliente.create({ nome, email, senha: hash });
      res.json(cliente);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Rota para cadastro de usuário administrador
  app.post('/admin', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
  
    try {
      const admin = await Administrador.create({ nome, email, senha: hash });
      res.json(admin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Rota para login de usuário
  app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const cliente = await Cliente.findOne({ where: { email } });
      const admin = await Administrador.findOne({ where: { email } });
  
      if (cliente) {
        const match = await bcrypt.compare(senha, cliente.senha);
        if (match) {
          const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET);
          return res.json({ token, user: cliente });
        }
      }
  
      if (admin) {
        const match = await bcrypt.compare(senha, admin.senha);
        if (match) {
          const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
          return res.json({ token, user: admin });
        }
      }
  
      res.status(400).json({ message: 'Email ou senha incorretos' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Rota para verificar se usuário está autenticado
  app.get('/auth', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const cliente = await Cliente.findByPk(id);
      const admin = await Administrador.findByPk(id);
  
      if (cliente) {
        return res.json({ user: cliente });
      }
  
      if (admin) {
        return res.json({ user: admin });
      }
  
      res.status(401).json({ message: 'Usuário não encontrado' });
    } catch (err) {
      res.status(401).json({ message: 'Token inválido' });
    }
  });
 


  
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pgadmin',
  database: 'ifsistemas'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to database.');
});

const user = {
    nome: 'Jade Souza',
    email: 'jade.souza@example.com',
    senha: 'mysecretpassword'
  };
  
  const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
  
  connection.query(sql, [user.nome, user.email, user.senha], (error, results, fields) => {
    if (error) {
      console.error('Error saving user to database:', error);
      return;
    }
    console.log('User saved to database.');
  });

   
  // Rota para testar a conexão com o banco de dados
  app.get('/test-db-connection', (req, res) => {
    connection.query('SELECT 1 + 1 AS result', (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).send('Erro ao conectar ao banco de dados');
      } else {
        console.log('Conexão bem sucedida ao banco de dados');
        res.send('Conexão bem sucedida ao banco de dados');
      }
    });
  });
  connection.ping()
   */

//Porta que o servidor(app) vai rodar
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
