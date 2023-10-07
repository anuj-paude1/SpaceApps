import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import * as THREE from "three";
//initial camera position
let setup = new Setup();
setup.camera.position.z = 30;

//loading moon and sun
let moon = await loadAsset("../public/moon.glb");
let sun = await loadAsset("../public/sun_model.glb");
const sunPLight = new THREE.PointLight(0xffffff, 1000);

sun.add(sunPLight);

const gridH = new THREE.GridHelper(200, 10);
setup.scene.add(gridH, sun);

setup.scene.add(moon);
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
