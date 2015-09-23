function KeyObject() {
    var keysDown = {};

    document.addEventListener(KeyboardEvent.KEY_DOWN, function(e) {
        keysDown[e.keyCode] = true;
    });

    document.addEventListener(KeyboardEvent.KEY_UP, function(e) {
        delete keysDown[e.keyCode];
    });

    this.isDown = function(keyCode) {
        return keyCode in keysDown;
    }
}