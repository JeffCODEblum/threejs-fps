import TwoDRenderer from "./twoDRenderer.js";
import Player from "./player.js";

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

  // Ask the browser to release the pointer
  // document.exitPointerLock = document.exitPointerLock ||
  // 			   document.mozExitPointerLock ||
  // 			   document.webkitExitPointerLock;
  // document.exitPointerLock();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    1,
    9000
  );

  camera.rotation.order = "YXZ";
  camera.rotation.set(0, 0, 0);

  var ctrl = {
    w: false,
    a: false,
    s: false,
    d: false,
    mouseButton: false,
    space: false
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
      case 32:
        ctrl.space = true;
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
      case 32:
        ctrl.space = false;
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

  var player = new Player(camera, ctrl);

  var twoDRenderer = new TwoDRenderer(canvas, context, player);

  document.addEventListener("mousedown", event => {
    renderer.domElement.requestPointerLock =
      renderer.domElement.requestPointerLock ||
      renderer.domElement.mozRequestPointerLock;
    renderer.domElement.requestPointerLock();
    player.pointerIsLockedFlag = true;
    ctrl.mouseButton = true;
  });

  // make map
  // ground
  var geometry = new THREE.BoxGeometry(100, 1, 100);
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var grassTexture = new THREE.ImageUtils.loadTexture("./grass.jpg", function(
    texture
  ) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 10;
  });
  var boxMaterial1 = new THREE.MeshBasicMaterial({
    map: grassTexture,
    reflectivity: 0.8
  });
  var ground = new THREE.Mesh(geometry, boxMaterial1);
  ground.position.z = 0;
  scene.add(ground);

  // boxes
  var brickTexture = new THREE.ImageUtils.loadTexture("./brick.png");
  var brickMaterial = new THREE.MeshBasicMaterial({
    map: brickTexture,
    reflectivity: 0.8
  });
  // var cubeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (Math.floor(Math.random() * 10) < 3) {
        var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
        // var cube = new THREE.Mesh(cubeGeo, cubeMat);
        var cube = new THREE.Mesh(cubeGeo, brickMaterial);
        cube.position.x = i * 10 - 50;
        cube.position.z = j * 10 - 50;
        scene.add(cube);
      }
    }
  }

  document.addEventListener("mousemove", event => {
    player.handleMouseMove(event);
  });

  function animate() {
    requestAnimationFrame(animate);
    player.update();
    twoDRenderer.render();
    renderer.render(scene, camera);
  }
  animate();
};
