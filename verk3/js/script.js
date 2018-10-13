var scene;
var camera;
var renderer;
var geometry;
var material;
var cube;

// Allt sem þarf til að byrja
function start(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshPhysicalMaterial();
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 6;

    controls = new THREE.OrbitControls( camera );
    controls.target.set( 0, 0, 0 );
}

// Bætir við ljósi
function addPointLight(x, y, z)
{
    var light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(x, y, z);
    scene.add(light);
}

function skybox(){
    var cube = new THREE.CubeGeometry(100, 100, 100);

    function loadMat(){
        mat = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('skybox/grid.jpg'),
            side: THREE.DoubleSide
        });
        return mat;
    }
    var cubeMaterials = [
      // back side
      loadMat(),
      // front side
      loadMat(), 
      // Top side
      loadMat(), 
      // Bottom side
      loadMat(), 
      // right side
      loadMat(), 
      // left side
      loadMat()
    ];

    //add cube & materials
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var mesh = new THREE.Mesh(cube, cubeMaterial);
    scene.add(mesh);
}
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 107) {
        // Numpad +
        cube.scale.x += 0.1;
        cube.scale.y += 0.1;
        cube.scale.z += 0.1;
        renderer.render(scene, camera);
    }
    else if(event.keyCode == 109 && cube.scale.x > 0.2) {
        // Numpad -
        cube.scale.x -= 0.1;
        cube.scale.y -= 0.1;
        cube.scale.z -= 0.1;
        renderer.render(scene, camera);
    }
});

function rotateCube(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

// Loopa sem keyrir eins oft og skjárinn refreshar og er notuð mjög svipað og "Game loop" í leikjum
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    rotateCube();
}

start();
skybox();
animate();
addPointLight(1,1,1);
addPointLight(-1,-1,-1);
addPointLight(1,1,-1);
addPointLight(1,-1,1);
addPointLight(-1,1,1);
addPointLight(-1,-1,1);
addPointLight(-1,1,-1);
addPointLight(1,-1,-1);