import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const modelInitScale = 0.01;
export const loadAsset = async (path) => {
	const loader = new GLTFLoader();
	let gltf = await loader.loadAsync(path);
	let model = gltf.scene;

	model.scale.set(modelInitScale, modelInitScale, modelInitScale);
	return model;
};
