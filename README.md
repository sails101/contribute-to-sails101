Integrating Passport JS with Sails v0.10+ using Policy
======================

### Overview
This example shows how to integrate passport in the recommended way. We will be using only local strategy but in the same way you can integrate any of the supported strategies.

### Install Passport JS
Install the required packages.

- npm install passport
- npm install passport-local

### config/policies.js
Add the following policy on all the controllers to initialize passport. It's like adding the two middlewares in express. These will be called only on controllers and not on static content. 

```
'*': [
      // Initialize Passport
      passport.initialize(),

      // Use Passport's built-in sessions
      passport.session()
  ],
```

You will also need to add the actual policy which checks the whether session is authenticated or not?
Supossing you have a controller called MainController which needs to be accessed by authenticated people only.

```
MainController: {
    '*': 'sessionAuth'
  },
```

We will see the code behind 'sessionAuth' in a while. 
  
### Authentication Service
We will add a simple authentication service, which describes the local strategy and also how to serialize and deserialize user for session. Add a file called Authentication.js under api/services folder.

```
var LocalStrategy = require('passport-local').Strategy;

exports.Local = new LocalStrategy(
  function(username, password, done) {

    if (username === 'whichsquid') {
      if(password === 'giantone')
        return done(null, {id: username, role: 'man-eater'});
      else
        return done(null, false, { message: 'Incorrect password.' });
    }
    else
      return done(null, false, { message: 'Incorrect username.' });
  }
);

exports.serialize = function(user, done) {
  done(null, user.id);
};

exports.deserialize = function(id, done) {
  done(null, id);
};
```

### config/bootstrap.js
Perfect place for bootstrapping passport. Add the following lines before the callback cb();

```
passport.use(Authentication.Local);
passport.serializeUser(Authentication.serialize);
passport.deserializeUser(Authentication.deserialize);
```

### api/policies/sessionAuth.js
Check if the user exists in session. If user is authenticated and logged in; passport adds a session variable passport.user which contains the deserialized user. On logout or session expiry, this variable is cleared.

```
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy
  if (req.session.passport && req.session.passport.user) {
    return next();
  }

  // redirect to login page if user is not authenticated.
  return res.redirect('/login');
};
```

### Login Controller
This controller show you login page, let's you login and logout.

```
var passport = require('passport');

module.exports = {

  getLogin: function (req, res) {
    return res.ok({ layout: false }, 'login');
  },

  postLogin: function (req, res) {
		passport.authenticate('local',
							{ successRedirect: '/',
       						  failureRedirect: '/login',
       						  session: true })(req,res);
  },

  logout: function (req, res) {
		req.logout();
    return res.redirect('/login');
  }
};
```

### Login Form
Sample login form. Note that username and password fields needs to be of the same name. If you want to use different name then you will need to configure that in local strategy also. For more details check out [Passport](http://passportjs.org).

```
<form action='/login' method="POST">
  <input type="text" name="username">
  <input type="password" name="password">
  <input type="submit" value="LOG IN">
</form>
```

### Version tested on
- passport - 0.2.0
- passport-local - 1.0.0
- sails - 0.10.0-rc8
