import * as PIXI from "pixi.js";
import Cannon from "./Cannon";

export default class Ship extends PIXI.Container {
    constructor(game) {
        super();
        this.game = game;
        this.addChild(PIXI.Sprite.from('src/img/ship.png'));
        this.hitArea = new PIXI.Polygon([
            //first polygon
            new PIXI.Point(13, -41.5),
            new PIXI.Point(32, -3.5),
            new PIXI.Point(-28, 31.5),
            new PIXI.Point(-33, -3.5),
            new PIXI.Point(-14, -40.5),
            new PIXI.Point(0, -56.5),
            //second polygon
            new PIXI.Point(-28, 31.5),
            new PIXI.Point(32, -3.5),
            new PIXI.Point(29, 31.5),
            new PIXI.Point(0, 56.5),
        ]);
        this.gameWidth = this.game.width;
        this.gameHeight = this.game.height;
        this.x = this.gameWidth / 2;
        this.y = this.gameHeight / 2;
        this.width = 90;
        this.height = 150;
        this.ticker = PIXI.Ticker.shared;
        this.drawAll();
    }

    shots = [];
    up = false;
    down = false;
    right = false;
    left = false;

    cannon = () => new Cannon(this, this.game);

    keyShip = () => {
        document.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.up = true;
                    break;
                case 'ArrowDown':
                    this.down = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'w':
                case 'ц':
                case 'W':
                case 'Ц':
                    let cannon = this.game.addChild(this.cannon());
                    this.shots.push(cannon);
                    break;
            }
        };

        document.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.up = false;
                    break;
                case 'ArrowDown':
                    this.down = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        };
    };

    moveShip = () => {
        let speed = 4;
        if (this.up) this.y < 1 ? this.y = 0 : this.y -= speed;
        if (this.left) this.x < 1 ? this.x = 0 : this.x -= speed;
        if (this.down) this.y + this.height >
        this.gameHeight ? this.y = this.gameHeight - this.height + 1 : this.y += speed;
        if (this.right) this.x + this.width >
        this.gameWidth ? this.x = this.gameWidth - this.width + 1 : this.x += speed;
    };

    drawAll = () => {
        this.keyShip();
        this.ticker.add(this.moveShip);
    };
}