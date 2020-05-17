(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject=['user','isSaved'];
function MyInfoController(user,isSaved){
  var $ctrl=this;
  $ctrl.user=user;
  $ctrl.isSaved=isSaved;
  console.log("voici saved  "+ isSaved);
  console.log(user);
}

})();
