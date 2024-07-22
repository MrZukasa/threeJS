import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();  //Definizione scena
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  //Definizione camera
const loader = new GLTFLoader();  //Definizione loader per caricare il modello
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });  //Definizone del renderer con attributi come alpha e antialias
const controls = new OrbitControls(camera, renderer.domElement);  //Definizione dei controlli oribali per la telecamera
const topLight = new THREE.DirectionalLight(0xffffff, 1);  //Definizione della luce
const ambientLight = new THREE.AmbientLight(0x333333, 5);  //Definizione della luce

let model
loader.load(`/super_mario_box/scene.gltf`, (gltf) => {
  model = gltf.scene;
  model.position.set(0, 0, 0);
  scene.add(model);
}, (xhr) => {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
}, (error) => {
  console.error(error);
});

renderer.setSize(window.innerWidth, window.innerHeight);    //Definizione della dimensione del renderer
document.getElementById('container3D').appendChild(renderer.domElement);  //Aggiunta del renderer all'elemento HTML

camera.position.set(3, 3, 3);  //Definizione della posizione iniziale della telecamera

topLight.position.set(500, 500, 500);  //Definizione della posizione iniziale della luce
topLight.castShadow = true;  //Definisco che la luce casti le ombre

scene.add(topLight);    //Aggiungo la luce alla scena
scene.add(ambientLight);   //Aggiungo la luce ambientale alla scena

controls.update();

function animate() {
  requestAnimationFrame(animate);

  model.rotation.x += 0.01;

  renderer.render(scene, camera);
}

window.addEventListener('resize', function (){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();