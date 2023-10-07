import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import * as THREE from "three";
import { gsap } from "gsap";
//initial camera position
let setup = new Setup();
setup.camera.position.z = 100;

//background stars
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    '../public/2k_stars.jpg',
    '../public/2k_stars.jpg',
    '../public/2k_stars.jpg',
    '../public/2k_stars.jpg',
    '../public/2k_stars.jpg',
    '../public/2k_stars.jpg'
]);

setup.scene.background = texture;

//sun model
const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radius, widthSegments, heightSegments
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); 
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
setup.scene.add(sun);
console.log(sun)
const textureLoader = new THREE.TextureLoader();
textureLoader.load('../public/2k_sun.jpg', (texture) => {
  sunMaterial.map = texture;
  sunMaterial.needsUpdate = true;
});

//to change color of sun
// sun.material.color.set(0.7,0.2,0)


//loading moon and sun
let moon = await loadAsset("../public/moon.glb");
const sunPLight = new THREE.PointLight(0xffffff, 10000);
sun.add(sunPLight);
//setting moon and sun scale and position
sun.scale.set(0, 0, 0);
moon.scale.set(0, 0, 0);
moon.position.set(50, 0, 50);
const maxSunScale = 20;
const maxMoonScale = 0.009;
const maxMoonDisp = 0;

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

const axesHelper = new THREE.AxesHelper( 500 );
setup.scene.add( axesHelper );

function animateEclipse() {
	moon.rotation.y += 0.01;
	if(0.1<moon.position.x && moon.position.x<15)
	{
		sun.material.color.g-=0.004;
	}
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
