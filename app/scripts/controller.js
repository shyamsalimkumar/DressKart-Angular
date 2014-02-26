var storeControllers = angular.module('storeControllers', []);

storeControllers.controller('menCtrl', ['$scope', 'men',
  function($scope, men) {
  	 men.get(function(dresses){
    $scope.men = dresses.men;
  });
  }]);

storeControllers.controller('womenCtrl', ['$scope', 'women',
  function($scope, women) {
  	 women.get(function(dresses){
    $scope.women = dresses.women;
  });
  }]);

storeControllers.controller('kidsCtrl', ['$scope', 'kids',
  function($scope, kids) {
  	 kids.get(function(dresses){
    $scope.kids = dresses.kids;
  });
  }]);

storeControllers.controller('menDetailsCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, mensDetails) {
       mensDetails.get('json/dresses.json').success(function(data){
       	$scope.mens = data.men[$routeParams.id];
       	console.log($scope.mens);
       
    });

  }]);

storeControllers.controller('womenDetailsCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, womensDetails) {
       womensDetails.get('json/dresses.json').success(function(data){
       	$scope.womens = data.women[$routeParams.id];       
    });

  }]);

storeControllers.controller('kidsDetailsCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, kidsDetails) {
       kidsDetails.get('json/dresses.json').success(function(data){
       	$scope.kids = data.kids[$routeParams.id];       
    });

  }]);

storeControllers.controller('cartCtrl', function($scope) {
	$scope.saved = localStorage.getItem('products');
	$scope.products = (localStorage.getItem('products')!==null) ? JSON.parse($scope.saved) : [ ];
	localStorage.setItem('products', JSON.stringify($scope.products));
	$scope.addCart = function(img,desc,price,quantity) {
         $scope.products.push({
			image: img,
			name: desc,
			price: price,

		});
          localStorage.setItem('products', JSON.stringify($scope.products));
    }

});

storeControllers.controller('pdtCtrl', function($scope) {
	if(localStorage.getItem("products") ===null)
		  {
		  	$scope.products = [];
		  }
		  else
		  {
		  	$scope.products = JSON.parse(localStorage.getItem("products")); // get value from localstorage
		  }
	  
	  
	  $scope.clear = function(index){ 
		  //$scope.products = [];
		  $scope.products.splice(index, 1);
		 localStorage.setItem('products', JSON.stringify($scope.products));
                  // clear all value in particular storage variable in HTML5 localstorage
	};
});
storeControllers.controller('orderCtrl', function($scope, $location) {
	
	$scope.submit = function() {
		 alert("Thanks for your order");
      	$location.path('/home');
    }

});
