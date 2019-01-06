/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/assets/graphics.png":
/*!************************************!*\
  !*** ./client/assets/graphics.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"0e66cc149214e02e316db85016103196.png\";\n\n//# sourceURL=webpack:///./client/assets/graphics.png?");

/***/ }),

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_graphics_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/graphics.png */ \"./client/assets/graphics.png\");\n/* harmony import */ var _assets_graphics_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_graphics_png__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nvar PI_2 = Math.PI / 2;\r\n\r\nwindow.onload = function() {\r\n  var havePointerLock =\r\n    \"pointerLockElement\" in document ||\r\n    \"mozPointerLockElement\" in document ||\r\n    \"webkitPointerLockElement\" in document;\r\n\r\n  var canvas = document.getElementById(\"canvas\");\r\n  canvas.width = window.innerWidth;\r\n  canvas.height = window.innerHeight;\r\n  var context = canvas.getContext(\"2d\");\r\n  var graphics = new Image();\r\n  graphics.src = _assets_graphics_png__WEBPACK_IMPORTED_MODULE_0___default.a;\r\n  // Ask the browser to release the pointer\r\n  // document.exitPointerLock = document.exitPointerLock ||\r\n  // \t\t\t   document.mozExitPointerLock ||\r\n  // \t\t\t   document.webkitExitPointerLock;\r\n  // document.exitPointerLock();\r\n\r\n  var scene = new THREE.Scene();\r\n  var camera = new THREE.PerspectiveCamera(\r\n    80,\r\n    window.innerWidth / window.innerHeight,\r\n    1,\r\n    9000\r\n  );\r\n\r\n  camera.rotation.order = \"YXZ\";\r\n  camera.rotation.set(0, 0, 0);\r\n\r\n  // var pitchObject = new THREE.Object3D();\r\n  // pitchObject.add(camera);\r\n  // var yawObject = new THREE.Object3D();\r\n  // yawObject.position.y = 0;\r\n  // yawObject.add(pitchObject);\r\n\r\n  var ctrl = {\r\n    w: false,\r\n    a: false,\r\n    s: false,\r\n    d: false,\r\n    mouseButton: false,\r\n    space: false\r\n  };\r\n  document.addEventListener(\"keydown\", function(e) {\r\n    console.log(e.keyCode);\r\n    switch (e.keyCode) {\r\n      case 87:\r\n        ctrl.w = true;\r\n        break;\r\n      case 65:\r\n        ctrl.a = true;\r\n        break;\r\n      case 83:\r\n        ctrl.s = true;\r\n        break;\r\n      case 68:\r\n        ctrl.d = true;\r\n        break;\r\n      case 32:\r\n        ctrl.space = true;\r\n        break;\r\n    }\r\n  });\r\n\r\n  document.addEventListener(\"keyup\", function(e) {\r\n    switch (e.keyCode) {\r\n      case 87:\r\n        ctrl.w = false;\r\n        break;\r\n      case 65:\r\n        ctrl.a = false;\r\n        break;\r\n      case 83:\r\n        ctrl.s = false;\r\n        break;\r\n      case 68:\r\n        ctrl.d = false;\r\n        break;\r\n      case 32:\r\n        ctrl.space = false;\r\n        break;\r\n    }\r\n  });\r\n\r\n  document.addEventListener(\"mouseup\", event => {\r\n    ctrl.mouseButton = false;\r\n  });\r\n  var renderer = new THREE.WebGLRenderer();\r\n  renderer.setPixelRatio(window.devicePixelRatio);\r\n  renderer.setSize(window.innerWidth, window.innerHeight);\r\n  renderer.setClearColor(0x4444ff);\r\n  document.body.appendChild(renderer.domElement);\r\n\r\n  var lastJump = 0;\r\n  var jumping = false;\r\n  var jumpCount = 0;\r\n\r\n  var pointerIsLockedFlag = false;\r\n  var lastShot = 0;\r\n  var shooting = false;\r\n  document.addEventListener(\"mousedown\", event => {\r\n    renderer.domElement.requestPointerLock =\r\n      renderer.domElement.requestPointerLock ||\r\n      renderer.domElement.mozRequestPointerLock;\r\n    renderer.domElement.requestPointerLock();\r\n    pointerIsLockedFlag = true;\r\n    ctrl.mouseButton = true;\r\n  });\r\n\r\n  // make map\r\n  // ground\r\n  var geometry = new THREE.BoxGeometry(100, 1, 100);\r\n  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\r\n  var grassTexture = new THREE.ImageUtils.loadTexture(\"./grass.jpg\", function(\r\n    texture\r\n  ) {\r\n    texture.wrapS = THREE.RepeatWrapping;\r\n    texture.wrapT = THREE.RepeatWrapping;\r\n    texture.repeat.x = 10;\r\n    texture.repeat.y = 10;\r\n  });\r\n  var boxMaterial1 = new THREE.MeshBasicMaterial({\r\n    map: grassTexture,\r\n    reflectivity: 0.8\r\n  });\r\n  var ground = new THREE.Mesh(geometry, boxMaterial1);\r\n  ground.position.z = 0;\r\n  scene.add(ground);\r\n\r\n  // boxes\r\n  var brickTexture = new THREE.ImageUtils.loadTexture(\"./brick.png\");\r\n  var brickMaterial = new THREE.MeshBasicMaterial({\r\n    map: brickTexture,\r\n    reflectivity: 0.8\r\n  });\r\n  // var cubeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });\r\n  for (var i = 0; i < 10; i++) {\r\n    for (var j = 0; j < 10; j++) {\r\n      if (Math.floor(Math.random() * 10) < 3) {\r\n        var cubeGeo = new THREE.BoxGeometry(10, 10, 10);\r\n        // var cube = new THREE.Mesh(cubeGeo, cubeMat);\r\n        var cube = new THREE.Mesh(cubeGeo, brickMaterial);\r\n        cube.position.x = i * 10 - 50;\r\n        cube.position.z = j * 10 - 50;\r\n        scene.add(cube);\r\n      }\r\n    }\r\n  }\r\n\r\n  document.addEventListener(\"mousemove\", event => {\r\n    if (pointerIsLockedFlag) {\r\n      var movementX =\r\n        event.movementX || event.mozMovementX || event.webkitMovementX || 0;\r\n      var movementY =\r\n        event.movementY || event.mozMovementY || event.webkitMovementY || 0;\r\n\r\n      camera.rotation.y -= movementX * 0.002;\r\n      if (\r\n        camera.rotation.x - movementY * 0.002 < 1.5 &&\r\n        camera.rotation.x - movementY * 0.002 > -1.5\r\n      )\r\n        camera.rotation.x -= movementY * 0.002;\r\n\r\n      console.log(camera.rotation.x);\r\n    }\r\n  });\r\n\r\n  function animate() {\r\n    requestAnimationFrame(animate);\r\n\r\n    if (ctrl.mouseButton && Date.now() - lastShot > 100) {\r\n      shooting = true;\r\n      lastShot = Date.now();\r\n    }\r\n\r\n    if (ctrl.space && Date.now() - lastJump > 1000) {\r\n      this.lastJump = Date.now();\r\n      jumping = true;\r\n      jumpCount = 0;\r\n    }\r\n\r\n    camera.position.y = 2;\r\n\r\n    if (shooting) {\r\n      if (Date.now() - lastShot > 50) {\r\n        shooting = false;\r\n      }\r\n    }\r\n    if (ctrl.w) camera.translateZ(-0.2);\r\n    if (ctrl.s) camera.translateZ(0.2);\r\n    if (ctrl.a) camera.translateX(-0.2);\r\n    if (ctrl.d) camera.translateX(0.2);\r\n\r\n    context.clearRect(0, 0, canvas.width, canvas.height);\r\n    context.fillStyle = \"#ff0000\";\r\n    // context.fillRect(0, 0, canvas.width, canvas.height);\r\n    if (shooting) {\r\n      context.drawImage(\r\n        graphics,\r\n        260,\r\n        0,\r\n        70,\r\n        60,\r\n        canvas.width - 450,\r\n        canvas.height - 250,\r\n        164 * 2,\r\n        200\r\n      );\r\n      context.drawImage(\r\n        graphics,\r\n        0,\r\n        0,\r\n        164,\r\n        100,\r\n        canvas.width - 310,\r\n        canvas.height - 100 * 2,\r\n        164 * 2,\r\n        100 * 2\r\n      );\r\n    }\r\n    if (!shooting) {\r\n      context.drawImage(\r\n        graphics,\r\n        0,\r\n        0,\r\n        164,\r\n        100,\r\n        canvas.width - 164 * 2,\r\n        canvas.height - 100 * 2,\r\n        164 * 2,\r\n        100 * 2\r\n      );\r\n    }\r\n\r\n    context.drawImage(\r\n      graphics,\r\n      200,\r\n      0,\r\n      28,\r\n      28,\r\n      canvas.width / 2,\r\n      canvas.height / 2,\r\n      28,\r\n      28\r\n    );\r\n    renderer.render(scene, camera);\r\n  }\r\n  animate();\r\n};\r\n\n\n//# sourceURL=webpack:///./client/index.js?");

/***/ })

/******/ });