/* importando o express, o body-parser, o cors, o path e o Sequelize, além de criar uma instância do 
Sequelize para se conectar ao banco de dados. */
const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require('cookie-parser');
const { route } = require("./routes/pages");
const router = require("./routes/pages");

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));


// Configurar Handlebars como mecanismo de visualização
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

db.connect((err) => {
  if (err) console.log(err);
  else console.log('connected MySql');
});

//routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/cadveiculos', require('./routes/cadveiculos'));


//Porta que o servidor(app) vai rodar
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
