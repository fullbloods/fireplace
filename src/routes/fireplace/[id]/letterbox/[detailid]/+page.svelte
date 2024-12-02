<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import FireBox from "$lib/components/fireElement/FireBox.svelte";

	let musicId: string | null = null;

	const goBack = () => {
		window.history.back();
	};

	const goToReply = () => {
		goto("/fireplace/[id]/writing");
	};

	const loadYouTubePlayer = () => {
		if (!musicId) {
			console.log("Youtube music ID가 비어있습니다");
			return;
		}

		const playerScript = document.createElement("script");
		playerScript.src = "https://www.youtube.com/iframe_api";
		playerScript.async = true;
		document.body.appendChild(playerScript);

		(window as any).onYouTubeIframeAPIReady = () => {
			new (window as any).YT.Player("player", {
				videoId: musicId,
				events: {
					onReady: (event: any) => {
						event.target.playVideo();
					}
				},
				playerVars: {
					autoplay: 1,
					controls: 0,
					loop: 1,
					playlist: musicId
				}
			});
		};
	};

	const fetchMusicId = async () => {
		try {
			const response = await fetch("localhost:8070");
			if (!response.ok) {
				throw new Error("music Id 가져오기 실패");
			}

			const data = await response.json();
			musicId = data.musicId || null;
			loadYouTubePlayer();
		} catch (error) {
			console.error("Error fetching music ID:", error);
			alert("음악 정보를 가져오는 중 오류가 발생했습니다.");
		}
	};

	onMount(() => {
		fetchMusicId();
	});
</script>

<div class="container">
	<div class="detailInner">
		<div class="name"><span>from.{" "}</span>전여친</div>
		<div class="detail">내용</div>
	</div>
	{#if musicId}
		<div id="player" class="videoContainer"></div>
	{/if}

	<div class="btnContainer">
		<button class="customBtn" onclick={goBack}>닫기</button>
		<button class="customColorBtn" onclick={goToReply}>답장하기</button>
	</div>
	<FireBox isMain={false} />
</div>

<style>
	.container {
		background-color: #114433;
		width: 100%;
		height: 100vh;
		padding: 130px 45px 0 45px;
	}

	.detailInner {
		width: 100%;
		min-height: 200px;
		height: auto;
		background-color: #fff;
		border-radius: 10px;
		padding: 20px 30px;
	}

	.name {
		font-size: 20px;
		padding: 4px 5px;
		border-bottom: 1px solid #d9d9d9;
	}

	.name > span {
		font-size: 16px;
	}

	.detail {
		font-size: 20px;
		margin-top: 10px;
	}

	.btnContainer {
		display: flex;
		gap: 20px;
		margin-top: 20px;
	}

	.customBtn,
	.customColorBtn {
		flex: 1;
		height: 40px;
		background-color: #fff;
		border: none;
		border-radius: 10px;
		font-size: 18px;
		color: #000;
	}

	.customColorBtn {
		background-color: #ffe51e;
	}

	@media (min-height: 600px) {
		.container {
			padding: 70px 45px 0 45px;
		}
	}
</style>
