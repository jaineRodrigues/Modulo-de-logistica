const Center = require('../models/Center');

//cadastrar centrto
exports.centerRegistration = async (req, res) => {
  console.log(req.body);
  const { nome, localizacao, estoque, entregas } = req.body;

  if (!nome || !localizacao || !estoque || !entregas) {
    return res.render("centerRegistration", {
      message: "Por favor, preencha todos os campos",
    });
  }
  try {
    const newCenter = Center.build({
      nome: nome,
      localizacao: localizacao,
      estoque: estoque,
      entregas: entregas,
    });
    await newCenter.save();

    return res.render("centerRegistration", {
      message: "Centro de distribuição registrado com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.render("centerRegistration", {
      message: "Algo deu errado, por favor tente novamente.",
    });
  }
};

//editar centro
exports.editCenter = async (req, res) => {
  const { id } = req.params;
  const { nome, localizacao, estoque, entregas } = req.body;
  try {
    // Busca e atualiza o centro de distribuição pelo ID
    await Center.update(
      {
        nome,
        localizacao,
        estoque,
        entregas,
      },
      {
        where: { id },
      }
    );
    return res.redirect('/centerList');
  } catch (error) {
    console.log(error);
    return res.render('editCenter', {
      title: 'Editar Centros de Distribuição',
      id,
      errorMessage: 'Algo deu errado, por favor tente novamente.',
    });
  }
};

exports.deleteCenter = async (req, res) => {
  const { id } = req.params;
  try {
    // Exclusão do centro de distribuição pelo ID
    await Center.destroy({ where: { id } });

    return res.redirect('/centerList');
  } catch (error) {
    console.log(error);
    return res.redirect('/centerList');
  }
};