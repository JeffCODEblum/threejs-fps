export default function(camera, ctrl, map) {
  this.pointerIsLockedFlag = false;
  this.shooting = false;
  this.lastShot = 0;
  this.jumping = false;
  this.lastJump = 0;
  this.jumpCount = 0;

  camera.position.z = 50;
  camera.position.x = 50;

  this.forwardLock = false;
  this.backwardLock = false;
  this.leftLock = false;
  this.rightLock = false;

  this.downRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    2
  );
  this.upRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, 1, 0),
    0,
    2
  );
  this.forwardRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, -1),
    0,
    2
  );
  this.backwardRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    2
  );
  this.leftRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    2
  );
  this.rightRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    2
  );
  this.rightStrafeRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    2
  );
  this.leftStrafeRay = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(),
    0,
    2
  );
  // console.log("forwardRay", this.forwardRay);

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

  this.camDir = camera.getWorldDirection().negate(); //

  this.updateRaycasters = function() {
    // console.log(this.downRay);
    this.upRay.ray.origin.copy(camera.position);
    this.downRay.ray.origin.copy(camera.position);
    this.forwardRay.ray.set(camera.position, this.camDir);
    this.backwardRay.ray.set(camera.position, this.camDir.negate());
    this.leftRay.ray.set(
      camera.position,
      this.camDir.applyMatrix4(
        new THREE.Matrix4().makeRotationY(-(Math.PI / 2))
      )
    );
    this.rightRay.ray.set(
      camera.position,
      this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI))
    );
    this.rightStrafeRay.ray.set(
      camera.position,
      this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4))
    ); // Working
    this.leftStrafeRay.ray.set(
      camera.position,
      this.camDir.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 4))
    );
  };

  this.downIntersect = this.downRay.intersectObjects(map.walls);
  this.upIntersect = this.upRay.intersectObjects(map.walls);
  this.forwardIntersect = this.forwardRay.intersectObjects(map.walls);
  this.backwardIntersect = this.backwardRay.intersectObjects(map.walls);
  this.leftIntersect = this.leftRay.intersectObjects(map.walls);
  this.rightIntersect = this.rightRay.intersectObjects(map.walls);
  this.rightStrafeIntersect = this.rightStrafeRay.intersectObjects(map.walls);
  this.leftStrafeIntersect = this.leftStrafeRay.intersectObjects(map.walls);

  // console.log("map.walls", map.walls);
  // console.log("forwardIntersect", this.forwardIntersect);
  this.checkIntersections = function() {
    this.downIntersect = this.downRay.intersectObjects(map.walls);
    this.upIntersect = this.upRay.intersectObjects(map.walls);
    this.forwardIntersect = this.forwardRay.intersectObjects(map.walls);
    this.backwardIntersect = this.backwardRay.intersectObjects(map.walls);
    this.leftIntersect = this.leftRay.intersectObjects(map.walls);
    this.rightIntersect = this.rightRay.intersectObjects(map.walls);
    this.rightStrafeIntersect = this.rightStrafeRay.intersectObjects(map.walls);
    this.leftStrafeIntersect = this.leftStrafeRay.intersectObjects(map.walls);

    // if (this.forwardIntersect.length > 0) this.forwardLock = true;
    // if (this.backwardIntersect.length > 0) this.backwardLock = true;
    // if (this.leftIntersect.length > 0) this.leftLock = true;
    // if (this.rightIntersect.length > 0) this.rightLock = true;
  };

  this.update = function() {
    this.camDir = camera.getWorldDirection().negate();
    this.forwardLock = false;
    this.backwardLock = false;
    this.leftLock = false;
    this.rightLock = false;
    this.updateRaycasters();
    this.checkIntersections();
    if (this.forwardIntersect.length > 0)
      console.log(this.forwardIntersect[0].distance);
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
    if (ctrl.s && !this.backwardLock) vz = 1;
    if (ctrl.w && !this.forwardLock) vz = -1;
    if (ctrl.a && !this.leftLock) vx = -1;
    if (ctrl.d && !this.rightLock) vx = 1;
    camera.translateZ(0.4 * vz);
    camera.translateX(0.4 * vx);

    // var nwTile = map.getTileAt(
    //   camera.position.x - 0.6,
    //   camera.position.z - 0.6
    // );
    // var neTile = map.getTileAt(
    //   camera.position.x + 0.6,
    //   camera.position.z - 0.6
    // );
    // var swTile = map.getTileAt(
    //   camera.position.x - 0.6,
    //   camera.position.z + 0.6
    // );
    // var seTile = map.getTileAt(
    //   camera.position.x + 0.6,
    //   camera.position.z + 0.6
    // );
    // // console.log(nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1);
    // if (nwTile == 1 && neTile == 1 && swTile == 1 && seTile == 1) {
    //   camera.translateZ(0.4 * -vz);
    //   camera.translateX(0.4 * -vx);
    // }
  };
}
