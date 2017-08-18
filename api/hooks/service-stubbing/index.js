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
                  sinon.stub(sails.services.exampleservice, 'someMethodThatNeedsStubbed').callsArgWith(0, {
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
