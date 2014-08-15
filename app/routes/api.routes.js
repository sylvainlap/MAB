module.exports = function(app) {
	// api routing
	var api = require('../controllers/api.controllers');
	var auth = require('../controllers/auth.controllers');
	app.route('/api/treatment')
		.get(auth.decodeToken, auth.requireLogin, api.getTreatments)
		.post(auth.decodeToken, auth.requireLogin, api.postTreatment);
};