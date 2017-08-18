sinon-hook
======================

### How do I stub or mock services at startup?
Often we have dependencies on an integration that we'd like to alleviate during development for a variety of reasons,
e.g. a service may make a call to an external REST or SOAP service that prevents offline development, or is down, rate
controlled or any other number of things that might make it desirable to simply have the wrapping service return some
static response during development.

One solution for this is to add a configurable initialize hook that will use a library like 
[Sinon.js](http://sinonjs.org/) to stub a static response to these services.

1. Create new sails app:
```
$ sails new path-to-app
$ cd path-to-app
```
2. Install dependency
```
$ npm install --save sinon
```
3. [Create a new hook](http://sailsjs.com/documentation/concepts/extending-sails/hooks/project-hooks) by creating a 
  folder in `api/hooks`.  For this example we will use `api/hooks/service-stubbing`.
4. Create an `index.js` file in that directory requiring sinon.js with an initialize function as follows:
```
var sinon = require('sinon');
/**
 * This hook will add stubs for services to allow development when dependent integrated services are down.
 */
module.exports = function serviceStubbing(sails) {
    var self   = this;
    return {
        initialize: function (cb) {
            sails.log.debug('service-stubbing: initialize called');

            if (sails.config.app.stubServices) {
                try {
                  sails.log.debug('service-stubbing: stubbing-services');

                  //see http://sinonjs.org/releases/v3.2.1/stubs/ for further documentation on callsArgWith
                  //note the peculiar lowercased naming of the service when accessed from sails.services
                  var caStub = sinon.stub(sails.services.exampleservice, '').callsArgWith(0, {
                    example: true, realistic: false, mocked: 'Mocked by service-stubbing hook!'
                  });

                  sails.log.debug('service-stubbing: stubbing complete');
                } catch (ex) {
                    sails.log.error('service-stubbing: Couldn\'t stub expected service.\n');
                    sails.log.error('service-stubbing: ' + ex.message + '\n');
                    sails.log.error('service-stubbing: ' + ex.stack + '\n');
                }
            } else {
              sails.log.debug('service-stubbing: skipping service stubbing due to configuration');
            }
            return cb();
        }
    };
}
```
5. Create a configuration property to control whether your service is stubbed.  For example, create `config/app.js` with
  a stubServices property as referenced in step 4.
```js
module.exports.app = {
  stubServices:  false
};
```
  * Here we are defaulting the value to false so that no configuration is necessary to retain the normal behavior
6. Locally, create a `config/local.js` to modify the configuration property for development/testing purposes.  This file
  is gitignored and will ensure you don't accidentally commit a change that will cause your app to stub services 
  unintentionally.  See the [documentation](http://sailsjs.com/documentation/concepts/configuration/the-local-js-file) 
  about `local.js`.
```js
module.exports = {
  app: {
    stubServices: true
  }
};
```
7. Start the app with `stubServices` set to both `true` and `false` in `config/local.js` and observe the behavior.

Happy hacking!

~Kyle

> + Please tweet [@kyle80](https://twitter.com/kyle80) with any ideas/comments/questions about this tutorial.


### License

[The MIT License (MIT)](https://github.com/sails101/contribute-to-sails101/blob/master/LICENSE)
