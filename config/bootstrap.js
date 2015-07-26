/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  Parse = require('parse').Parse;
  Parse.initialize('MSvyVQfi0IPlPoG0Jf4tkizH6q2VTf2LWoQpKgGx', 'R8HNpxizyPDibAiOPPMUdE1Ag4fCNpNPIEFzrXPM');

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
