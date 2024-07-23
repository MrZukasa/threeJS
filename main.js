import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';

const scene = new THREE.Scene();  //Definizione scena
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  //Definizione camera
const loader = new GLTFLoader();  //Definizione loader per caricare il modello
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });  //Definizone del renderer con attributi come alpha e antialias
const controls = new OrbitControls(camera, renderer.domElement);  //Definizione dei controlli oribali per la telecamera
const topLight = new THREE.DirectionalLight(0xffffff, 1);  //Definizione della luce
const ambientLight = new THREE.AmbientLight(0x333333, 5);  //Definizione della luce

let model
// loader.load(`/super_mario_box/scene.gltf`, (gltf) => {
loader.load(`/super_mario_box/logo-bit.GLB`, (gltf) => {
  model = gltf.scene;
  model.position.set(0, 0, 0);
  model.scale.set(5, 5, 5);
  scene.add(model);
  model.children[0].material = new THREE.MeshPhongMaterial({
    color: 0x9EF732,
    // flatShading: true,
    // side: THREE.DoubleSide,
    // transparent: true,
    opacity: 0.5,
    emissive: 0x9E27F2,
    emissiveIntensity: 0.5,
    reflectivity: 0.5,
  })
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
  model.rotation.y += 0.001;
  renderer.render(scene, camera);
  controls.update();
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

requestAnimationFrame(animate);

function spin() {
  gsap.to(model.rotation, {
    y: '+=35',
    duration: 1.5,
    ease: "power1.inOut",
    //yoyo: true,
    repeat: 0,
    delay: 0.5,
  });
}

window.addEventListener('focus', spin);