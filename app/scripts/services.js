'use strict';

var dresskartServices = angular.module('dresskartServices', ['ngResource']);

dresskartServices.factory('dress', ['$resource',
  function($resource){
    return $resource('json/dresses.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

dresskartServices.service('prodCart', function () {
    this.getCart = function ( ) {
      console.log(localStorage.getItem('products'));
      return localStorage.getItem('products') !== null ? JSON.parse(localStorage.getItem('products')) : [];
    };
    this.addToCart = function ( item ) {
      var items = this.getCart();
      items.push( item );
      console.log(items);
      console.log(JSON.stringify( items ));
      return localStorage.setItem( 'products', JSON.stringify( items ) );
    };
    this.clearCart  = function ( ) {
      return localStorage.removeItem( 'products' );
    };
});