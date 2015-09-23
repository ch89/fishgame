<?php

class Score {
	public $scoreId;
	public $name;
	public $points;
	public $error;

	public function Score($scoreId, $name, $points) {
		$this->scoreId = $scoreId;
		$this->setName($name);
		$this->points = $points;
	}

	public function isValid() {
		return empty($this->error);
	}

	public function setName($name) {
		if(empty($name)) {
			$this->error = 'A name is required.';
		}
		else if(strlen($name) > 15) {
			$this->error = 'Max 15 characters';
		}
		$this->name = $name;
	}
}