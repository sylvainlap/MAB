/**
 * Module dependencies.
 */
var crypto    = require('crypto');
var mcrypt    = require('mcrypt').MCrypt;
var CONSTANTS = require('../../config/constants');

var cipher = new mcrypt('rijndael-256', 'ofb');

// init vector
var ivSize = cipher.getIvSize();
var iv = '49b5e32dc26b18ff0990430eda541fb6';
iv = iv.substr(0, ivSize);

// key with MD5 hash
var keySize = cipher.getKeySize();
hash = crypto.createHash('md5').update(CONSTANTS.KEY).digest('hex');
hash = hash.substr(0, keySize);

cipher.open(hash, iv);

exports.encrypt = function(message) {
	return cipher.encrypt(message);
};

exports.decrypt = function(buffer) {
	return cipher.decrypt(buffer);
};

exports.md5 = function(message) {
	return crypto.createHash('md5').update(message).digest('hex');
}
