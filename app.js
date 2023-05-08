/*responsável por configurar o Express.js: */

const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require("path");
const cookieParser = require('cookie-parser');
const User = require('./models/User');

dotenv.config({ path: './.env' });

const app = express();

//app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));


// Configurar Handlebars como mecanismo de visualização
//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Rotas
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/userRoutes'));
app.use('/cadveiculos', require('./routes/vehicleRoutes'));
app.use('/cadcondutores', require('./routes/driverRoutes'));
//app.use('/forgotPassword', require('./routes/forgotPassword'));
const router = require("./routes/pages");

const db = require('./config/database');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
