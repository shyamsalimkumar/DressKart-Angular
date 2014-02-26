'use strict';

var dresskartServices = angular.module('dresskartServices', ['ngResource']);

dresskartServices.factory('men', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

dresskartServices.factory('women', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:false}
    });
  }]);

dresskartServices.factory('kids', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:false}
    });
  }]);

/*dresskartServices.factory('mensDetails', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);*/
dresskartServices.factory('womenDetailsCtrl', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
  dresskartServices.factory('kidsDetailsCtrl', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);