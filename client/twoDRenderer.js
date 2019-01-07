import Graphics from "./assets/graphics.png";

export default function(canvas, context, player) {
  var graphics = new Image();
  graphics.src = Graphics;
  this.update = function() {};

  this.render = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ff0000";
    // context.fillRect(0, 0, canvas.width, canvas.height);
    if (player.shooting) {
      context.drawImage(
        graphics,
        260,
        0,
        70,
        60,
        canvas.width - 450,
        canvas.height - 250,
        164 * 2,
        200
      );
      context.drawImage(
        graphics,
        0,
        0,
        164,
        100,
        canvas.width - 310,
        canvas.height - 100 * 2,
        164 * 2,
        100 * 2
      );
    }
    if (!player.shooting) {
      context.drawImage(
        graphics,
        0,
        0,
        164,
        100,
        canvas.width - 164 * 2,
        canvas.height - 100 * 2,
        164 * 2,
        100 * 2
      );
    }

    context.drawImage(
      graphics,
      200,
      0,
      28,
      28,
      canvas.width / 2,
      canvas.height / 2,
      28,
      28
    );
  };
}
