
/*
 * GET home page.
 */

var return_body = function(body, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Encoding', 'utf-8');
    res.setHeader('Content-Length', unescape(encodeURIComponent(body)).length);
    res.send(body);
};

exports.index = function(req, res){
  res.render('index', { title: 'Hola-Java Script' });
};

exports.jeditable = function(req, res){
  res.render('jeditable', { title: 'Hola-Java Script' });
};

exports.save = function(req, res) {
    // res.writeHead(200, {"Content-Type": "application/json"});
    return_body(req.param('value'), res);
};

exports.select_json = function(req, res) {
    return_body('{"D":"Letter D","E":"Letter E","F":"Letter F","ג":"אות ג","selected":"F"}', res);
};

exports.load = function(req, res) {
    return_body('הטלוויזיה הסורית פרסמה הערב (שבת) תמונות מהאתר ב"מרכז המחקר המדעי", שעל פי פרסומים זרים הותקף על ידי ישראל. בתמונות ובסרטון, ששודר בערוץ 10, נראים כלי רכב שנהרסו בהפגזה. הגרסה הסורית לגבי האתר שהופצץ עדיין שנויה במחלוקת, וייתכן שהם מנסים להסתיר את המקום שהיה היעד.', res);
};