/**
 * Created by elliotcobb on 10/11/15.
 */

const SUCCESS_CODE = 0;

// initialize AngularJS
var rrApp = angular.module('rrApp', []);

rrApp.searchFor = function( destination, date1, date2 ) {
    var target_url = "search.php?dest=" + destination + "&date1=" + date1 + "&date2=" + date2;

    $.get( target_url, function( data ) {
        rrApp.search_results = JSON.parse( data );
        if (rrApp.search_results['StatusCode'] != SUCCESS_CODE) {
            // API response error
            console.log("API response error");
            $('.search-form .alert').text('Whoops! Check for typos in your date parameters.').show();
            $('#accordion').hide();
        } else {
            // response detected
            $('.search-form .alert').hide();
            $('#accordion').show();
            rrApp.buildSearchResults();
        }
    });
};


// given a Hotwire car code ex: "ECAR" "CCAR",
// returns the full english name or "car type not found"
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

    $scope.getCarType = rrApp.getCarType;
    $scope.searchFor = rrApp.searchFor;

    rrApp.buildSearchResults = function() {
        $scope.search_results = rrApp.search_results;
        $scope.cars = rrApp.search_results['Result']['CarResult'];
        $scope.$apply();
    };
});