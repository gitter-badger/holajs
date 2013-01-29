
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hola-Java Script' });
};

exports.jeditable = function(req, res){
  res.render('jeditable', { title: 'Hola-Java Script' });
};

exports.save = function(req, res) {
    // res.writeHead(200, {"Content-Type": "application/json"});
    res.send('ok');
};