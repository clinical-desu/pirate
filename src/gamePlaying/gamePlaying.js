import * as PIXI from 'pixi.js'
import Ship from "./Ship";
import Shark from "./Shark";

export default class GamePlaying extends PIXI.Container {
    constructor(app, game) {
        super();
        this.app = app;
        this.game = game;
        this.interactive = true;
        this.background = this.addChild(PIXI.Sprite.from('src/img/background/6.jpg'));
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;
        this.ship = new Ship(this);
        this.health = [];
        this.score = 0;
        this.start();
    }

    start = () => {
        let treasure = PIXI.Sprite.from('src/img/treasure/treasure2.jpg');
        treasure.scale.set(0.40);
        treasure.x = this.width / 2.8;
        treasure.y = this.height / 8;
        this.addChild(treasure);

        let textScore = new PIXI.Text(`Ahoy Captain! To control the ship use arrow keys, for cannon shooting 'W'. Good luck finding treasures YARRR`, {
            fontFamily: 'Rapscallion',
            fillGradientType: 1,
            fill: 'red',
            fontSize: 140,
            stroke: 'black',
            strokeThickness: 3,
            align: "center",
            whiteSpace: "normal",
            wordWrap: true,
            wordWrapWidth: 800
        });

        textScore.x = treasure.width / 2.2;
        textScore.y = treasure.height / 28;
        treasure.addChild(textScore);

        this.background.tint = 0x808080;

        let that = this;
        let disable = false;
        if (!disable) {
            document.onkeydown = () => {
                that.background.tint = 0xFFFFFF;
                that.removeChild(treasure);
                that.ship.disable = false;
                that.addChild(that.ship);
                that.addShipOnStage();
                that.addSharkOnStage();
                that.waterAnimation();
                that.infoBars();
                disable = true;
            };
        }

    };

    addShipOnStage = () => this.ship.drawAll();

    addSharkOnStage = () => {
        let addOnStage = () => {
            this.addChild(new Shark(this, this.ship, this.game));
            if (!this.visible) clearInterval(i);
        };
        let i = setInterval(addOnStage, 1500);
    };

    infoBars = () => {
        let health = () => {
            for (let i = 0; i < 5; i++) this.health.push(new PIXI.Text('🖤', {fontFamily: 'Arial', fontSize: 28}));
            this.health.forEach((elem, i) => {
                elem.x += 5 + 45 * i;
                elem.y += 16;
                this.addChild(this.health[i]);
            });
        };

        let score = () => {
            let countString = new PIXI.Text(this.score, {
                fontFamily: 'Rapscallion',
                fillGradientType: 1,
                fontSize: 40,
                stroke: 'red',
                strokeThickness: 1,
            });
            countString.x = this.width - 90;
            countString.y = 12;
            this.addChild(countString);
            let ticker = PIXI.Ticker.shared;
            ticker.add(() => {
                countString.text = this.score;
            });
        };

        health();
        score();
    };

    waterAnimation = () => {
        const displacementSprite = PIXI.Sprite.from('src/img/background/3.jpg');
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
        displacementSprite.position = this.position;

        this.app.stage.addChild(displacementSprite);
        this.background.filters = [displacementFilter];

        this.app.ticker.add(() => {
            displacementSprite.y++;
            if (displacementSprite.x > displacementSprite.width) displacementSprite.x = 0;
        });
    };
};