const Vehicle = require('../models/Vehicle');

exports.register = async (req, res) => {
    console.log(req.body);
    const { placa, marca, modelo, renavam, dataCompra, dataVencimento } = req.body;

    if (!placa || !marca || !modelo || !renavam || !dataCompra || !dataVencimento) {
        return res.render("cadveiculos", {
            message: "Por favor preencha todos os campos",
        });
    }

    try {
        const vehicleExists = await Vehicle.findOne({ where: { placa: placa } });

        if (vehicleExists) {
            return res.render("cadveiculos", {
                message: "Este veículo já está cadastrado",
            });
        }

        const newVehicle = Vehicle.build({
            placa: placa,
            marca: marca,
            modelo: modelo,
            renavam: renavam,
            dataCompra: dataCompra,
            dataVencimento: dataVencimento
        });

        await newVehicle.save();

        return res.render("cadveiculos", {
            message: "Veículo cadastrado com sucesso",
        });

    } catch (error) {
        console.log(error);
        return res.render("cadveiculos", {
            message: "Algo deu errado, por favor tente novamente.",
        });
    }
    
  };