<?php

require_once("ScoreDAL.php");
require_once("Score.php");

$scoreDAL = new ScoreDAL();
$scores = $scoreDAL->getScores();
echo json_encode($scores); 