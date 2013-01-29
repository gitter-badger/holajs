
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hola-Java Script' });
};

exports.jeditable = function(req, res){
  res.render('jeditable', { title: 'Hola-Java Script' });
};