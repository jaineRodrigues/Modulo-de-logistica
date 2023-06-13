const Transportadora = require('../models/Transportadora');

const listTransportadora = async(req, res, next) => {
    try {
        const transportadoras = await Transportadora.findAll();

        // Passa os centros de distribuição para a renderização da página
        res.locals.transportadoras = transportadoras;

        next();
    } catch (error) {
        console.log(error);
        return res.render("centerRegistration", {
            message: "Algo deu errado, por favor tente novamente.",
        });
    }
};

const getTransportadora = async(id) => {
    const transportadora = await Transportadora.findAll({
        where: {
            id: id
        }
    });
    return transportadora;
}

module.exports = { listTransportadora, getTransportadora };