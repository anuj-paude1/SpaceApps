import * as THREE from "three";
import { loadAsset } from "../helpers/gltfLoader";

export const getMoonSunEarthSceneB = async (setup) => {
	const EOMajorAxis = 199.0;
	const EOMinorAxis = 150;
	const MOMajorAxis = 76.88;
	const MOMinorAxis = 60.76;
	const axishelper = new THREE.AxesHelper(10);
	setup.sceneB.add(axishelper);

	const earthCurve = new THREE.EllipseCurve(
		0,
		0, // ax, aY
		EOMajorAxis,
		EOMinorAxis, // xRadius, yRadius
		0,
		2 * Math.PI, // aStartAngle, aEndAngle
		false, // aClockwise
		0 // aRotation
	);
	const earthPoints = earthCurve.getPoints(1000);
	const EOGeometry = new THREE.BufferGeometry().setFromPoints(earthPoints);
	const EOMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
	const moonScale = 1;
	const sunScale = 2;
	const earthScale = 4;
	const gridH = new THREE.GridHelper(2000, 1000, 0x4a4a4a);
	const sunPlight = new THREE.PointLight(0xffffff, 100000);
	sunPlight.castShadow = true;

	const moonCurve = new THREE.EllipseCurve(
		0,
		0, // ax, aY
		MOMajorAxis,
		MOMinorAxis, // xRadius, yRadius
		0,
		2 * Math.PI, // aStartAngle, aEndAngle
		false, // aClockwise
		0 // aRotation
	);
	const moonPoints = moonCurve.getPoints(1000);
	const MOGeometry = new THREE.BufferGeometry().setFromPoints(moonPoints);
	const MOMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
	const gltfMoon = await loadAsset("../public/models/moon.glb");
	let moonModel = gltfMoon.children[0];
	moonModel.scale.z *= moonScale;
	moonModel.scale.x *= moonScale;
	moonModel.scale.y *= moonScale;
	moonModel.castShadow = true;
	moonModel.receiveShadow = true;
	const gltfSun = await loadAsset("../public/models/sun_model.glb");
	gltfSun.scale.z *= sunScale;
	gltfSun.scale.x *= sunScale;
	gltfSun.scale.y *= sunScale;
	const gltfEarth = await loadAsset("../public/models/earth.glb");
	let earthModel = gltfEarth.children[0];
	earthModel.scale.z *= earthScale;
	earthModel.scale.x *= earthScale;
	earthModel.scale.y *= earthScale;
	earthModel.castShadow = true;
	earthModel.receiveShadow = true;
	sunPlight.position.set(-25, 0, 0);

	const ambiLight = new THREE.AmbientLight(0xffffff, 1);
	gltfSun.position.set(-25, 0, 0);
	gltfMoon.position.set(0, 0, 0);
	gltfEarth.position.set(0, 0, 0);

	const EOEllipse = new THREE.Line(EOGeometry, EOMaterial);
	const MOEllipse = new THREE.Line(MOGeometry, MOMaterial);
	MOEllipse.rotateX(Math.PI / 2);
	EOEllipse.rotateX(Math.PI / 2);
	EOEllipse.position.set(0, 0, 0);
	const obj = new THREE.Object3D();

	if (setup.isSceneB) {
		setup.camera.position.set(0, 0, 90);
	}
	MOEllipse.add(gltfMoon);
	obj.add(MOEllipse);
	setup.sceneB.add(gltfSun, sunPlight, gltfEarth, EOEllipse, obj);
	return {
		moonCurve,
		earthCurve,
		MOEllipse,
		EOEllipse,
		gltfMoon,
		gltfEarth,
		gltfSun,
		obj,
	};
};
