# jsonapi.org standards #

This allows sails to handle requests and responses via the [jsonapi.org](http://jsonapi.org) specs. For example: 
	   
```js
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

## Handling Request ##

In the policy [jsonapi.js](https://github.com/JemiloII/contribute-to-sails101/blob/master/api/policies/jsonapi.js)
If you are in need to have the resource property to be plural,

Wrap `req.body[req.options.model]` in a variable and append `+ 's'`

`resource = req.body[req.options.model] + 's';`

Then replace `req.body[req.options.model]` with `resource`

## Sending Responses ##

In the responses [ok.js](https://github.com/JemiloII/contribute-to-sails101/blob/master/api/responsess/ok.js)
Format Responses to Jsonapi.org spec standards.
```js
var format = {};
format[req.options.model] = data;
data = {};
data = format;
```

# Use Cases #
 
For frontend frameworks like Ember.js that heavily and unforgivingly opinionated.
	
# Author #
### Brian Jemilo II ###

Twitter   :: [@jemiloii](http://twitter.com/jemiloii)
Google    :: [+jemiloii](http://plus.google.com/+JemiloII)
IRC       :: jemiloii
CyberDust :: jemiloii 
