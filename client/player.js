export default function(camera, ctrl, map) {
  this.pointerIsLockedFlag = false;
  this.shooting = false;
  this.lastShot = 0;
  this.jumping = false;
  this.lastJump = 0;
  this.jumpCount = 0;

  camera.position.z = 50;
  camera.position.x = 50;

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

    var vx = 0;
    var vz = 0;
    if (ctrl.s) vz = 1;
    if (ctrl.w) vz = -1;
    if (ctrl.a) vx = -1;
    if (ctrl.d) vx = 1;
    camera.translateZ(0.4 * vz);
    camera.translateX(0.4 * vx);

    var nwTile = map.getTileAt(
      camera.position.x - 0.6,
      camera.position.z - 0.6
    );
    var neTile = map.getTileAt(
      camera.position.x + 0.6,
      camera.position.z - 0.6
    );
    var swTile = map.getTileAt(
      camera.position.x - 0.6,
      camera.position.z + 0.6
    );
    var seTile = map.getTileAt(
      camera.position.x + 0.6,
      camera.position.z + 0.6
    );
    // console.log(nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1);
    if (nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1) {
      camera.translateZ(0.4 * -vz);
      camera.translateX(0.4 * -vx);
    }
  };
}
