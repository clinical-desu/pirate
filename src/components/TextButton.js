import * as PIXI from "pixi.js";

export default class TextButton extends PIXI.Container {
    constructor(game, gameStart, text) {
        super();
        this.game = game;
        this.gameStart = gameStart;
        this.text = text;
        this.addChild(new PIXI.Text(text, {
            fontFamily: 'Rapscallion',
            fillGradientType: 1,
            fontSize: 50,
            stroke: 'red',
            strokeThickness: 1,
        }));
        this.interactive = this.buttonMode = true;
        this.pointertap = () => {
            if (this.text === 'New Game') {
                this.game.removeChild(this.game.gameStart);
                this.game.gamePlayingCreate();
            } else if (this.text === 'Try Again') {
                this.game.removeChild(this.game.gameEnd);
                this.game.gamePlayingCreate();
            }
        };
    }
}