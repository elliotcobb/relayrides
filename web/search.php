<?php
/**
 * Created by PhpStorm.
 * User: elliotcobb
 * Date: 10/11/15
 * Time: 6:07 PM
 */

ini_set('display_errors',1);

const API_KEY = "rb3cgkm76er2jbcqr9ckkpma";

function quickCURL( $url ) {

    $ch = curl_init();
    $timeout = 5;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

if (isset($_GET['dest']) && isset($_GET['date1']) && isset($_GET['date2'])) {

    $curl_url = "http://api.hotwire.com/v1/search/car?apikey=" . API_KEY .
                "&dest=" . urlencode($_GET['dest']) .
                "&startdate=" . urlencode($_GET['date1']) .
                "&enddate=" . urlencode($_GET['date2']) .
                "&pickuptime=" . "9:00" .
                "&dropofftime=" . "12:00";

//    echo $curl_url;
    $search_result = quickCURL($curl_url);
    $search_result_xml = simplexml_load_string($search_result);
    $search_result_json = json_encode($search_result_xml);
    echo $search_result_json;
}
?>