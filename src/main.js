import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";

let element = document.querySelector(".render-container");

let setup = new Setup(element);
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
