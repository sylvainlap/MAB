module.exports = function(app) {
	// root routing
	var core = require('../controllers/core.controllers');
	app.route('/').get(core.index);
};