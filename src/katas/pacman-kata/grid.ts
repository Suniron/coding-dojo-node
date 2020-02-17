export const make = (ctx: CanvasRenderingContext2D, width: number) => {
  // Horizontal lines
  for (let i = 0; i < width; i += width / 10) {
    ctx.moveTo(0, i); // Starting point
    ctx.lineTo(width, i); // End point
    ctx.stroke(); // Make the line visible
  }
  // Vertical lines
  for (let i = 0; i < width; i += width / 10) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, width);
    ctx.stroke();
  }
};
