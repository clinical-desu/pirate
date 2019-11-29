import * as PIXI from "pixi.js";
import TweenMax from "gsap/TweenMax";

export default class Shark extends PIXI.Container {
    constructor(gamePlaying, ship, game) {
        super();
        this.gamePlaying = gamePlaying;
        this.ship = ship;
        this.game = game;
        this.shark = this.addChild(this.sharkCreate());
        this.sharkMove();
    }

    sharkCreate = () => {
        let shark1 = PIXI.Texture.from('src/img/shark/shark-1.png');
        let shark2 = PIXI.Texture.from('src/img/shark/shark-2.png');
        let shark3 = PIXI.Texture.from('src/img/shark/shark-3.png');

        shark1.hitArea = new PIXI.Polygon([
            new PIXI.Point(-21, 17),
            new PIXI.Point(-3, -40),
            new PIXI.Point(13, -8),
            new PIXI.Point(16, 17),
            new PIXI.Point(-2, 46)]);

        shark2.hitArea = new PIXI.Polygon([
            new PIXI.Point(-21, 19),
            new PIXI.Point(-17, -7),
            new PIXI.Point(-1, -38),
            new PIXI.Point(17, 19),
            new PIXI.Point(-2, 47)]);

        shark3.hitArea = new PIXI.Polygon([
            new PIXI.Point(-21, 18),
            new PIXI.Point(-15, -7),
            new PIXI.Point(-2, -39),
            new PIXI.Point(10, -8),
            new PIXI.Point(16, 17),
            new PIXI.Point(-2, 46)]);

        let textureArray = [shark1, shark2, shark3];

        let animatedSprite = new PIXI.AnimatedSprite(textureArray);
        animatedSprite.x = Math.floor(Math.random() * this.gamePlaying.width);
        animatedSprite.y = -300;
        animatedSprite.width = 90;
        animatedSprite.height = 90;
        animatedSprite.animationSpeed = 10 / 60;
        animatedSprite.play();

        return animatedSprite;
    };

    sharkMove = () => {
        let hitSS = false;
        let hitSC = false;
        let speed = 10 + Math.floor(Math.random() * 15);

        let collision = () => {
            this.ship.shots.forEach(e => {
                if (!hitSC) {
                    if (this.shark.x <= e.x && this.shark.x + this.shark.width >= e.x &&
                        this.shark.y <= e.y && this.shark.y + this.shark.height >= e.y) {
                        this.gamePlaying.score += parseInt(Math.random() * 40);
                        this.gamePlaying.removeChild(this);
                        this.visible = false;
                        animation.kill();
                        hitSC = true;
                        if(hitSC) {
                            this.ship.shots.pop();
                            e.visible = false;
                        }
                    }
                }
            });

            if (this.shark.x <= this.ship.x && this.shark.x + this.shark.width >= this.ship.x
                && this.shark.y <= this.ship.y && this.shark.y + this.shark.height >= this.ship.y) {
                if (!hitSS) {
                    this.visible = false;
                    this.gamePlaying.removeChild(this.gamePlaying.health[this.gamePlaying.health.length - 1]);
                    this.gamePlaying.health.pop();
                    if (this.gamePlaying.health.length === 0) {
                        this.gamePlaying.visible = false;
                        this.gamePlaying.children = [];
                        this.game.children = [];
                        this.game.addChild(this.game.gameEnd);
                    }
                    hitSS = true;
                }
            }
        };

        let animation = TweenMax.to(this.shark, speed,
            {
                y: this.gamePlaying.height,
                onUpdate: () => collision(),
                onComplete: () => this.visible = false,
            });
    };
}