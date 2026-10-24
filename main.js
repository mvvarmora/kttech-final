import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');
const loader = document.getElementById('loader');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf6f6f8);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 50);
camera.position.set(0, 0, 5.2);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3;
controls.enablePan = false;
controls.minDistance = 4.2;
controls.maxDistance = 6;

scene.add(new THREE.AmbientLight(0xffffff, 2.2));
const light = new THREE.DirectionalLight(0xffffff, 1.6);
light.position.set(5, 8, 10);
scene.add(light);

const loaderTex = new THREE.TextureLoader();
const images = ['hero.png', 'product1.png', 'product2.png', 'product3.png', 'product4.png'];
const textures = images.map(src => {
    const t = loaderTex.load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
});

const geo = new THREE.PlaneGeometry(3.4, 2.25);
const mat = new THREE.MeshBasicMaterial({ map: textures[0], transparent: true });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

let idx = 0;
let timer = setInterval(() => {
    idx = (idx + 1) % textures.length;
    mat.map = textures[idx];
    mat.needsUpdate = true;
}, 2000);

renderer.domElement.addEventListener('pointerdown', () => { clearInterval(timer); controls.autoRotate = false; });
renderer.domElement.addEventListener('pointerup', () => { controls.autoRotate = true; timer = setInterval(() => { idx = (idx + 1) % textures.length; mat.map = textures[idx]; mat.needsUpdate = true; }, 2000); });

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    setTimeout(() => loader?.remove(), 700);
}, 600);

function tick() {
    requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
}
tick();
