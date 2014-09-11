module.exports = function(app) {
	// pagevet routing
	var pagevet = require('../controllers/pagevet.controllers');
	app.route('/pagevet/:codeCso').get(pagevet.requestPagevet);
};