four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav',
function ($routeParams, $sce, $scope, $451, Category, Product, Nav) {
	$scope.productLoadingIndicator = true;
	$scope.trusted = function(d){
		if(d) return $sce.trustAsHtml(d);
	}
	Product.search($routeParams.categoryInteropID, null, null, function(products) {
        $scope.products = products;
		$scope.productLoadingIndicator = false;
    });
    if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }else if($scope.tree){
		$scope.currentCategory ={SubCategories:$scope.tree};
	}

	$scope.$on("treeComplete", function(data){
		if (!$routeParams.categoryInteropID) {
			$scope.currentCategory ={SubCategories:$scope.tree};
		}
	});

    // panel-nav
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;

}]);