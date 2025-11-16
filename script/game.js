let canvas;
let ctx;
let character = new MovableObject();

function init() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    console.log('Moving right', character);
}