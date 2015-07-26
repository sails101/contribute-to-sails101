/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `EmployeeController.create()`
   */
  create: function (req, res) {
    var Employee = Parse.Object.extend('Employee');
    var employee = new Employee();
    employee.save(req.body).then(
      function(object) {
      res.send(object, 201);
    },
    function(error) {
      res.send(error, 422);
    }
    );
  },


  /**
   * `EmployeeController.index()`
   */
  index: function (req, res) {
    var Employee = Parse.Object.extend('Employee');
    var query = new Parse.Query('Employee');
    query.find().then(
      function(employees) {
      res.send(employees);
    },
    function(error) {
      res.send(error);
    });
  },


  /**
   * `EmployeeController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};

