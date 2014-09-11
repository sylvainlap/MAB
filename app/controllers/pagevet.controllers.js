/**
 * Module dependencies.
 */
var soap    = require('soap');
var crypto  = require('crypto');
var mcrypt  = require('mcrypt').MCrypt;

/**
 * Constants.
 */
var DEF          = false;
var PRESTA       = 'PROXIMCREATION';
var CLIENT       = 'SNVEL';
var KEY          = 'PROXICREA20140901';
var SOAP_PAGEVET = 'http://www.pagevet.fr/soap/serveur.wsdl';
var LICENSE      = '359d02f2c07a449a6619b3a21b8cafde';
var ENVIRONMENT  = 1;

exports.requestPagevet = function(req, res, next) {
	var codeCso = req.params.codeCso;
	console.log('codeCSO' + codeCso);

	// build the message
	var message = '';
	message += '<?xml version="1.0" encoding="UTF-8"?>';
	message += '<message><fonction>INDIVIDU</fonction><donnees>';
	message += '<info1>' + PRESTA + '</info1>';
	message += '<info2>' + LICENSE + '</info2>';
	message += '<info3>' + CLIENT + '</info3>';
	message += '<info5>' + ENVIRONMENT + '</info5>';
	message += '<info101>' + codeCso + '</info101>';
	message += '</donnees></message>';

	initCipher(function(cipher) {
		var cipherText = cipher.encrypt(message);
		var request = {
			fluxPrestataire: PRESTA,
			fluxDonnes: cipherText.toString('base64')
		};

		soap.createClient(SOAP_PAGEVET, function(err, client) {
			client.ANNURVET(request, function(err, result) {
				if (err)
					console.log(err);

				console.log(result);

				// tester que result.erreur est bien vide.
				var plaintext = cipher.decrypt(new Buffer(result.response, 'base64'));

				console.log(plaintext);

				// transformer le XML en JSON
				res.send(plaintext);
			});
		});
	});
}

function initCipher(callback) {
	var cipher = new mcrypt('rijndael-256', 'ofb');

	// init vector
	var ivSize = cipher.getIvSize();
	var iv = '49b5e32dc26b18ff0990430eda541fb6';
	iv = iv.substr(0, ivSize);

	// DEBUG
	console.log(KEY);
	console.log(this.KEY);

	// key with MD5 hash
	var keySize = cipher.getKeySize();
	hash = crypto.createHash('md5').update(KEY).digest('hex');
	hash = hash.substr(0, keySize);

	cipher.open(hash, iv);

	callback(cipher);
}







}









exports.register = function(req, res, next) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (user)
			return res.json({ error: 'back_username_exists' });

		user = new User(req.body);
		user.save(function(err) {
			if (err)
				return res.json({ error: 'back_err_val_account' });

			// all went good, now we send the token
			generateToken(user.id, function(token) {
				res.json({ message: 'back_logged', token: token, _id: user.id, lang:user.lang, favs:user.favs });
			});
		});
	});
};


