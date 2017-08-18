/**
 * ExampleController
 *
 * @description :: Server-side logic for managing examples
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `ExampleController.render()`
   */
  render: function (req, res) {
    ExampleService.someMethodThatNeedsStubbed(function(exampleData) {
      res.view('homepage', {exampleData: exampleData});
    }, function() {
      res.serverError();
    });
  }
};

