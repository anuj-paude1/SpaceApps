import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import * as THREE from "three";
import { gsap } from "gsap";
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
const maxSunScale = 20;
const maxMoonScale = 0.009;
const maxMoonDisp = 0;
//ambient Light
const ambLight = new THREE.AmbientLight(0xffffff, 1);

const gridH = new THREE.GridHelper(200, 10);
setup.scene.add(gridH, sun);
setup.scene.add(moon);
const controller = setup.control();
function scaleIn() {
	const scaleInTl = new gsap.timeline({ defaults: { duration: 2 } });
	scaleInTl.to(sun.scale, { x: maxSunScale, y: maxSunScale, z: maxSunScale });
	scaleInTl.to(moon.scale, {
		x: maxMoonScale,
		y: maxMoonScale,
		z: maxMoonScale,
	});
}

function animateEclipse() {
	moon.rotation.y += 0.01;
	if (moon.position.x > maxMoonDisp) moon.position.x -= 0.1;
}

function animate() {
	scaleIn();
	animateEclipse();

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
