import { gsap } from "gsap";

export const landingAnimation = (sun, moon) => {
	const maxSunScale = 20;
	const maxMoonScale = 0.009;
	function scaleIn() {
		const scaleInTl = new gsap.timeline({ defaults: { duration: 2 } });
		scaleInTl.to(sun.scale, { x: maxSunScale, y: maxSunScale, z: maxSunScale });
		scaleInTl.to(moon.scale, {
			x: maxMoonScale,
			y: maxMoonScale,
			z: maxMoonScale,
		});
	}

	function animateEclipse() {
		moon.rotation.y += 0.01;
		gsap.to(moon.position, {
			x: 0,
			y: 0,
			z: 50,
			duration: 10,
			ease: "power2.out",
		});
	}
	scaleIn();
	animateEclipse();
};
