import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadAsset = async (path) => {
	const loader = new GLTFLoader().setPath("../public");
	let gltf = await loader.load(path);
	let model = gltf.scene.children[0];
	model.scale.set(0.01, 0.01, 0.01);
	return model;
};
