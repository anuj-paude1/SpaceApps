import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import * as THREE from "three";
//initial camera position
let setup = new Setup();
setup.camera.position.z = 30;


//sun model
const sunGeometry = new THREE.SphereGeometry(1, 32, 32); // Radius, widthSegments, heightSegments
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); 
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
setup.scene.add(sun);
console.log(sun)
const textureLoader = new THREE.TextureLoader();
textureLoader.load('../public/2k_sun.jpg', (texture) => {
  sunMaterial.map = texture;
  sunMaterial.needsUpdate = true;
});

//to change color of sun
sun.material.color.set(0.7,0.2,0)

//loading moon and sun
let moon = await loadAsset("../public/moon.glb");
const sunPLight = new THREE.PointLight(0xffffff, 1000);

sun.add(sunPLight);

const gridH = new THREE.GridHelper(200, 10);
setup.scene.add(gridH);

setup.scene.add(moon,sun);
const controller = setup.control();
console.log(controller);

function animate() {
	controller.update();
	window.requestAnimationFrame(animate);
	setup.update();
}
animate();

window.addEventListener("resize", () => {
	setup.renderer.setSize(window.innerWidth, window.innerHeight);
	setup.camera.aspect = window.innerWidth / window.innerHeight;
	setup.camera.updateProjectionMatrix();
});
