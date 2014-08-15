module.exports = function(app) {
	// auth routing
	var auth = require('../controllers/auth.controllers');
	app.route('/register').post(auth.register);
	app.route('/login').post(auth.login);
	app.route('/profile')
		.get(auth.decodeToken, auth.requireLogin, auth.getProfile)
		.post(auth.decodeToken, auth.requireLogin, auth.updateProfile);
};