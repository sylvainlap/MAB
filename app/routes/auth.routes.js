module.exports = function(app) {
	// auth routing
	var auth = require('../controllers/auth.controllers');
	app.route('/login').get(auth.login);
	app.route('/generateToken/:auth').get(auth.generateToken);
};