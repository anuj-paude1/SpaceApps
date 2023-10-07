import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import { TetrahedronGeometry } from "three";

let element = document.querySelector(".render-container");
let setup = new Setup(element);
let moon = await loadAsset("./moon");
const pLight = new THREE.PointLight(0xffffff, 10000);
pLight.position.set(0, 50, 0);

setup.scene.add(moon);

const animate = () => {
	window.requestAnimationFrame(animate);
	setup.update();
};
animate();

window.addEventListener("resize", () => {
	setup.renderer.setSize(window.innerWidth, window.innerHeight);
	setup.camera.aspect = window.innerWidth / window.innerHeight;
	setup.camera.updateProjectionMatrix();
});
