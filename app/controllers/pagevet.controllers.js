/**
 * Module dependencies.
 */
var soap      = require('soap');
var xml2js    = require('xml2js').parseString;
var crypto    = require('./crypto.controllers');
var CONSTANTS = require('../../config/constants');

exports.requestPagevet = function(codeCso, callback) {
	if (isNaN(codeCso)) {
		callback(new Error('codeCso is not a number'));
		return;
	}

	var message = '';
	message += '<?xml version="1.0" encoding="UTF-8"?>';
	message += '<message><fonction>INDIVIDU</fonction><donnees>';
	message += '<info1>' + CONSTANTS.PRESTA + '</info1>';
	message += '<info2>' + CONSTANTS.LICENSE + '</info2>';
	message += '<info3>' + CONSTANTS.CLIENT + '</info3>';
	message += '<info5>' + CONSTANTS.ENVIRONMENT + '</info5>';
	message += '<info101>' + codeCso + '</info101>';
	message += '</donnees></message>';

	var request = {
		fluxPrestataire: CONSTANTS.PRESTA,
		fluxDonnees: crypto.encrypt(message).toString('base64')
	};

	soap.createClient(CONSTANTS.SOAP_PAGEVET, function(err, client) {
		if (err) {
			console.log('erreur a la creation du client');
			callback(err);
			return;
		}

		client.ANNURVET(request, function(err, result) {
			if (err) {
				console.log('erreur ANNURVET');
				callback(err);
				return;
			}

			console.log('result ' + result);

			if (typeof result.erreur == 'string') {
				console.log(result.erreur);
				callback(new Error(result.erreur));
				return;
			}

			var plaintext = crypto.decrypt(new Buffer(result.reponse, 'base64'));
			console.log('plaintext ' + plaintext.toString());

			xml2js(plaintext.toString(), function(err, result) {
				if (err) {
					callback(err);
					return;
				}

				console.log('result : ' + result);
				callback(null, result);
			});
		});
	});
}
