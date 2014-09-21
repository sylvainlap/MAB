/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var pagevet  = require('./pagevet.controllers');
var User     = mongoose.model('User');

exports.updateUser = function(req, res, next) {
	codeCso = req.params.codeCso;
	User.findOne({ codeCso: codeCso }, function(err, user) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		var infos = pagevet.requestPagevet(codeCso);
		console.log(infos);

		// TODO update user with infos

		res.json(user);
	});
}

exports.getProfile = function(req, res, next) {
	// req.user is defined
	User.findById(req.user.id, function(err, user) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		// should never happen
		if (!user)
			return res.json({ error: 'back_no_user' });

		res.json(user);
	});
};

exports.updateProfile = function(req, res, next) {
	// req.user is defined
	User.findById(req.user.id, function(err, user) {
		if (err)
			return res.json({ error: 'back_err_mongo' });

		// should never happen
		if (!user)
			return res.json({ error: 'back_no_user' });

		// c'est un test, mais je pense que ca marche
		for (var attr in req.body) {
			user[attr] = req.body[attr];
		}
		user.save(function(err) {
			if (err)
				return res.json({ error: 'back_err_profile' });
		});
		res.json({ message: 'back_profile_ok' });
	});
};

exports.createOrGetUser = function(codeCso, callback) {
	User.findOne({ codeCso: codeCso }, function(err, user) {
		if (user) {
			// user already exists
			callback(null, user);
			return;
		}

		// user does not exist, create it
		pagevet.requestPagevet(codeCso, function(err, result) {
			if (err) {
				callback(err);
				return;
			}

			console.log('1 ' + result.donnees['F1.IND.IDENTITE'][0].info106);
			console.log('2 ' + result.donnees['F1.IND.IDENTITE'][0].info104);
			console.log('3 ' + result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'][0].info2035);

			user = new User({
				codeCso: codeCso,
				firstname: result.donnees['F1.IND.IDENTITE'].info106,
				lastname: result.donnees['F1.IND.IDENTITE'].info104,
				email: result.donnees['F5.DPE'][0]['F5.DPE.IDENTITE'].info2035
			});
			user.save(function(err, user) {
				if (err) {
					callback(err);
					return;
				}

				callback(null, user);
			});
		});
	});
}
