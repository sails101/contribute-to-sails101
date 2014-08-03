# jsonapi

This accepts request via the jsonapi.org specs. For example: 
	   
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
 In the policy [jsonapi.js](https://github.com/JemiloII/contribute-to-sails101/blob/master/api/policies/jsonapi.js)
 If you are in need to have the resource property to be plural,
 
 Wrap `req.body[req.options.model]` in a variable and append `+ 's'`
 
 `resource = req.body[req.options.model] + 's';`
 
 Then replace `req.body[req.options.model]` with `resource`
	

