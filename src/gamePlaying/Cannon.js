import * as PIXI from "pixi.js";
import TweenMax from "gsap/TweenMax";

export default class Cannon extends PIXI.Container {
    constructor(ship, game) {
        super();
        this.ship = ship;
        this.game = game;
        this.addChild(PIXI.Sprite.from('src/img/cannonBall.png'));
        this.interactive = true;
        this.hitArea = new PIXI.Circle(-0.066, -0.044, 5.421);
        this.width = 20;
        this.height = 20;
        this.x = this.ship.x + 35;
        this.y = this.ship.y - 18;
        TweenMax.to(this, 3,
            {
                y: -this.height,
                onComplete: () => {
                    this.game.removeChild(this);
                    this.ship.shots.pop();
                },
            });
    }
}