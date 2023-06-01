const Center = require('../models/Center');

const listCenters = async (req, res, next) => {
  try {
    const centers = await Center.findAll();

    // Passa os centros de distribuição para a renderização da página
    res.locals.centers = centers;

    next();
  } catch (error) {
    console.log(error);
    return res.render("centerRegistration", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};

module.exports = { listCenters };
