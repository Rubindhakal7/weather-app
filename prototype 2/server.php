<?php
 $host = "localhost";
 $username = "root";
 $password = "";
 $dbname = "weatherdb";
 $connection = mysqli_connect( $host, $username, $password, $dbname );

 if ($connection -> connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$url = `https://api.openweathermap.org/data/2.5/weather?q=Falkirk&appid=5d6c2d18b7ff93b2f553fcff890d08ec&units=metric`;
echo $url;

$API_data = file_get_contents( $url );
echo $API_data;

$array = json_decode( $API_data, true );

$name = $array[0]['name'];
$lat = $array[0]['lat'];
$lon = $array[0]['lon'];
$country = $array[0]['country'];
$state = $array[0]['state'];

echo "weather inserted Inserted";

?>

