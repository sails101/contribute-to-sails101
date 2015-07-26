# Sails.js + Parse SDK

We can use Parse as database for our application. If there's logic
involved before writing data to the database, it is difficult to put
everything to the frontend code.

Here's a simple example where Node.js based framework, Sails.js is used
in the middle of HTML frontend and Parse database.

Create a new Sails.js application

``` bash
sails new employee_database
```

Add `parse` npm module as a dependency for the app in `package.json`:

``` js
"dependencies" : {

  ...

  "parse": "~1.5.0"
}
```

Run:

``` bash
npm install
```

Initialize Parse SDK in `config/bootstrap.js`

``` js
module.exports.bootstrap = function(cb) {
  Parse = require('parse').Parse;
  Parse.initialize(APP_ID, JAVASCRIPT_KEY);

  cb();
}
```

Obtain your App ID and Javascript ID by creating an app in
[Parse](https://parse.com)

Export `Parse` in `config/globals.js`

``` js
module.exports.globals = {

  ...

  Parse: true
};
```
