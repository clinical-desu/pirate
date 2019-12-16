import * as PIXI from "pixi.js";
import endMenu from "./endMenu";

export default class gameEnd extends PIXI.Container {
    constructor(game, score) {
        super();
        this.game = game;
        this.background = this.addChild(PIXI.Sprite.from('src/img/endGame.jpg'));
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;
        this.score = score;
        this.position.set(0, 0);
        this.addChild(new endMenu(this.game, this, 'Try Again', this.score));
    }
}