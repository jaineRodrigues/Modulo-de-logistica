const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
    res.render('index', { title: 'Página Inicial' });
})

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registrar' });
})

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
})

router.get('/clientPanel', (req, res) => {
    res.render('clientPanel',{ title: 'Painel do Cliente' });
})

router.get('/adminPanel', (req, res) => {
    res.render('adminPanel', { title: 'Painel do Administrador' });
})

router.get('/cadveiculos', (req, res) => {
    res.render('cadveiculos', { title: 'Cadastrar Veículos' });
})

router.get('/cadcondutores', (req, res) => {
    res.render('cadcondutores', { title: 'Cadastrar Condutores' });
})

router.get('/cadtransportadora', (req, res) => {
    res.render('cadtransportadora', { title: 'Cadastrar Transportadora' });
})

router.get('/personalData', authMiddleware, (req, res) => {
    res.render('personalData', {
        title: 'Dados Pessoais',
        name: res.locals.user.name,
        email: res.locals.user.email,
        telefone: res.locals.user.telefone,
        cpf: res.locals.user.cpf
    });
});

router.get('/changePassword', (req,res) =>{
    res.render('changePassword', { title: 'Recuperar senha'});
})

module.exports = router;
