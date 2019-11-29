import * as PIXI from "pixi.js";
import startMenu from "./startMenu";

export default class gameStart extends PIXI.Container {
    constructor(game) {
        super();
        this.game = game;
        this.position.set(0, 0);
        this.drawBackground();
        this.addChild(new startMenu(this.game, this, 'New Game'));
    }

    drawBackground = () => {
        let startFrame = ["src/img/start-frame/start-1.png", "src/img/start-frame/start-2.png", "src/img/start-frame/start-3.png",
            "src/img/start-frame/start-4.png", "src/img/start-frame/start-5.png", "src/img/start-frame/start-6.png"];
        let textureArray = [];

        for (let i = 0; i < 5; i++) {
            let texture = PIXI.Texture.from(startFrame[i]);
            textureArray.push(texture);
        }

        let animatedSprite = new PIXI.AnimatedSprite(textureArray);
        animatedSprite.width = window.innerWidth;
        animatedSprite.height = window.innerHeight;
        animatedSprite.animationSpeed = 10 / 60;
        animatedSprite.play();
        this.addChild(animatedSprite);
    }
}