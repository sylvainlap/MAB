/**
 * Module dependencies.
 */
var soap   = require('soap');
var crypto = require('crypto');
var mcrypt = require('mcrypt').MCrypt;
var xml2js = require('xml2js').parseString;

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

	// is it a number ?
	if (isNaN(codeCso))
		return res.json({ error: 'back_err_pagevet' });

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

	initCipher('rijndael-256', 'ofb', function(cipher) {
		var request = {
			fluxPrestataire: PRESTA,
			fluxDonnees: cipher.encrypt(message).toString('base64')
		};

		soap.createClient(SOAP_PAGEVET, function(err, client) {
			if (err)
				return res.json({ error: 'back_err_pagevet' });

			client.ANNURVET(request, function(err, result) {
				if (err)
					return res.json({ error: 'back_err_pagevet' });

				if ((result.erreur != '') || (result.reponse == ''))
					console.log(result.erreur);
					return res.json({ error: 'back_err_pagevet' });

				var plaintext = cipher.decrypt(new Buffer(result.reponse, 'base64'));

				console.log(plaintext);
				xml2js(plaintext, function(err, result) {
					if (err)
						return res.json({ error: 'back_err_pagevet' });

					console.log(result);
					res.json(result);
				});
			});
		});
	});
}

function initCipher(algo, mode, callback) {
	var cipher = new mcrypt(algo, mode);

	// init vector
	var ivSize = cipher.getIvSize();
	var iv = '49b5e32dc26b18ff0990430eda541fb6';
	iv = iv.substr(0, ivSize);

	// key with MD5 hash
	var keySize = cipher.getKeySize();
	hash = crypto.createHash('md5').update(KEY).digest('hex');
	hash = hash.substr(0, keySize);

	cipher.open(hash, iv);

	callback(cipher);
}
