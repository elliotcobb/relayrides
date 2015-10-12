/**
 * Created by elliotcobb on 10/11/15.
 */

$(document).ready( function() {
    searchFor("LAX", "04/20/2016", "04/22/2016");
});

function searchFor( query, date1, date2 ) {
    var target_url = "/web/search.php?dest=" + query + "&date1=" + date1 + "&date2=" + date2;
    $.get( target_url, function( data ) {
        console.log("search result: ");
        var search_results = JSON.parse( data );
        if (search_results['Result']['CarResult'] === undefined) {
            console.log('errors abound');
            console.log(search_results);
        } else {
            console.log('no errors here');
            buildSearchResults( search_results );
        }
    });
}

function buildSearchResults( search_results ) {
    console.log(search_results);
    var car_array = search_results['Result']['CarResult'];
    var car_array_length = car_array.length;
    var result_div;
    var heading_id;
    var collapse_id;

    for (var i = 0; i < car_array_length; i++) {
        result_div = $('.clone-content .car-result.clone').clone();
        result_div.find('.panel-title .title-link').append(i + '. ' + car_array[i]['DailyRate'] + ' Airport: ' + car_array[i]['PickupAirport']);
        result_div.find('.panel-body').append('<br>Date: ' + car_array[i]['PickupDay'] + '<br>');
        result_div.find('.panel-body .make-reservation').attr('href', car_array[i]['DeepLink']);

        collapse_id = "collapse-" + i;
        heading_id = "heading-" + i;
        result_div.find('.panel-heading').attr('id', heading_id);
        result_div.find('#collapseOne').attr('id', collapse_id).attr('aria-labelledby', heading_id);
        result_div.find('.title-link').attr('aria-controls', collapse_id).attr('href', "#" + collapse_id);

        result_div.removeClass('clone');
        $('#accordion').append(result_div);
        //console.log(result_div);
    }
}