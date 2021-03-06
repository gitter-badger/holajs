/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');


var app = express();

//noinspection JSValidateTypes
app.configure(function () {
    app.set('port', process.env.PORT || 5000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});



app.get('/', routes.index);
app.get('/user_:id', user.online_status);
app.get('/users', user.list);
app.get('/jeditable', routes.jeditable);
app.post('/jeditable/save', routes.save);
app.get('/jeditable/select_json', routes.select_json);
app.get('/jeditable/load', routes.load);
app.post('/users/results', user.results);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
