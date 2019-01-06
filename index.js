var PI_2 = Math.PI / 2;

window.onload = function() {
  var havePointerLock =
    "pointerLockElement" in document ||
    "mozPointerLockElement" in document ||
    "webkitPointerLockElement" in document;

  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext("2d");
  var graphics = new Image();
  graphics.src = "./graphics.png";
  // Ask the browser to release the pointer
  // document.exitPointerLock = document.exitPointerLock ||
  // 			   document.mozExitPointerLock ||
  // 			   document.webkitExitPointerLock;
  // document.exitPointerLock();

  var scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    1,
    9000
  );

  camera.rotation.order = "YXZ";
  camera.rotation.set(0, 0, 0);

  // var pitchObject = new THREE.Object3D();
  // pitchObject.add(camera);
  // var yawObject = new THREE.Object3D();
  // yawObject.position.y = 0;
  // yawObject.add(pitchObject);

  var ctrl = {
    w: false,
    a: false,
    s: false,
    d: false,
    mouseButton: false
  };
  document.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 87:
        ctrl.w = true;
        break;
      case 65:
        ctrl.a = true;
        break;
      case 83:
        ctrl.s = true;
        break;
      case 68:
        ctrl.d = true;
        break;
    }
  });

  document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 87:
        ctrl.w = false;
        break;
      case 65:
        ctrl.a = false;
        break;
      case 83:
        ctrl.s = false;
        break;
      case 68:
        ctrl.d = false;
        break;
    }
  });

  document.addEventListener("mouseup", event => {
    ctrl.mouseButton = false;
  });
  var renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x4444ff);
  document.body.appendChild(renderer.domElement);

  var pointerIsLockedFlag = false;
  var lastShot = 0;
  var shooting = false;
  document.addEventListener("mousedown", event => {
    renderer.domElement.requestPointerLock =
      renderer.domElement.requestPointerLock ||
      renderer.domElement.mozRequestPointerLock;
    renderer.domElement.requestPointerLock();
    pointerIsLockedFlag = true;
    ctrl.mouseButton = true;
  });

  // make map
  // ground
  var geometry = new THREE.BoxGeometry(100, 1, 100);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var ground = new THREE.Mesh(geometry, material);
  ground.position.z = 0;
  scene.add(ground);

  // boxes
  var cubeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (Math.floor(Math.random() * 10) < 3) {
        var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
        var cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.x = i * 10 - 50;
        cube.position.z = j * 10 - 50;
        scene.add(cube);
      }
    }
  }

  document.addEventListener("mousemove", event => {
    if (pointerIsLockedFlag) {
      var movementX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      console.log(movementX, movementY);

      camera.rotation.y -= movementX * 0.002;
      camera.rotation.x -= movementY * 0.002;
      camera.rotation.x -= movementY * 0.002;
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    if (ctrl.mouseButton && Date.now() - lastShot > 100) {
      shooting = true;
      lastShot = Date.now();
    }

    if (shooting) {
      if (Date.now() - lastShot > 50) {
        shooting = false;
      }
    }
    if (ctrl.w) camera.translateZ(-0.2);
    if (ctrl.s) camera.translateZ(0.2);
    if (ctrl.a) camera.translateX(-0.2);
    if (ctrl.d) camera.translateX(0.2);
    camera.position.y = 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ff0000";
    // context.fillRect(0, 0, canvas.width, canvas.height);
    if (shooting) {
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
    if (!shooting) {
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
      60,
      60,
      canvas.width / 2,
      canvas.height / 2,
      60,
      60
    );
    renderer.render(scene, camera);
  }
  animate();
};