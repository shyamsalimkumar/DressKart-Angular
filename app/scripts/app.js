var dresskart = angular.module('dresskart', ['ngRoute', 'storeControllers','dresskartServices']);

dresskart.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }).
      when('/men', {
        templateUrl: 'templates/mens.html',
        controller: 'menCtrl'
      }).
      when('/men/:id', {
        templateUrl: 'templates/mensDetails.html',
        controller: 'menDetailsCtrl'
      }).
      when('/women', {
        templateUrl: 'templates/womens.html',
        controller: 'womenCtrl'
      }).
      when('/women/:id', {
        templateUrl: 'templates/womensDetails.html',
        controller: 'womenDetailsCtrl'
      }). 
      when('/kids', {
        templateUrl: 'templates/kids.html',
        controller: 'kidsCtrl'
      }).
      when('/kids/:id', {
        templateUrl: 'templates/kidsDetails.html',
        controller: 'kidsDetailsCtrl'
      }).
      when('/cart', {
        templateUrl: 'templates/pdtcart.html',
        controller: 'pdtCtrl'
      }).
      when('/order', {
        templateUrl: 'templates/orders.html',
        controller: 'orderCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

dresskart.controller('navCtrl', ['$scope', '$location', function($scope, $location) {

        $scope.navClass = function(page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };

    }]);