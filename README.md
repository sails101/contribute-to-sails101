requirejs
======================

### How do I use require.js in a Sails app?

Sails provides a nice linker and pipeline for injecting javascript into your layout and views, but you might want to 
instead make use of [requireJS](http://requirejs.org/) to handle inter-script dependencies on the client side.

1. Create new sails app:
```
$ sails new path-to-app
$ cd path-to-app
```
2. Install dependency (you may optionally download it from require.js directly, retrieve with bower, etc.)
```
$ npm install --save requirejs
```
  * Note that if you manually copy to assets in the next step you don't necessarily need to use **--save**.  This is 
  more useful if you are modifying your build pipeline to copy from node_modules to .tmp, etc. to assist with version
  management and updates.
3. Create a **js/lib** folder to house your dependencies that will be managed with RequireJS.
```
$ mkdir ./assets/js/lib
```
4. Place require.js in **assets/js/lib** .
```
$ cp ./node_modules/requirejs/require.js ./assets/js/lib
```
  * Note we use **lib** instead of **dependencies** simply to maintain parity with RequireJS's documented examples.
  * Also, we don't want the [linker](http://sailsjs.com/documentation/anatomy/tasks/config/sails-linker.js) injecting it 
  without the data-main attribute, which would happen if we placed it in the usual **assets/lib/dependencies**
  * We'll be modifying the related pipeline config, so you can place this elsewhere in assets as you see fit if desired.
5. Create a [config.js](assets/js/config/config.js) for [RequireJS](http://requirejs.org/docs/api.html#config) in 
**assets/js/config**
6. Define your application's [main.js](assets/js/main.js) to be included on your layout view.
7. Modify [pipeline.js](tasks/pipeline.js) as follows:
```
// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Dependencies you want injected on the page w/o respect to Require.js
  // are brought in here (optionally, you can remove this behavior if it is undesired)
  'js/dependencies/**/*.js',

  //Note we removed the following stock Sails behavior so that we allow Require.js to retrieve it's dependencies in the
  //proper order and in accordance with its configuration.
  //'js/**/*.js'
];
```
8. Make the following modification to layout.js to add require.js pages statically.
```
    <!--SCRIPTS-->
    <script src="/js/dependencies/sails.io.js"></script>
    <!--SCRIPTS END-->
    <!-- Require managed includes.  Anything put in dependencies will be injected as described above, but js/lib will be
         managed by RequireJS. -->
    <script data-main="js/main.js" src="js/lib/require.js"></script>
```
9. Place your RequireJS dependencies in **js/app/lib** and include them in the usual fashion.

Happy hacking!
~Kyle


### Coming Soon

 Minification with r.js and pipeline, linker, layout.js augmentation to support page-specific require files for non-SPA 
 apps (traditional server side templated applications - MPAs?).

> + Please tweet [@kyle80](https://twitter.com/kyle80) with any ideas/comments/questions about this tutorial.


### License

[The MIT License (MIT)](https://github.com/sails101/contribute-to-sails101/blob/master/LICENSE)
