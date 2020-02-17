import * as grid from "./grid";
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const make = (ctx: CanvasRenderingContext2D, width: number) => {
  for (let i = 0; i < width; i += width / 10) {
    ctx.moveTo(0, i); // Starting point
    ctx.lineTo(width, i); // End point
    ctx.stroke(); // Make the line visible
  }
};

// Draw the grid:
grid.make(ctx, 400);
