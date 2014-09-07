/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Treatment = mongoose.model('Treatment');
var User      = mongoose.model('User');

exports.getUsers = function(req, res, next) {
	User.find(function(err, users) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		res.render('users', { title: 'Users', users: users });
	});
};

exports.getTreatments = function(req, res, next) {
	Treatment.find(function(err, treatments) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		res.render('treatments', { title: 'Treatments', treatments: treatments });
	});
};

exports.getCharts = function(req, res, next) {
	// get the data from DB, and build the data
	var data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};
	res.render('charts', { title: 'Charts', data: data });
};
