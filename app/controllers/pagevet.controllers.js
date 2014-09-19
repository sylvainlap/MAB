/**
 * Module dependencies.
 */
var soap      = require('soap');
var xml2js    = require('xml2js').parseString;
var crypto    = require('./crypto.controllers');
var CONSTANTS = require('../../config/constants');

exports.requestPagevet = function(codeCso) {
	// is it a number ?
	if (isNaN(codeCso))
		return { error: 'back_err_pagevet' };

	// build the message
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
		if (err)
			return { error: 'back_err_pagevet' };

		client.ANNURVET(request, function(err, result) {
			if (err)
				return { error: 'back_err_pagevet' };

			if (typeof result.erreur == 'string') {
				console.log(result.erreur);
				return { error: 'back_err_pagevet' };
			} else {
				var plaintext = crypto.decrypt(new Buffer(result.reponse, 'base64'));

				console.log(plaintext);
				xml2js(plaintext, function(err, result) {
					if (err)
						return { error: 'back_err_pagevet' };

					console.log(result);
					return result;
				});
			}
		});
	});
}
