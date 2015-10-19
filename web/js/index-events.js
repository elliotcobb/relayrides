/**
 * Created by elliotcobb on 10/16/15.
 */

const DESTINATION = ".search-form #search-destination";
const ARRIVAL_DATE = ".search-form #datepicker-start";
const DEPARTURE_DATE = ".search-form #datepicker-end";


// rrApp is defined in index.js
// make sure this file is loaded after index.js
$('.search-submit').click( function() {
    if (isSearchFormComplete()) {
        rrApp.searchFor($(DESTINATION).val(), $(ARRIVAL_DATE).val(), $(DEPARTURE_DATE).val());
    }
});

// make search dynamic
// add form incomplete warnings
// add destinations
// add color
// add images?
// release on heroku

function isSearchFormComplete() {
    var complete_form = true;
    $('.search-form .search-required').each( function() {
        if ($(this).val() == "") {
            complete_form = false;
        } else {
            $(this).removeClass('error');
        }
    });
    return complete_form;
}

// initialize datepicker
$(function() {
    $( "#datepicker-start" ).datepicker({
        defaultDate: "+1w",
        minDate: 0,
        maxDate: "+1Y +6M",
        onClose: function( selectedDate ) {
            $( "#datepicker-end" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#datepicker-end" ).datepicker({
        defaultDate: "+1w",
        minDate: 0,
        maxDate: "+1Y +6M",
        onClose: function( selectedDate ) {
            $( "#datepicker-start" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
});