(function () {
'use strict';
angular.module('MenuApp')
.controller('MainItemsController', MainItemsController);

MainItemsController.$inject=['items','$stateParams'];
function MainItemsController(items,$stateParams ){
  var mainItems=this;
  mainItems.items=items.data.menu_items;
  mainItems.categoryShortName=$stateParams.categoryShortName;
}
})();
