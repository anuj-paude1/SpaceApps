import * as THREE from "three";
import { loadAsset } from "../helpers/gltfLoader";

export const getMoonSunEarthSceneB = async (setup) => {
	const ETSDistanceScale = 0.001;
	const MTEDistanceScale = 0.01;
	const EOMajorAxis = 299000000;

	const earthCurve = new THREE.EllipseCurve(
		0,
		0, // ax, aY
		30,
		40, // xRadius, yRadius
		0,
		2 * Math.PI, // aStartAngle, aEndAngle
		false, // aClockwise
		0 // aRotation
	);
	const earthPoints = earthCurve.getPoints(50);
	const EOGeometry = new THREE.BufferGeometry().setFromPoints(earthPoints);
	const EOMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
	const moonScale = 1 / 4;
	const sunScale = 2;
	const gridH = new THREE.GridHelper(200, 10);

	const moonCurve = new THREE.EllipseCurve(
		0,
		0, // ax, aY
		20,
		10, // xRadius, yRadius
		0,
		2 * Math.PI, // aStartAngle, aEndAngle
		false, // aClockwise
		0 // aRotation
	);
	const moonPoints = moonCurve.getPoints(50);
	const MOGeometry = new THREE.BufferGeometry().setFromPoints(moonPoints);
	const MOMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
	const gltfMoon = await loadAsset("../public/models/moon.glb");
	gltfMoon.scale.z *= moonScale;
	gltfMoon.scale.x *= moonScale;
	gltfMoon.scale.y *= moonScale;
	const gltfSun = await loadAsset("../public/models/sun_model.glb");
	gltfSun.scale.z *= sunScale;
	gltfSun.scale.x *= sunScale;
	gltfSun.scale.y *= sunScale;
	const gltfEarth = await loadAsset("../public/models/earth.glb");

	const ambiLight = new THREE.AmbientLight(0xffffff, 1);
	gltfSun.position.set(-50, 0, 0);
	gltfMoon.position.set(50, 0, 0);
	gltfEarth.position.set(0, 0, 0);

	const EOEllipse = new THREE.Line(EOGeometry, EOMaterial);
	const MOEllipse = new THREE.Line(MOGeometry, MOMaterial);
	MOEllipse.rotateX(Math.PI / 2);
	EOEllipse.rotateX(Math.PI / 2);
	EOEllipse.position.set(-50, 0, 0);

	setup.sceneB.add(
		gltfEarth,
		gltfMoon,
		gltfSun,
		ambiLight,
		gridH,
		MOEllipse,
		EOEllipse
	);
};
