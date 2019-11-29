import * as PIXI from 'pixi.js'
import './styles/start.css';
import gameStart from "./gameStart/gameStart";
import gamePlaying from "./gamePlaying/gamePlaying";
import gameEnd from "./gameEnd/gameEnd";

const app = new PIXI.Application({
    autoResize: true,
    resolution: devicePixelRatio
});

let WebFont = require("webfontloader");
let WebFontConfig = {
    custom: {
        families: ['Rapscallion'],
        urls: ['src/styles/start.css']
    }
};

WebFont.load(WebFontConfig);

app.loader
    .add('Rapscallion')
    .add('src/img/background/6.jpg')
    .add('src/img/background/3.jpg')
    .add('src/img/ship.png')
    .add('src/img/popup.png')
    .add('src/img/cannonBall.png')
    .add('src/img/shark/shark-1.png')
    .add('src/img/shark/shark-3.png')
    .add('src/img/shark/shark-2.png')
    .add('src/img/start-frame/start-1.png')
    .add('src/img/start-frame/start-2.png')
    .add('src/img/start-frame/start-3.png')
    .add('src/img/start-frame/start-4.png')
    .add('src/img/start-frame/start-5.png')
    .add('src/img/start-frame/start-6.png')
    .add('src/img/endGame.jpg')
    .load(runAfterLoaded);

class Game extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.gameStart = this.addChild(new gameStart(this));
        this.gameEnd = new gameEnd(this);
        this.gamePlayingCreate = () => this.addChild(new gamePlaying(this.app, this));
    }
}

function runAfterLoaded() {
    app.stage.addChild(new Game(app));

    window.addEventListener('resize', resize);

    function resize() {
        app.renderer.resize(window.innerWidth, window.innerHeight)
    }

    resize();

    document.body.appendChild(app.view);
}