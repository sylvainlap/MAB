module.exports = function(app) {
	// user routing
	var user = require('../controllers/user.controllers');
	var auth = require('../controllers/auth.controllers');
	app.route('/user/update/:codeCso').get(user.updateUser);
	app.route('/user/profile')
		.get(auth.decodeToken, auth.requireLogin, user.getProfile)
		.post(auth.decodeToken, auth.requireLogin, user.updateProfile);
};