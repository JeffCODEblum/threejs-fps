export default function(scene) {
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
}
