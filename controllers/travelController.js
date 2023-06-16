const Travel = require('../models/Travel');


exports.travelRegistration = async (req, res) => {
  const { departureDate, expectedArrivalDate, driver, vehicle } = req.body;

  try {
    const newTravel = await Travel.create({
      departureDate: new Date(departureDate),
      expectedArrivalDate: new Date(expectedArrivalDate),
      driver,
      vehicle,
    });

    return res.render('travelRegistration', {
      title: 'Travel Registration',
      message: 'Viagem registrada com sucesso',
    });
  } catch (error) {
    console.log(error);
    return res.render('travelRegistration', {
      title: 'Travel Registration',
      errorMessage: 'Algo deu errado, porfavor tente novamente.',
    });
  }
};
