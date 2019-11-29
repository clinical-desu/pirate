import * as PIXI from "pixi.js";
import startMenu from "../gameStart/startMenu";

export default class gameEnd extends PIXI.Container {
    constructor(game) {
        super();
        this.game = game;
        this.background = this.addChild(PIXI.Sprite.from('src/img/endGame.jpg'));
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;
        this.position.set(0, 0);
        this.addChild(new startMenu(this.game, this, 'Try Again'));
    }
}