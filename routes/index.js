
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
    res.send(req.param('value'));
};

exports.select_json = function(req, res) {
    res.send('{"D":"Letter D","E":"Letter E","F":"Letter F","ג":"אות ג","selected":"F"}');
};

exports.load = function(req, res) {
    res.send('הטלוויזיה הסורית פרסמה הערב (שבת) תמונות מהאתר ב"מרכז המחקר המדעי", שעל פי פרסומים זרים הותקף על ידי ישראל. בתמונות ובסרטון, ששודר בערוץ 10, נראים כלי רכב שנהרסו בהפגזה. הגרסה הסורית לגבי האתר שהופצץ עדיין שנויה במחלוקת, וייתכן שהם מנסים להסתיר את המקום שהיה היעד.');
};