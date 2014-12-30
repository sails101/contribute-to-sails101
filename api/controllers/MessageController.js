/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	chat: function(req, res){
    var data = {
      name: req.param('name'),
      message: req.param('message')
    };
    Message.create(data).exec(function created(err, message){
      Message.publishCreate({id:message.id, name:message.name, message:message.message});
    });
  },
  subscribe: function(req, res){
    Message.watch(req);
  }
};

