'use strict';

angular.module('sails-chat-example', [])

  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.messages = [];
    $scope.data  = {
      name    : null,
      message : null
    };

    $scope.send = function(){
      io.socket.post('/message/chat', $scope.data, function(res){});
    };

    io.socket.get('/message/subscribe', function(res){});

    io.socket.on('message', function onServerSentEvent (msg) {
      switch(msg.verb) {

        case 'created':
          $scope.messages.push(msg.data);
          $scope.$apply();
          break;

        default: return;
      }
    });

  }]);
