import './style.css';
import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

RectAreaLightUniformsLib.init();

camera.position.set(0, 35, -70);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = (window.innerWidth / window.innerHeight);
  camera.updateProjectionMatrix();
});

const lightRed = new THREE.RectAreaLight(0xFF0000, 5, 20, 70);
lightRed.position.set(-25, 35, 20);
scene.add(lightRed);

const lightGreen = new THREE.RectAreaLight(0x00FF00, 5, 20, 70);
lightGreen.position.set(0, 35, 20);
scene.add(lightGreen);

const lightBlue = new THREE.RectAreaLight(0x0000FF, 5, 20, 70);
lightBlue.position.set(25, 35, 20);
scene.add(lightBlue);

scene.add(new RectAreaLightHelper(lightRed));
scene.add(new RectAreaLightHelper(lightBlue));
scene.add(new RectAreaLightHelper(lightGreen));

const floorGeo = new THREE.BoxGeometry(2000, 0.1, 2000);
const floorMat = new THREE.MeshStandardMaterial({
  color: 0x808080,
  emissive: 0x000000,
  roughness: 0,
  matelness: 0,
  antialias: true,
  reflectivity: 1
});
const floor = new THREE.Mesh(floorGeo, floorMat);

const torKnotGeo = new THREE.TorusKnotGeometry(10, 3, 300, 20);
const torMat = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0,
  metalness: 0,
  antialias: true
});
const torKnot = new THREE.Mesh(torKnotGeo, torMat);
torKnot.position.set(0, 35, 0);
scene.add(torKnot, floor);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(torKnot.position);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torKnot.rotation.y += 0.01;
}
animate();