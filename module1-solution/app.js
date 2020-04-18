(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){

  $scope.lunch="";
  $scope.message="";
  $scope.messageFont="";
  $scope.textBoxBorder="";
  //dividing the string introduced by user using comma separator
  function splitMenu()
  {
    var listOfItems= $scope.lunch.split(',');
    return calculateNonEmptyItems(listOfItems);
  }

  //filtering empty items from list of items
  function calculateNonEmptyItems(items)
  {
    var numberOfItem=0;
    for(var i=0; i<items.length; i++)
    {
      if(items[i].trim()!="")
        numberOfItem++;
    }
    return numberOfItem;
  }

  //Define the message to be shown on Html page according to number of items
  $scope.showMessage =function(){
    if($scope.lunch=="")
    {
      $scope.message="Please enter data first";
      $scope.messageFont="redFont";
      $scope.textBoxBorder="redBorder";
    }
    else {
      $scope.messageFont="greenFont";
      $scope.textBoxBorder="greenBorder";
      var numberOfItem= splitMenu();
      if(numberOfItem<=3)
      {
        $scope.message="Enjoy!";
      }
      else {
        $scope.message="Too much!";
      }
    }

  };
}

})();
