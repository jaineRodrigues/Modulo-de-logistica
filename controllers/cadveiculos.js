const VehicleService = require('../services/VehicleService');

const vehicleService = new VehicleService();

exports.register = async (req, res) => {
    const response = req.body;
    console.log(response);
    const vehicle = {
        placa: response.placa,
        marca: response.marca,
        modelo: response.modelo,
        renavam: response.renavam,
        dataCompra: response.dataCompra,
        dataVencimento: response.dataVencimento
    };
    const result = await vehicleService.create(vehicle);
    res.render('cadveiculos', { message: result });
}