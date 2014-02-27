var storeControllers = angular.module('storeControllers', []);

storeControllers.controller('homeCtrl', [function( ) { }]);

storeControllers.controller('menCtrl', ['$scope', 'dress',
  function($scope, men) {
  	 men.get(function(dresses){
    $scope.men = dresses.men;
  });
  }]);

storeControllers.controller('womenCtrl', ['$scope', 'dress',
  function($scope, women) {
  	 women.get(function(dresses){
    $scope.women = dresses.women;
  });
  }]);

storeControllers.controller('kidsCtrl', ['$scope', 'dress',
  function($scope, kids) {
  	 kids.get(function(dresses){
    $scope.kids = dresses.kids;
  });
  }]);

storeControllers.controller('menDetailsCtrl', ['$scope', '$routeParams', 'dress',
  function($scope, $routeParams, mensDetails) {
       mensDetails.get(function(data){
       	$scope.mens = data.men[$routeParams.id];
    });

  }]);

storeControllers.controller('womenDetailsCtrl', ['$scope', '$routeParams', 'dress',
  function($scope, $routeParams, womensDetails) {
       womensDetails.get(function(data){
       	$scope.womens = data.women[$routeParams.id];       
    });

  }]);

storeControllers.controller('kidsDetailsCtrl', ['$scope', '$routeParams', 'dress',
  function($scope, $routeParams, kidsDetails) {
       kidsDetails.get(function(data){
       	$scope.kids = data.kids[$routeParams.id];       
    });

  }]);

storeControllers.controller('cartCtrl', ['$scope', 'prodCart', function($scope, prodCart) {
	$scope.saved = prodCart.getCart();
	$scope.products = $scope.saved;
	$scope.addCart = function( img, desc, price, quantity ) {
    var item = {
      image: img,
      name: desc,
      price: price,
    };
    $scope.products.push(item);
    prodCart.addToCart( item );
  };

}]);

storeControllers.controller('pdtCtrl', ['$scope', 'prodCart', function($scope, prodCart) {
  if(prodCart.getCart() ===null) {
    $scope.products = [];
  } else {
    $scope.products = prodCart.getCart(); // get value from localstorage
  }
  
  $scope.clear = function () {
    prodCart.clearCart();
    $scope.products = prodCart.getCart();
  };
}]);
storeControllers.controller('orderCtrl', function($scope, $location) {
	
	$scope.submit = function() {
		 alert("Thanks for your order");
      	$location.path('/home');
    }

});
