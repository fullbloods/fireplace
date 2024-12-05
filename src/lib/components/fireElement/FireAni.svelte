<script lang="ts">
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { CustomEase } from "gsap/CustomEase";

	gsap.registerPlugin(CustomEase);

	let flameContainer: SVGGElement | null = null;
	let sparksContainer: SVGGElement | null = null;
	let flameSVG: SVGSVGElement | null = null;

	const flamePosXArr = [10, -10];
	const flameOffset = 0.34;
	const sparkOffset = 0.72;
	const numFlames = 50;

	let baseScale = 2;
	let yOffset = -20;

	const adjustAnimationPosition = () => {
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		if (screenWidth < 500) {
			yOffset = 120;
		} else if (screenWidth < 1024) {
			yOffset = -15;
		} else {
			yOffset = -20;
		}

		if (screenHeight < 768) {
			yOffset = 120;
		} else if (screenHeight < 1024) {
			yOffset = -15;
		} else {
			yOffset = -20;
		}

		gsap.set(".whole", {
			scale: 3,
			xPercent: 0,
			yPercent: yOffset,
			transformOrigin: "50% -120%"
		});
	};

	function createFlames() {
		if (!flameContainer || !sparksContainer) return;

		const mainTl = gsap.timeline({ timeScale: 1.2 });
		const flameTl = gsap.timeline({ repeat: -1 });
		const sparkTl = gsap.timeline({ repeat: -1 });

		for (let i = 0; i < numFlames; i++) {
			const flame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			flame.setAttribute("class", "flame");
			flame.setAttribute("x", "400");
			flame.setAttribute("y", "310");
			flame.setAttribute("width", "5");
			flame.setAttribute("height", "5");
			flame.setAttribute("rx", "0.5");
			flame.setAttribute("ry", "0.5");
			flame.setAttribute("fill", "#FFDD02");
			flameContainer.appendChild(flame);

			gsap.set(flame, {
				x: i % 2 ? flamePosXArr[0] : flamePosXArr[1],
				transformOrigin: "50% 50%",
				rotation: -45
			});

			const fTl = gsap.timeline({ repeat: -1, repeatDelay: (numFlames - 1) * flameOffset - 2 });
			fTl
				.to(flame, {
					duration: 2,
					x: i % 2 ? "-=22" : "+=22",
					scale: 10,
					ease: "return"
				})
				.to(flame, { duration: 2, y: -145, ease: "flameJump" }, "-=2")
				.to(flame, { duration: 2, fill: "#F73B01", ease: "sine.out" }, "-=2")
				.to(flame, { duration: 2, opacity: 0, ease: "expo.in" }, "-=2");

			flameTl.add(fTl, i * flameOffset);

			const spark = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			spark.setAttribute("class", "spark");
			spark.setAttribute("cx", "400");
			spark.setAttribute("cy", "300");
			spark.setAttribute("r", "0.05");
			spark.setAttribute("fill", "#FFDD02");
			sparksContainer.appendChild(spark);

			gsap.set(spark, {
				x: i % 3 ? flamePosXArr[1] : flamePosXArr[0],
				transformOrigin: "50% 50%"
			});
		}

		sparkTl
			.to(".spark", {
				duration: 2,
				stagger: sparkOffset,
				cycle: {
					x: ["-=25", "+=15", 0, "+=23", "-=5", "+=71", "-=54"],
					scale: () => Math.random() * 23
				},
				ease: "return"
			})
			.to(".spark", {
				duration: 3,
				stagger: sparkOffset,
				cycle: {
					y: () => -(Math.random() * 200) - 200,
					ease: ["sparkFlicker", "SlowMo.config(0.42,0.52)"]
				}
			})
			.to(".spark", {
				duration: 3,
				stagger: sparkOffset,
				cycle: { fill: ["#F36B01", "#FDBB01", "#ededed"] },
				ease: "sine.in"
			})
			.to(".spark", { duration: 3, opacity: 0, stagger: sparkOffset, ease: "expo.in" });

		mainTl.add(flameTl, 0).add(sparkTl, 0);
	}

	onMount(() => {
		gsap.set("svg", { visibility: "visible" });

		CustomEase.create("return", "M0,0 C0,0 0.162,1 0.4,1 0.918,1 1,0 1,0");
		CustomEase.create(
			"sparkFlicker",
			"M0,0 C0.126,0.382 0.216,0.572 0.414,0.482 0.821,0.296 0.984,0.94 1,1"
		);
		CustomEase.create(
			"flameJump",
			"M0,0 C0.126,0.382 0.256,0.248 0.406,0.23 0.85,0.176 0.984,0.94 1,1"
		);

		createFlames();
		adjustAnimationPosition();

		window.addEventListener("resize", adjustAnimationPosition);
	});
</script>

<svg bind:this={flameSVG} class="flameSVG" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
	<g class="whole">
		<g bind:this={flameContainer} class="flameContainer" />
		<g bind:this={sparksContainer} class="sparksContainer" />
		<g class="logs" opacity="1">
			<path
				d="M446.68,299.63l-91.46,29.22a3,3,0,0,1-3.68-2.12L349.2,318a3,3,0,0,1,2.12-3.68l91.46-29.22a3,3,0,0,1,3.68,2.12L448.8,296A3,3,0,0,1,446.68,299.63Z"
				fill="#612e25"
			/>
			<path
				d="M349.2,296l2.34-8.69a3,3,0,0,1,3.68-2.12l91.46,29.22A3,3,0,0,1,448.8,318l-2.34,8.69a3,3,0,0,1-3.68,2.12l-91.46-29.22A3,3,0,0,1,349.2,296Z"
				fill="#70392f"
			/>
		</g>
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
		visibility: visible;
	}
</style>
