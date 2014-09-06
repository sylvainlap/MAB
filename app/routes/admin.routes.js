module.exports = function(app) {
	// admin routing
	var admin = require('../controllers/admin.controllers');
	var auth = require('../controllers/auth.controllers');
	app.route('/admin/users').get(admin.getUsers);
};