import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

class Setup {
	constructor() {
		this.scene = new THREE.Scene();
		this.size = {
			height: window.innerHeight,
			width: window.innerWidth,
		};
		let canvas = document.querySelector("canvas");

		this.renderer = new THREE.WebGLRenderer({ canvas });
		this.renderer.setSize(this.size.width, this.size.height);
		this.renderer.antialias = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.setPixelRatio(window.devicePixelRatio);

		this.camera = new THREE.PerspectiveCamera(
			40,
			this.size.width / this.size.height,
			0.1,
			100000
		);

		return this;
	}
	control() {
		const control = new OrbitControls(this.camera, this.renderer.domElement);
		return control;
	}
	resizeHandler(){
		
	}
	update() {
		this.renderer.render(this.scene, this.camera);
	}
}
export { Setup };
