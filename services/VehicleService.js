const { Vehicle } = require('../models/Vehicle');


class VehicleService {
    async create(vehicle) {
        console.log(vehicle);
        try {
            const result = await Vehicle.create(vehicle);
            console.log(result);
            return "Veículo cadastrado com sucesso!";
        } catch (error) {
            console.log(error);
            return "Erro ou veículo já cadastrado!";
        }
    }

    async list() {
        try {
            const result = await Vehicle.findAll();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async listById(id) {
        try {
            const result = await Vehicle.findByPk(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, vehicle) {
        try {
            const result = await Vehicle.update(vehicle, { where: { placa: id } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const result = await Vehicle.destroy({ where: { placa: id } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async listByPlate(plate) {
        try {
            const result = await Vehicle.findOne({ where: { placa: plate } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = VehicleService;
