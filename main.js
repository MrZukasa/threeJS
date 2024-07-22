import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0x333333, 5);

loader.load(`/super_mario_box/scene.gltf`, function (gltf) {
  const model = gltf.scene;
  model.position.set(0, 0, 0);
  scene.add(model);
}, function (xhr) {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
}, function (error) {
  console.error(error);
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

camera.position.z = 3;
camera.position.y = 3;
camera.position.x = 3;

topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

scene.add(ambientLight);


controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener('resize', function (){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();