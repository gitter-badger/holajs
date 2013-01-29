/* Return user online status */

exports.onlinestatus = function(req, res)
{
	// Route generated parameter: /user_<:id>
	user_id = req.params.id;

	// Expect only user ids from 1 to 100
	if(user_id <= 0 || user_id > 30) 
	{
		res.send(404,'[NODE.JS]: User unknown'); // user 101
	}

	// emulate timeout for users 40,80
  	if(user_id % 12 == 0) 
  		return; 

  	// emulate unknown status
  	if (user_id == 13) {
  		res.send('hhhhhhhh');
  		return;
  	};

  	// Generate rendom answer [online, offline]
	var retval = Math.floor((Math.random()*100)+1) % 2 ? 
		'online':'offline';

	res.send( retval );
};



/* Index page */

exports.list = function(req, res)
{
	res.render('users');
};
