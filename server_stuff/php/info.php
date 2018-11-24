<?php

echo "TEST 1 : PREDIS";
require './vendor/predis/predis/autoload.php';
Predis\Autoloader::register();
$redis = new Predis\Client(array(
    "scheme" => "tcp",
    "host" => "goubiq_redis",
    "port" => "6379"
));


$redis->set("hello", "world");

echo $redis->get("hello");

echo "TEST 2 : MYSQL";

$conn = new mysqli("goubiq_redis", "dbuser", "123", "goubiq");

if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$stmt = $conn->prepare("show tables");
$stmt->execute();
$stmt->bind_result($tables);

while($stmt->fetch()) {
    echo($table[0] . "<BR>");
}