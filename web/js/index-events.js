/**
 * Created by elliotcobb on 10/16/15.
 */
$(function() {
    $( "#datepicker-start" ).datepicker();
    $( "#datepicker-end" ).datepicker();
});

$('.search-submit').click( function() {

    rrApp.searchFor("LAX", "04/20/2016", "04/22/2016");
});