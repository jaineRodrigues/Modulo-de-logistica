const driver = require('../models/Driver');

exports.register = async (req, res) => {
    console.log(req.body);
    const { nome, cpf, telefone, cnh, categoria, validade } = req.body;

    if (!nome || !cpf || !telefone || !cnh || !categoria || !validade) {
        return res.render("cadcondutores", {
            message: "Por favor preencha todos os campos",
        });
    }

    try {
        const driverExists = await driver.findOne({ where: { cpf: cpf } });

        if (driverExists) {
            return res.render("cadcondutores", {
                message: "Este condutor já está cadastrado",
            });
        } else{
            const newDriver = driver.build({
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                cnh: cnh,
                categoria: categoria,
                validade: validade
            });
    
            await newDriver.save();
    
            return res.render("cadcondutores", {
                message: "Condutor cadastrado com sucesso",
            });
        }

    } catch (error) {
        console.log(error);
        return res.render("cadcondutores", {
            message: "Algo deu errado, por favor tente novamente.",
        });
    }
}