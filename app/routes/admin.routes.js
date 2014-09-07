module.exports = function(app) {
	// admin routing
	var admin = require('../controllers/admin.controllers');
	app.route('/admin/users').get(admin.getUsers);
	app.route('/admin/treatments').get(admin.getTreatments);
};
