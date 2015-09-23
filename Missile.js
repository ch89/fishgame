function Missile(angle) {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrame('images/minirocket.png'));

    this.anchor.x = .5;
    this.anchor.y = .5;

    this.speed = 3;
    this.damage = 1;

    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
}

Missile.prototype = Object.create(PIXI.Sprite.prototype);

Missile.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    if(this.x < 0 || this.x > renderer.width || this.y < 0 || this.y > renderer.height) {
        this.destroy();
        return;
    }

    for(var i = 0; i < players.length; i++) {
        if (this.hitTest(players[i])) {
            players[i].takeDamage(this.damage);
            this.destroy();
            break;
        }
    }
}

Missile.prototype.destroy = function() {
    this.parent.removeChild(this);
}