<?php

require_once("ScoreDAL.php");
require_once("Score.php");

$name = filter($_POST['name']);
$points = filter($_POST['score']);
$score = new Score(0, $name, $points);

if($score->isValid()) {
	$scoreDAL = new ScoreDAL();
	$scoreDAL->insertScore($score);
}

echo json_encode($score);

function filter($input) {
	$input = trim($input);
	return htmlentities($input);
}