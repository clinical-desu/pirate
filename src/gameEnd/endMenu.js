import * as PIXI from "pixi.js";
import TextButton from "../components/TextButton";
import TweenMax from "gsap/TweenMax";

export default class endMenu extends PIXI.Container {
    constructor(game, gameEnd, text) {
        super();
        this.game = game;
        this.gameEnd = gameEnd;
        this.text = text;
        this.background = this.addChild(PIXI.Sprite.from('src/img/popup.png'));
        this.background.pivot.set(this.width / 2, this.height / 2);
        this.background.scale.set(0.26);
        this.x = this.gameEnd.width / 2;
        this.y = -500;
        this.show();
        this.createText();
    }

    show = () => TweenMax.to(this, 2, {y: this.gameEnd.height / 2.2});

    createText = () => {
        let text = new TextButton(this.game, this.gameEnd, this.text);
        text.x = -56;
        text.y = 5;
        text.pivot.set(30, 30);
        this.addChild(text);
    }
}