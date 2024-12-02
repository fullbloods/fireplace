<script>
	import FireAni from "./FireAni.svelte";

	let src = "/images/firePlaceFrame.png";

	export let isMain = true;
</script>

<div class="container">
	<div class="placeContainer">
		<img {src} alt="벽난로" class="flame" class:mainrenderFlame={isMain} />
		<div class="placeWall">
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
		height: 25vh;
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
</style>
