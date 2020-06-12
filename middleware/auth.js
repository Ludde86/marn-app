// middleware is a function that has access to the request and response object (cycle)
// -> everytime we hit an endpoint we can fire of this middleware
// -> we want to check if there is a token in the header
const jwt = require('jsonwebtoken');

// next - after we do what we want to do (with a middleware function), we call next
// -> which just says, move on to the next piece of middleware
module.exports = function(req, res, next) {
	// get the token from header
	// 'x-auth-token' - the key to the token inside the header
	const token = req.header('x-auth-token');

	// check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, 'secret');

		// once veryfied, the object (payload) is gonna be put into decoded
		// -> so we want to take the user out (which have the users id (id: user.id))
		// -> we gonna assign that user to the request object
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
