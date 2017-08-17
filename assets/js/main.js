// Main application
require(['config/config'], function () {
  require(['jquery', 'app/my-sample-module'],function ($, myModule) {
    $(document).ready(function () {
      myModule.announce();
    });
  });
});
