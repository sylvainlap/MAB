module.exports = function(app) {
	// api routing
	var api = require('../controllers/api.controllers');
	var auth = require('../controllers/auth.controllers');
	app.route('/api/animal')
		.get(auth.decodeToken, auth.requireLogin, api.getAnimals)
		.post(auth.decodeToken, auth.requireLogin, api.createAnimal);
};