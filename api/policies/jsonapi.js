/**
 * JsonAPI Policy
 *
 * @author      :: Brian Jemilo II Twitter(@jemiloii) Google(+jemiloii)
 * @authorEmail :: jemiloii@jemiloii.com
 * @description :: Handles json request to the jsonapi.org standard. Useful for front end frameworks like Ember.js
 * @help        :: See https://github.com/JemiloII/contribute-to-sails101
 */

module.exports = function(req, res, next) {
	
	/* This accepts request via the jsonapi.org specs. For example: 
	   
	   ```
	   {
	   	user: [{
	   		id: 1,
	   		name: 'Brian Jemilo II'
	   	},
	   	{
	   		id: 2,
	   		name: 'Mike R McNeil'
	   	}]
	   }
	   ```
	   
	   If you are in need to have the resource property to be plural,
	   
	   Wrap req.body[req.options.model] in a variable and append + 's'
	   
	   `resource = req.body[req.options.model] + 's';`
	   
	   Then replace `req.body[req.options.model]` with `resource`
	
	*/
	
	// Detects if request has information, e.g. Form data, JSONAPI data, etc
	if(req.body !== undefined && req.body[req.options.model] !== undefined){
		// removes the resource from the json
		req.body = req.body[req.options.model];
	}

	return next();
};
