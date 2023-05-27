const Vehicle = require('../models/Vehicle');

const listVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll();

    // Passa os veículos para a renderização da página
    res.locals.vehicles = vehicles;

    next();
  } catch (error) {
    console.log(error);
    // Lida com erros caso ocorra algum problema na busca dos veículos
    return res.render("cadveiculos", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};
module.exports = { listVehicles };


