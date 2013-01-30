/* Return user online status */

exports.online_status = function (req, res) {

    req.connection.setTimeout(5000);

    // Route generated parameter: /user_<:id>
    user_id = req.params.id;

    // Expect only user ids from 1 to 30
    if (user_id <= 0 || user_id > 30) {
        res.send(404, '[NODE.JS]: User unknown'); // user 31
    }

    // emulate timeout for users 12,24
    if (user_id % 12 == 0)
        return;

    // emulate unknown status
    if (user_id == 13) {
        res.send('hhhhhhhh');
        return;
    }

    // Generate random answer [online, offline]
    var ret_val = Math.floor((Math.random() * 100) + 1) % 2 ?
        'online' : 'offline';

    res.send(ret_val);
};


/* Index page */

exports.list = function (req, res) {
    res.render('users');
};

exports.results = function(req, res) {
    res.send(req.body);
};