import * as THREE from "three";

class Setup {
	constructor(element) {
		this.scene = new THREE.Scene();
		this.size = element
			? {
					height: element.offsetHeight,
					width: element.offsetWidth,
			  }
			: {
					height: window.innerHeight,
					width: window.innerWidth,
			  };
		if (element) {
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(this.size.width, this.size.height);
			element.appendChild(this.renderer.domElement);
			this.renderer.antialias = true;
			this.renderer.shadowMap.enabled = true;
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.camera = new THREE.PerspectiveCamera(
				40,
				this.size.width / this.size.height,
				0.1,
				10000
			);
		} else {
			this.renderer = new THREE.WebGLRenderer({
				canvas: document.querySelector("canvas"),
			});
			this.renderer.setSize(this.size.width, this.size.height);
			this.renderer.antialias = true;
			this.renderer.shadowMap.enabled = true;
			this.renderer.setPixelRatio(window.devicePixelRatio);

			this.camera = new THREE.PerspectiveCamera(
				40,
				this.size.width / this.size.height,
				0.1,
				1000
			);
		}

		return this;
	}

	update() {
		this.renderer.render(this.scene, this.camera);
	}
}
export { Setup };
