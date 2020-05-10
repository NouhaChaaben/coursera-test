(function () {
'use strict';
angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('RestPath', 'https://davids-restaurant.herokuapp.com');

console.log("data service created");


MenuDataService.$inject=['$http', 'RestPath'];
function MenuDataService($http,RestPath){
  var service=this;
console.log("inside service");
  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: (RestPath + "/categories.json")
    });

    return response;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (RestPath + "/menu_items.json"),
       params: {
         category: categoryShortName
      }
    });

    return response;
  };
}
})();
