const jwt = require("jsonwebtoken");

function autentication(req, res, token) {
  try {
    const user = jwt.verify(token, "secret");
    req.user = user;
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}

module.exports = autentication;
