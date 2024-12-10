<script lang="ts">
	import FireAni from "./FireAni.svelte";
	import { onMount } from "svelte";
	import { bgmPlay } from "$lib/store/bgmStore";

	let src = "/images/firePlaceFrame.png";
	export let isMain = true;

	let flameHeight = 0;
	let placeWallHeight = "25vh";
	let url = "https://youtu.be/UgHKb_7884o?si=iNiJQf2DuGhcmIjL";
	let bgmSrc = "";

	const adjustPlaceWallHeight = () => {
		const flameElement = document.querySelector(".flame") as HTMLElement | null;
		if (flameElement) {
			flameHeight = flameElement.offsetHeight;
			placeWallHeight = `${Math.max(0 * flameHeight, 25)}vh`;
		}
	};

	const regexUrl = () => {
		const regex = /youtu\.be\/([a-zA-Z0-9_-]+)|v=([a-zA-Z0-9_-]+)/;
		const match = url.match(regex);
		const videoId = match?.[1] || match?.[2];
		bgmSrc = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
	};

	const playBgm = () => {
		if ($bgmPlay) {
			regexUrl();
		}
	};

	onMount(() => {
		playBgm();
		adjustPlaceWallHeight();
		window.addEventListener("resize", adjustPlaceWallHeight);
		return () => window.removeEventListener("resize", adjustPlaceWallHeight);
	});
</script>

<div class="container">
	<iframe src={bgmSrc} title="벽난로BGM" allow="autoplay" class="bgmContent"></iframe>
	<div class="placeContainer">
		<img {src} alt="벽난로" class="flame" class:mainrenderFlame={isMain} />
		<div class="placeWall" style="height: {placeWallHeight}">
			<FireAni />
		</div>
	</div>
	<div class="floor" class:mainRenderFloor={isMain}></div>
</div>

<style>
	.container {
		position: fixed;
		width: 100%;
		height: fit-content;
		left: 0;
		bottom: 0;
		z-index: 0;
	}

	.flame {
		width: 100%;
		position: absolute;
		bottom: 45%;
		z-index: 1;
	}

	.mainrenderFlame {
		bottom: 83%;
	}

	.placeWall {
		width: 50%;
		background-color: #49241a;
		left: 50%;
		bottom: 100%;
		transform: translateX(-50%);
		position: absolute;
	}

	.floor {
		width: 100%;
		height: 80px;
		background-color: #af8558;
	}

	.mainRenderFloor {
		height: 250px;
	}

	.bgmContent {
		display: none;
	}
</style>
