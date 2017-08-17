define(function(require) {
  var $ = require('jquery'); //another way to include dependencies.
  return {
    announce: function() {
      alert('You are using require.js!')
    }
  };
});
