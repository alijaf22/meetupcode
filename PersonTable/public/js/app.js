
var app = angular.module('personTable', []);

/* Controllers */

app.controller('MainController', function($scope, $log, dataService) {

  $scope.mainList = [];
  $scope.fileredList = [];

  $scope.firstNameFilter = '';
  $scope.lastNameFilter = '';
  $scope.cityFilter = '';

  $scope.fetchData = function() {
    dataService.getRandomSample(function(people) {
      $scope.mainList = people;
      $scope.runFilters();
    });
  };

  $scope.clearFilters = function() {
    $scope.firstNameFilter = '';
    $scope.lastNameFilter = '';
    $scope.cityFilter = '';
    $scope.runFilters();
  }

  $scope.runFilters = function() {
    $scope.filteredList = _.filter($scope.mainList, function(person) {    
      if ($scope.firstNameFilter != '') {
        if (!person.firstName.match(new RegExp('(.)*' + $scope.firstNameFilter + '(.)*', 'i'))) {
          return false;
        }
      }
      if ($scope.lastNameFilter != '') {
        if (!person.lastName.match(new RegExp('(.)*' + $scope.lastNameFilter + '(.)*', 'i'))) {
          return false;
        }
      }
      if ($scope.cityFilter != '') {
        if (!person.city.match(new RegExp('(.)*' + $scope.cityFilter + '(.)*', 'i'))) {
          return false;
        }
      }
      return true;
    });
  }

  $scope.removePerson = function(index) {
    var person = $scope.filteredList[index];
    $scope.mainList.splice($scope.mainList.indexOf(person), 1);
    $scope.runFilters();
  };

  // init
  $scope.fetchData();
});


/* Services */

app.factory('dataService', function($http, $log) {
  var service = {};

  service.getRandomSample = function(onComplete) {
    $http.get('/randomPeople').then(function(response) {
      onComplete(response.data);
    });
  };

  return service;
});


