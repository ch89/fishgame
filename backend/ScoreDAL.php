<?php

class ScoreDAL {
	private $mysqli;

	public function ScoreDAL() {
		$this->mysqli = new mysqli('10.209.1.106', '185903_nw65017', '', '185903-game');
	}

	public function getScores() {
		$sql = "SELECT * FROM Score ORDER BY Points DESC LIMIT 5;";
		$stmt = $this->mysqli->prepare($sql);
		$stmt->execute();
		$stmt->bind_result($scoreId, $name, $points);

		$scores = array();

		while($stmt->fetch()) {
			$scores[] = new Score($scoreId, $name, $points);
		}

		return $scores;
	}

	public function insertScore(Score $score) {
		$sql = "INSERT INTO Score(Name, Points) VALUES(?, ?);";
		$stmt = $this->mysqli->prepare($sql);
		$stmt->bind_param('si', $score->name, $score->points);
		$stmt->execute();
	}
}