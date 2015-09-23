var GamepadEvent = {
	GAMEPAD_CONNECTED: 'gamepadconnected',
	GAMEPAD_DISCONNECTED: 'gamepaddisconnected'
};

var GamepadButtons = {
	A: 0
};

var GamepadSticks = {
	LEFT_STICK_X: 0,
	LEFT_STICK_Y: 1,
};

var Keyboard = {
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40,
	A: 65,
	J: 74,
	K: 75,
	L: 76,
	I: 73,
	S: 83,
	ESC: 27
};

var KeyboardEvent = {
	KEY_DOWN: "keydown",
	KEY_UP: "keyup"
};

Array.prototype.contains = function(obj) {
	for(var i = 0; i < this.length; i++) {
   		if(this[i] == obj) {
   			return true;
   		}
   	}
	return false;
}