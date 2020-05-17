(function () {
"use strict";

angular.module('public')
.controller('LoginController', LoginController);

LoginController.$inject = ['MenuService','CurrentUserService'];
function LoginController(MenuService, CurrentUserService) {
  var $ctrl = this;
  $ctrl.user={};
  $ctrl.user.firstNamename = '';
  $ctrl.user.lastName = '';
  $ctrl.user.email = '';
  $ctrl.user.adress = '';
  $ctrl.user.phone = '';
  $ctrl.menuNumber = '';
  $ctrl.message = '';

  $ctrl.submit = function () {
    //$ctrl.completed = true;
    $ctrl.message = '';
    $ctrl.user.favoriteMenu={};
    var short_name=extractCategory();
    console.log("voici short_name "+short_name);
    var promise=MenuService.getMenuItems(short_name);
    promise.then(function(result){
      var allItems=result.menu_items;
    if(allItems.length===0){
      $ctrl.message="No such menu number exists";
      CurrentUserService.setNotSaved();
    }
    else{
      var itemIndex= searchItem(allItems,$ctrl.menuNumber);
      console.log($ctrl.user.favoriteMenu);
      if(itemIndex!==null){
        $ctrl.user.favoriteMenu=allItems[itemIndex];
        $ctrl.message="Your information has been saved";
        CurrentUserService.saveUser($ctrl.user);
      }
      else {
        $ctrl.message="No such menu number exists";
        CurrentUserService.setNotSaved();
      }
    }
    });
  }
  function searchItem(allItems, menuNumber)
  {
    for(var i=0;i<allItems.length;i++) {
      if(allItems[i].short_name===menuNumber){
        return i;
      }
    }
    return null;
  }
  function extractCategory()
  {
    var char2 = $ctrl.menuNumber.charAt(1);
    var pattern=/[A-Z]/g;

    if($ctrl.menuNumber){
      if(pattern.test(char2)){

          return ""+$ctrl.menuNumber.charAt(0)+$ctrl.menuNumber.charAt(1);
      }
      else{
        return ""+$ctrl.menuNumber.charAt(0);
      }
    }
    return null;
  }
}


})();
