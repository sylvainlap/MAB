/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var moment    = require('moment');
var jwt       = require('jwt-simple');
var path      = require('path');
var crypto    = require('./crypto.controllers');
var userCtrl  = require('./user.controllers');
var User     = mongoose.model('User');
var CONSTANTS = require('../../config/constants');

exports.generateToken = function(req, res, next) {
	var auth = req.params.auth;
	auth = auth.replace(/-/g, '+').replace(/_/g, '/').replace(/\./g, '=');
	auth = crypto.decrypt(new Buffer(auth, 'base64'));
	auth = auth.toString().split('|');
	var codeCSO = auth[0];
	var md5ToTest = auth[1].slice(0,32);

	// build the md5
	var md5Computed = crypto.md5(req.ip + moment().format('YYYYMMDD') + codeCSO);

	// DEBUG
	console.log('req.ip ' + req.ip);
	console.log('req.ips ' + req.ips);
	console.log('x-forwarded-for ' + req.headers['x-forwarded-for']);
	console.log('req.connection.remoteAddress ' + req.connection.remoteAddress);
	console.log('req.socket.remoteAddress ' + req.socket.remoteAddress);
	console.log(codeCSO + ' / ' + md5ToTest + ' / ' + md5Computed);

	userCtrl.createOrGetUser(codeCSO, function(err, user) {
		if (err)
			return res.json(err);

		var expires = moment().add('days', 7).valueOf();
		var token = jwt.encode({
			iss: user.id,
			exp: expires
		}, CONSTANTS.JWT_SECRET);

		res.json({ _id: user.id,
			codeCSO: user.codeCSO,
			username: user.firstname + ' ' + user.lastname,
			token: token,
			l: user.lang,
			favs: user.favs
		});
	});
};

exports.login = function(req, res, next) {
	res.sendFile(path.join(__dirname, '../../public/login.html'));
};

exports.decodeToken = function(req, res, next) {
	var token = req.headers['x-access-token'];
	if (token) {
		try {
			var decoded = jwt.decode(token, CONSTANTS.JWT_SECRET);
			User.findOne({ _id: decoded.iss }, function(err, user) {
				if (err)
					return res.json({ error: 'back_no_user' });

				req.user = user;
				return next();
			});
		} catch (err) {
			next(err);
		}
	} else {
		req.user = undefined;
		next();
	}
};

exports.requireLogin = function(req, res, next) {
	if (!req.user) {
		return res.json({ error: 'back_require_login' });
	} else {
		next();
	}
};
