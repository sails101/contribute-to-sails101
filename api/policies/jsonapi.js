module.exports = function(req, res, next) {

	if(req.body !== undefined && req.body[req.options.model] !== undefined){
		req.body = req.body[req.options.model];
	}

	return next();
};