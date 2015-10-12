/**
 * Created by elliotcobb on 10/11/15.
 */
$(document).ready( function() {
    searchFor("default");
});

function searchFor( query ) {
    $.get( "../back/search.php?q=" + query, function( data ) {
    console.log('search returned: ' + data);
    });
}