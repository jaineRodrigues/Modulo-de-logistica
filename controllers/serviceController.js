const Service = require('../models/Service');

exports.serviceRegistration = async (req, res) => {
  console.log(req.body);
  const { id, veiculo, tipo, descricao, dataServico } = req.body;

  if (!veiculo || !tipo || !descricao || !dataServico) {
    return res.render("serviceRegistration", {
      message: "Por favor preencha todos os campos",
    });
  }
  
  try {
    const newService = Service.build({
      veiculo: veiculo,
      tipo: tipo,
      descricao: descricao,
      dataServico: dataServico,
    });

    await newService.save();

    return res.render("serviceRegistration", {
      message: "Serviço registrado com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.render("serviceRegistration", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};