/**
 * Created by elliotcobb on 10/11/15.
 */

// initialize AngularJS
var rrApp = angular.module('rrApp', []);

rrApp.searchFor = function( destination, date1, date2 ) {
    var target_url = "search.php?dest=" + destination + "&date1=" + date1 + "&date2=" + date2;

    $.get( target_url, function( data ) {
        rrApp.search_results = JSON.parse( data );
        if (rrApp.search_results['Result']['CarResult'] === undefined) {
            // API response error
            console.log(rrApp.search_results);
            return "API response error";
        } else {
            // response detected
            rrApp.buildSearchResults();
        }
    });
};


rrApp.getCarType = function ( car_code ) {
    var car_types = rrApp.search_results['MetaData']['CarMetaData']['CarTypes']['CarType'];
    var car_types_length = car_types.length;
    for (var i = 0; i < car_types_length; i++) {
        if (car_types[i]['CarTypeCode'] == car_code) {
            return car_types[i];
        }
    }
    return "car type not found";
};

rrApp.controller('CarCtrl', function ($scope) {
    rrApp.buildSearchResults = function() {

        console.log(rrApp.search_results)
        $scope.getCarType = rrApp.getCarType;
        $scope.searchFor = rrApp.searchFor;
        $scope.search_results = rrApp.search_results;
        $scope.cars = rrApp.search_results['Result']['CarResult'];
        $scope.$apply();
    };
});