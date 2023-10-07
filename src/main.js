import "../style.css";
import { Setup } from "./three_setup";
import { loadAsset } from "./gltfLoader";
import { landingAnimation } from "./landing_page_animateion";
import * as THREE from "three";

//initial camera position
let setup = new Setup();
setup.camera.position.z = 100;

//background stars
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
	"../public/images/2k_stars.jpg",
	"../public/images/2k_stars.jpg",
	"../public/images/2k_stars.jpg",
	"../public/images/2k_stars.jpg",
	"../public/images/2k_stars.jpg",
	"../public/images/2k_stars.jpg",
]);
//hehe
setup.scene.background = texture;

//sun model
const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Radius, widthSegments, heightSegments
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
setup.scene.add(sun);
console.log(sun);
const textureLoader = new THREE.TextureLoader();
textureLoader.load("../public/images/2k_sun.jpg", (texture) => {
	sunMaterial.map = texture;
	sunMaterial.needsUpdate = true;
});

//to change color of sun
// sun.material.color.set(0.7,0.2,0)


//story ko js


let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
// let mountains_behind = document.getElementById('mountains_behind');
// let text = document.getElementById('text');
let btn = document.getElementById('btn');
let mountains_front = document.getElementById('mountains_front');

function mapValue(value, oldLow, oldHigh, newLow, newHigh) {
	// Ensure that the input value is within the old range
	if (value < oldLow) value = oldLow;
	if (value > oldHigh) value = oldHigh;

	// Calculate the percentage of the value within the old range
	const percentage = (value - oldLow) / (oldHigh - oldLow);

	// Map the percentage to the new range
	const newValue = newLow + percentage * (newHigh - newLow);

	return newValue;
}
window.addEventListener('scroll', function () {
	var height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
	console.log(`height: ${height}`);

	let value = window.scrollY;
	console.log(`value: ${height}`);
	console.log(`map: ${mapValue(value, 0, height, 1, 3)}`);

	stars.style.transform = `scale(${mapValue(value, 0, height, 1, 3)})`;

	moon.style.top = value * 1.03 + 'px';
	mountains_front.style.top = value * 0 + 'px';
	// text.style.marginRight = value * 3 + 'px';
	// text.style.marginTop = value * 1.5 + 'px';
	btn.style.marginTop = value * 3 + 'px';
});

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const book = document.getElementById("book");

const paper1 = document.getElementById("p1")
const paper2 = document.getElementById("p2")
const paper3 = document.getElementById("p3")
const paper4 = document.getElementById("p4")
// event
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);



let currentLocation = 1;
let numOfPapers = 4;
let maxLocation = numOfPapers + 1;

function openBook() {
	book.style.transform = "translateX(50%)";
	prevBtn.style.transform = "translateX(-250px)";
	nextBtn.style.transform = "translateX(250px)";

}

function closeBook(isAtBeginning) {
	if (isAtBeginning) {
		book.style.transform = "translateX(0%)";
	} else {
		book.style.transform = "translateX(100%)";
	}


}

function goNextPage() {
	if (currentLocation < maxLocation) {
		switch (currentLocation) {
			case 1:
				openBook();
				paper1.classList.add("flipped");
				paper1.style.zIndex = 1;
				break;
			case 2:
				paper2.classList.add("flipped");
				paper2.style.zIndex = 2;
				break;
			case 3:
				paper3.classList.add("flipped");
				paper3.style.zIndex = 3;
				break;

			case 4:
				paper4.classList.add("flipped");
				paper4.style.zIndex = 4;
				closeBook(false);
				break;
			default:
				throw new Error("unknown state");


		}
		currentLocation++;
	}
}

function goPrevPage() {
	if (currentLocation > 1) {
		switch (currentLocation) {
			case 2:
				closeBook(true);
				paper1.classList.remove("flipped");
				paper1.style.zIndex = 4;

				break;
			case 3:
				paper2.classList.remove("flipped");
				paper2.style.zIndex = 3;
				break;
			case 4:
				paper3.classList.remove("flipped");
				paper3.style.zIndex = 2;
				break;
			case 5:
				openBook();
				paper4.classList.remove("flipped");
				paper4.style.zIndex = 1;
				break;
			default:
				throw new Error("unknown state");


		}
		currentLocation--;
	}
}


//story ko js end

let moonModel = await loadAsset("../public/models/moon.glb");
const sunPLight = new THREE.PointLight(0xffffff, 10000);
sun.add(sunPLight);
//setting moon and sun scale and position
sun.scale.set(0, 0, 0);
moonModel.scale.set(0, 0, 0);
moonModel.position.set(50, 0, 50);

const gridH = new THREE.GridHelper(200, 10);
setup.scene.add(sun);
setup.scene.add(moonModel);

const controller = setup.control();
function scaleIn() {
	const scaleInTl = new gsap.timeline({ defaults: { duration: 2 } });
	scaleInTl.to(sun.scale, { x: maxSunScale, y: maxSunScale, z: maxSunScale });
	scaleInTl.to(moonModel.scale, {
		x: maxmoonModelScale,
		y: maxmoonModelScale,
		z: maxmoonModelScale,
	});
}



function animateEclipse() {
	moonModel.rotation.y += 0.01;
	if (0.1 < moonModel.position.x && moonModel.position.x < 15) {
		sun.material.color.g -= 0.004;
	}
	if (moonModel.position.x > maxmoonModelDisp) moonModel.position.x -= 0.1;
}

function animate() {
	landingAnimation(sun, moonModel);
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
