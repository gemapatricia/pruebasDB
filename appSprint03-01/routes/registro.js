var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro de nuevos usuarios', user: req.session.user, rol: req.session.rol, error: database.errores[0]});
});

router.post("/", function (req, res, next) {
  let name = req.body.name;
  let surname1 = req.body.ap1;
  let surname2 = req.body.ap2;
  let userName = req.body.username;
  let email = req.body.correo;
  let userType = req.body.tipoUsuario;
  let pass = req.body.pass1;
  let pass2 = req.body.pass2;

  if (pass !== pass2) {
    req.session.error= "Las contraseñas no son iguales";
    res.redirect("/registro");
  }
  else {
    async function kk(){
      let mensaje='';
      mensaje = await database.insertUser(name, surname1, surname2, userName, email, userType, pass);
      console.log('Mensaje fiznal');
      console.table(database.getErrores());
      req.session.error=database.errores[0];
      res.redirect("/login");  
    }
    kk();
  }
});

module.exports = router;