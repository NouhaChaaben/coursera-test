(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('RestPath', 'https://davids-restaurant.herokuapp.com')
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      //title: '@',
      onRemove: '&'
    },
  //  controller: 'FoundItemsDirectiveController as list',
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController()
{
  var list=this;


}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var controller = this;
  controller.text="";
  controller.found=[];

  controller.searchMenuItems = function () {
      controller.found= MenuSearchService.getMatchedMenuItems(controller.text);
  }
  controller.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}



MenuSearchService.$inject = ['$http', 'RestPath'];
function MenuSearchService($http, RestPath) {
  var service = this;
  var founds=[];

  service.getMatchedMenuItems = function (text) {
    var foundItems =[];
    $http({
      method: "GET",
      url: (RestPath + "/menu_items.json"),
    }).then(function (response) {
      var allItems = response.data.menu_items;
      for (var i = 0; i < allItems.length; i++) {
          var description = allItems[i].description.toLowerCase();
        //  console.log(controller.text);
          if(text !== "")
           {
            if (description.indexOf(text.toLowerCase()) !== -1) {
               foundItems.push(allItems[i]);
            }
          }
        }
      })
    .catch(function (error) {
      console.log("No matches");
    });
    founds=foundItems;
    return foundItems;
  };

  service.removeItem = function (itemIndex) {
    founds.splice(itemIndex, 1);
  };
}

})();
