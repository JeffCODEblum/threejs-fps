export default function(camera, ctrl) {
  this.pointerIsLockedFlag = false;
  this.shooting = false;
  this.lastShot = 0;
  this.jumping = false;
  this.lastJump = 0;
  this.jumpCount = 0;

  this.handleMouseMove = function(event) {
    if (this.pointerIsLockedFlag) {
      var movementX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      camera.rotation.y -= movementX * 0.002;
      if (
        camera.rotation.x - movementY * 0.002 < 1.5 &&
        camera.rotation.x - movementY * 0.002 > -1.5
      )
        camera.rotation.x -= movementY * 0.002;
    }
  };
  this.update = function() {
    if (ctrl.mouseButton && Date.now() - this.lastShot > 100) {
      this.shooting = true;
      this.lastShot = Date.now();
    }

    if (ctrl.space && Date.now() - this.lastJump > 1000) {
      this.lastJump = Date.now();
      this.jumping = true;
      this.jumpCount = 0;
    }

    if (this.shooting) {
      if (Date.now() - this.lastShot > 50) {
        this.shooting = false;
      }
    }
    camera.position.y = 2;
    if (ctrl.w) camera.translateZ(-0.2);
    if (ctrl.s) camera.translateZ(0.2);
    if (ctrl.a) camera.translateX(-0.2);
    if (ctrl.d) camera.translateX(0.2);
  };
}
