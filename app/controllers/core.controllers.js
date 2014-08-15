exports.index = function(req, res, next) {
	res.sendfile('../../public/index.html');
};