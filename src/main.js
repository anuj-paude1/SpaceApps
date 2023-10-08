import "../style.css";
import { Setup } from "./helpers/three_setup";
import { loadAsset } from "./helpers/gltfLoader";
import { landingAnimation } from "./animations/landing_page_animateion";
import { getMoonAndSun } from "./scenes/sceneA";
import { getMoonSunEarthSceneB } from "./scenes/sceneB";
import { rotatePlanets, revolveOnEllipse } from "./animations/orbit_animation";
import { gsap } from "gsap";

var audio = document.getElementById("myAudio2");
function play_audio(audio)
{
	if (audio.paused) {
		audio.play();
	  } else {
		audio.pause();
	  }
}
//audio pause garnu paryo
function audio_pause(button1,buttton2)
{
	button1.addEventListener("click", function () {
		// Pause the audio when any button is clicked
		audio.pause();
	  });
	button2.addEventListener("click", function () {
		// Pause the audio when any button is clicked
		audio.pause();
	  });
	
}

//initial camera position
let setup = new Setup();



setup.camera.position.set(0, 0, 100);
setup.camera.position.y = 0;

let sceneAAssets = await getMoonAndSun(setup);
let sceneBAssets = await getMoonSunEarthSceneB(setup);

//*story ko js

let btn = document.getElementById("btn");

window.addEventListener("scroll", function () {
	let value = window.scrollY;
	if (value > window.innerHeight) {
		sceneA.remove(sun, moon);
		setup.changeScene(true);
	}
	btn.style.marginTop = value * 3 + "px";
});

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const book = document.getElementById("book");

const paper1 = document.getElementById("p1");
const paper2 = document.getElementById("p2");
const paper3 = document.getElementById("p3");
const paper4 = document.getElementById("p4");
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

//removing the models

function goNextPage() {

	if (!audio.paused) {
		audio.pause()
		audio.currentTime = 0;
	}
	if (currentLocation < maxLocation) {
		switch (currentLocation) {
			case 1:
				openBook();
				paper1.classList.add("flipped");
				paper1.style.zIndex = 1;
				audio = document.getElementById("myAudio2");
				play_audio(audio)
				break;
			case 2:
				paper2.classList.add("flipped");
				paper2.style.zIndex = 2;
				audio = document.getElementById("myAudio3");
				play_audio(audio)
				break;
			case 3:
				paper3.classList.add("flipped");
				paper3.style.zIndex = 3;
				audio = document.getElementById("myAudio4");
				play_audio(audio)
				break;

			case 4:
				paper4.classList.add("flipped");
				paper4.style.zIndex = 4;
				closeBook(false);
				setup.changeScene(true);
				let mainSection = document.querySelector(".mainClass");
				gsap.to(".mainClass", {
					opacity: 0,
					duration: 1,
				});
				setTimeout(() => {
					mainSection.style.display = "none";
					document.querySelector(".render-container").style.zIndex = 100;
					gsap.to(".help-overlay", {
						opacity: 1,
						duration: 1,
					});
				}, 200);
				
				break;
			default:
				throw new Error("unknown state");
		}
		currentLocation++;
	}
}

function goPrevPage() {
	if (!audio.paused) {
		audio.pause()
		audio.currentTime = 0;
	}
	if (currentLocation > 1) {
		switch (currentLocation) {
			case 2:
				closeBook(true);
				paper1.classList.remove("flipped");
				paper1.style.zIndex = 4;
				audio = document.getElementById("myAudio1");
				play_audio(audio)
				break;
			case 3:
				paper2.classList.remove("flipped");
				paper2.style.zIndex = 3;
				audio = document.getElementById("myAudio2");
				play_audio(audio)
				break;
			case 4:
				paper3.classList.remove("flipped");
				paper3.style.zIndex = 2;
				audio = document.getElementById("myAudio3");
				play_audio(audio)
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
const control = setup.control();

//story ko js end

const controller = setup.control();

function animate() {
	landingAnimation(sceneAAssets.sun, sceneAAssets.moonModel);
	rotatePlanets(sceneBAssets.gltfMoon, sceneBAssets.gltfEarth);
	revolveOnEllipse(
		sceneBAssets.moonCurve,
		sceneBAssets.earthCurve,
		sceneBAssets.gltfMoon,
		sceneBAssets.gltfEarth,
		sceneBAssets.MOEllipse,
		sceneBAssets.obj,
		sceneBAssets.red_light_moon,
		sceneBAssets.static_moon,
	);
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
