/**
 * Created by elliotcobb on 10/11/15.
 */

$(function() {
    $( "#datepicker-start" ).datepicker();
    $( "#datepicker-end" ).datepicker();
});

// initialize AngularJS
var rrApp = angular.module('rrApp', []);

rrApp.searchFor = function( destination, date1, date2 ) {
    var target_url = "search.php?dest=" + destination + "&date1=" + date1 + "&date2=" + date2;

    $.get( target_url, function( data ) {
        console.log("search result: ");
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

$(document).ready( function() {
    rrApp.searchFor("LAX", "04/20/2016", "04/22/2016")
});

rrApp.controller('CarCtrl', function ($scope) {
    rrApp.buildSearchResults = function() {
        $scope.getCarType = rrApp.getCarType;
        $scope.searchFor = rrApp.searchFor;
        $scope.search_results = rrApp.search_results;
        $scope.cars = rrApp.search_results['Result']['CarResult'];
    };
});