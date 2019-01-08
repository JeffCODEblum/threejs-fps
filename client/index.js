import TwoDRenderer from "./twoDRenderer.js";
import Player from "./player.js";
import Map from "./map.js";
import Controller from "./controller.js";

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

  var ctrl = new Controller();

  document.addEventListener("keydown", event => {
    ctrl.handleStateChange(event.keyCode, true);
  });

  document.addEventListener("keyup", event => {
    ctrl.handleStateChange(event.keyCode, false);
  });

  document.addEventListener("mouseup", event => {
    ctrl.mouseButton = false;
  });

  var renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x4444ff);
  document.body.appendChild(renderer.domElement);

  var map = new Map(scene);
  var player = new Player(camera, ctrl, map);

  var twoDRenderer = new TwoDRenderer(canvas, context, player);

  document.addEventListener("mousedown", event => {
    renderer.domElement.requestPointerLock =
      renderer.domElement.requestPointerLock ||
      renderer.domElement.mozRequestPointerLock;
    renderer.domElement.requestPointerLock();
    player.pointerIsLockedFlag = true;
    ctrl.mouseButton = true;
  });

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
