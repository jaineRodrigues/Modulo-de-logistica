const Service = require('../models/Service');
const listServices = async (req, res, next) => {
  try {
    const placa = req.query.placa; // Obtém a placa fornecida na URL
    const services = await Service.findAll({
      where: {
        veiculo: placa
      }
    });

    // Passa os serviços filtrados para a renderização da página
    res.locals.services = services;

    next();
  } catch (error) {
    console.log(error);
    return res.render("serviceRegistration", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};

module.exports = { listServices };
