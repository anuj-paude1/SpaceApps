import * as THREE from "three";
import { loadAsset } from "../helpers/gltfLoader";

export const getMoonAndSun = async (setup) => {
	setup.camera.position.set(0, 0, 100);

	//background stars
	const loader = new THREE.CubeTextureLoader();
	const texture = loader.load([
		"./images/2k_stars.jpg",
		"./images/2k_stars.jpg",
		"./images/2k_stars.jpg",
		"./images/2k_stars.jpg",
		"./images/2k_stars.jpg",
		"./images/2k_stars.jpg",
	]);
	//hehe
	setup.sceneA.background = texture;

	
	//sun model
	const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radius, widthSegments, heightSegments
	const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	const sun = new THREE.Mesh(sunGeometry, sunMaterial);
	setup.sceneA.add(sun);
	const textureLoader = new THREE.TextureLoader();
	textureLoader.load("./images/2k_sun.jpg", (texture) => {
		sunMaterial.map = texture;
		sunMaterial.needsUpdate = true;
	});
	let moonModel = await loadAsset("./models/moon.glb");
	const sunPLight = new THREE.PointLight(0xffffff, 10000);
	sun.add(sunPLight);
	//setting moon and sun scale and position
	sun.scale.set(0, 0, 0);
	moonModel.scale.set(0, 0, 0);
	moonModel.position.set(50, 0, 50);

	setup.sceneA.add(sun);
	setup.sceneA.add(moonModel);

	return {
		sun,
		moonModel,
	};
};
