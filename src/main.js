import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import { landingAnimation } from "./landing_page_animateion";
import * as THREE from "three";

//initial camera position
let setup = new Setup();
setup.camera.position.z = 100;

//loading moon and sun
let moon = await loadAsset("../public/moon.glb");
let sun = await loadAsset("../public/sun_model.glb");
const sunPLight = new THREE.PointLight(0xffffff, 10000);
sun.add(sunPLight);
//setting moon and sun scale and position
sun.scale.set(0, 0, 0);
moon.scale.set(0, 0, 0);
moon.position.set(50, 0, 50);

const gridH = new THREE.GridHelper(200, 10);
setup.scene.add(gridH, sun);
setup.scene.add(moon);

const controller = setup.control();

function animate() {
	landingAnimation(sun, moon);
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
