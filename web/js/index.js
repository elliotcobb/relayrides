/**
 * Created by elliotcobb on 10/11/15.
 */

$(document).ready( function() {
    searchFor("LAX", "04/20/2016", "04/22/2016");
});

$('.panel.car-result').click( function() {
   //$(this).find('.panel-body').
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
    //var car_meta_data = search_results['']
    var car_array = search_results['Result']['CarResult'];
    var car_array_length = car_array.length;
    var result_div;

    for (var i = 0; i < car_array_length; i++) {
        result_div = $('.car-result.clone').clone();
        result_div.find('.panel-title .title-link').text(i + '. ' + car_array[i]['DailyRate'] + ' Airport: ' + car_array[i]['PickupAirport']);
        result_div.find('.panel-body').text('Date: ' + car_array[i]['PickupDay']);
        result_div.find('.panel-body .make-reservation').attr('href', car_array[i]['DeepLink']);
        // fill in car data2
        result_div.removeClass('clone');
        result_div.find('.panel-body').append("\nthis is elem: " + i);
        $('body').append(result_div);
        //console.log(result_div);
    }
}