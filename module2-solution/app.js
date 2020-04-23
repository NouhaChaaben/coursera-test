(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.toBuyItems=ShoppingListCheckOffService.getToBuyItems();

  toBuy.transferItem = function (itemindex) {
    ShoppingListCheckOffService.transferItem(itemindex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.alreadyBoughtItems=ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy
  var itemsToBuy = [
    {name:'Milk', quantity:4},
    {name:'Butter', quantity:6},
    {name:'Cheddar', quantity:10},
    {name:'yogurt', quantity:12},
    {name:'Ricotta', quantity:2}
  ];

  // List of already bought
  var itemsAlreadyBought=[];

  service.transferItem = function (itemindex) {
    var item =itemsToBuy[itemindex];
    itemsAlreadyBought.push(item);
    itemsToBuy.splice(itemindex,1);
  };

  service.getToBuyItems = function () {
    return itemsToBuy;
  };
  service.getAlreadyBoughtItems = function () {
    return itemsAlreadyBought;
  };
}

})();
