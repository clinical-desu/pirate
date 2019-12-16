import * as PIXI from "pixi.js";
import TextButton from "../components/TextButton";
import TweenMax from "gsap/TweenMax";

export default class endMenu extends PIXI.Container {
    constructor(game, gameEnd, text, score) {
        super();
        this.game = game;
        this.gameEnd = gameEnd;
        this.text = text;
        this.score = score;
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
        let tryAgain = new TextButton(this.game, this.gameEnd, this.text);
        let textScore = new PIXI.Text(`Score: ${this.score}`, {
            fontFamily: 'Rapscallion',
            fillGradientType: 1,
            fontSize: 55,
            stroke: 'red',
            letterSpacing: -2,
            strokeThickness: 1,
        });

        [textScore, tryAgain].forEach((elem, i) => {
            elem.x += -60 + i;
            elem.y += -34 + i * 80;
            elem.pivot.set(30, 30);
            this.addChild(elem);
        });
    }
}