(function() {
"use strict";

angular.module('common')
.service('CurrentUserService', CurrentUserService);

/**
 * Used to store and track information about the currently logged in user.
 * This is intended to be injected any time we need some user metadata
 * or to find out if the user is authenticated.
 **/
function CurrentUserService() {
  var service = this;
  var _user={};
  var _saveInfo=false;
  /**
   * Load the current user with username and token
   */
  service.saveUser = function(user) {

    _user.firstName = user.firstName;
    _user.lastName = user.lastName;
    _user.email=user.email;
    _user.adress=user.adress;
    _user.phone=user.phone;
    _user.favoriteMenu=user.favoriteMenu;
    _saveInfo=true;
  };


  service.getUser = function() {
    return _user;
  };
  service.setNotSaved = function() {
    _saveInfo=false;
    _user={};
  };
  service.isSaved = function() {
    return _saveInfo;
  };

}


})();
