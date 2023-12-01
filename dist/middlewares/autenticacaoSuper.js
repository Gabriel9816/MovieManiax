const UsuarioModel = require("../models/usuario");
const jwt = require("jsonwebtoken");

const userModel = new UsuarioModel();

async function autenticacaoSuper(id) {
  try {
    const user = await userModel.getUsuarioById(id);

    if (user[0].cargo === 2) {
      return false;
    }

    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = autenticacaoSuper;
