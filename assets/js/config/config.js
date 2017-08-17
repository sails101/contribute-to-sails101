// Require.js Configuration
// ------------------------
require.config({

    //
    // See README.md
    //
    //Let's try making baseUrl the lib dir like the requirejs example, since most includes will undoubtedly be libs.
    //And by convention we'll dump everything in that dir w/o subdirs unless there is a naming conflict and this will
    //Avoid having to explicitly configure new libs here.
    baseUrl: 'js/lib',

    paths: {
        main: '../main', //this is because r.js wants to resolve main using baseUrl, but if we specify baseUrl in its
        config: '../config', //build profile, we override the one referenced here by means of mainConfigFile, causing our libs
        //not to resolve.
        app: '../app',
    },

});
