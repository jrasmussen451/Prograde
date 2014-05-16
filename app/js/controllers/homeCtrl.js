four51.app.controller('HomeCtrl', ['$scope', '$location', 'OrderSearchCriteria',
function ($scope, $location, OrderSearchCriteria) {
    OrderSearchCriteria.query(function(data) {
        $scope.OrderSearchCriteria = data;
        $scope.hasStandardTypes = _hasType(data, 'Standard');
        $scope.hasReplenishmentTypes = _hasType(data, 'Replenishment');
        $scope.hasPriceRequestTypes = _hasType(data, 'PriceRequest');
    });
    function _hasType(data, type) {
        var hasType = false;
        angular.forEach(data, function(o) {
            if (hasType || o.Type == type && o.Count > 0)
                hasType = true;
        });
        return hasType;
    }
    $scope.selectOrderType = function($event, criteria){
        $event.preventDefault();
        //store.set('451Cache.OrderSearchEvent', $event);
        store.set('451Cache.OrderSearchType', criteria);
        $location.path('order');
    }
}]);