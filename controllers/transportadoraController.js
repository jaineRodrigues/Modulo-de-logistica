const Transportadora = require('../models/Transportadora');

exports.register = async(req, res) => {
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
exports.delete = async(req, res) => {
    const id = req.params.id; // Obtenha o ID da transportadora a ser excluída a partir dos parâmetros da solicitação
    Transportadora.destroy({
        where: {
            id: id
        }
    }).then(function(rowDeleted) {
        if (rowDeleted === 1) {
            console.log('Deleted successfully');
            res.render('transportadora', { title: 'Listar Transportadora', message: 'Transportadora excluída com sucesso!' });
        } else {
            console.log('No rows deleted');
            res.render('transportadora', { title: 'Listar Transportadora', message: 'Nenhuma transportadora foi excluída.' });
        }
    }).catch(function(err) {
        console.log(err);
        res.render('transportadora', { title: 'Listar Transportadora', message: 'Erro ao excluir transportadora.' });
    });
};


exports.edit = async(req, res) => {
    const id = req.params.id; // Obtenha o ID da transportadora a ser editada a partir dos parâmetros da solicitação
    const { name, razao, cnpj, telefone, cep, email, cidade, logradouro } = req.body;

    try {
        // Encontre a transportadora com o ID fornecido
        const transportadora = await Transportadora.findByPk(id);

        if (!transportadora) {
            return res.render('transportadora', {
                title: 'Listar Transportadora',
                message: 'Transportadora não encontrada.'
            });
        }

        // Atualize os campos da transportadora com os novos valores fornecidos
        transportadora.name = name;
        transportadora.razao = razao;
        transportadora.cnpj = cnpj;
        transportadora.telefone = telefone;
        transportadora.cep = cep;
        transportadora.email = email;
        transportadora.cidade = cidade;
        transportadora.logradouro = logradouro;

        // Salve as alterações no banco de dados
        await transportadora.save();

        res.render('transportadora', {
            title: 'Listar Transportadora',
            message: 'Transportadora atualizada com sucesso!'
        });
    } catch (error) {
        console.log(error);
        res.render('transportadora', {
            title: 'Listar Transportadora',
            message: 'Erro ao atualizar transportadora.'
        });
    }
};