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
  ground.position.x = 0;
  ground.position.y = 0;
  scene.add(ground);

  // boxes
  var brickTexture = new THREE.ImageUtils.loadTexture("./brick.png");
  var brickMaterial = new THREE.MeshBasicMaterial({
    map: brickTexture,
    reflectivity: 0.8
  });
  // var cubeMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
  this.map = [];
  for (var i = 0; i < 10; i++) {
    this.map.push([]);
    for (var j = 0; j < 10; j++) {
      if (i != 9 || j != 9) {
        if (Math.floor(Math.random() * 10) < 3) {
          this.map[i].push(1);
          var cubeGeo = new THREE.BoxGeometry(10, 10, 10);
          // var cube = new THREE.Mesh(cubeGeo, cubeMat);
          var cube = new THREE.Mesh(cubeGeo, brickMaterial);
          cube.position.x = i * 10 - 50 + 5;
          cube.position.z = j * 10 - 50 + 5;
          cube.position.y = 5;
          scene.add(cube);
        } else {
          this.map[i].push(0);
        }
      }
    }
  }

  this.getTileAt = function(x, y) {
    var indexI = Math.floor((x + 50) / 10);
    var indexJ = Math.floor((y + 50) / 10);
    console.log(indexI, indexJ);
    if (indexI >= 0 && indexJ >= 0 && indexI < 10 && indexJ < 10) {
      return this.map[indexI][indexJ];
    }
    return false;
  };
}
