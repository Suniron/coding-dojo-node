import * as grid from "./grid";
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw th grid:
grid.make(ctx);
