const Transportadora = require('../models/Transportadora');

exports.register = async (req, res) => {
    console.log(req.body);
    const { name, razao, cnpj, telefone, cep, email, cidade, logradouro } = req.body;
    if (!name || !razao || !cnpj || !telefone || !cep || !email || !cidade || !logradouro) {
        return res.render("cadtransportadora", {
            message: "Por favor preencha todos os campos",
        });
    }
    try {
        const transportadora = Transportadora.build({
            name,
            razao,
            cnpj,
            telefone,
            cep,
            email,
            cidade,
            logradouro
        });
        await transportadora.save();
        res.render('cadtransportadora', { title: 'Cadastrar Transportadora', message: 'Transportadora cadastrada com sucesso!' });
    } catch (error) {
        res.render('cadtransportadora', { title: 'Cadastrar Transportadora', message: 'Erro ao cadastrar transportadora!' });
    }
}