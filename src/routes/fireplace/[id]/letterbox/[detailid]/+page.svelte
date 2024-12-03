<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import FireBox from "$lib/components/fireElement/FireBox.svelte";
	import { page } from "$app/stores";
	import { passwordProps } from "$lib/store/password";
	import { get } from "svelte/store";
	import { getLetter } from "$lib/utils/LetterUtils";
	import type { Letter } from "$lib/types/LetterType";

	const { id, detailId } = $page.params;
	let data: Letter | null = $state(null);
	let videoUrl: string | null = $state(null);
	let isShowReply: boolean = $state(false);

	const goBack = () => {
		goto(`/fireplace/${id}/letterbox`);
	};

	const goToReply = () => {
		goto(`/fireplace/${id}/letterbox/${detailId}/reply`);
	};

	const fetchDetail = async () => {
		try {
			data = await getLetter(detailId, $passwordProps);

			videoUrl = playMusic(data?.music || "");
		} catch (error) {
			console.error("Error fetching details:", error);
		}
	};

	const playMusic = (url: string): string => {
		const regex = /youtu\.be\/([a-zA-Z0-9_-]+)|v=([a-zA-Z0-9_-]+)/;
		const match = url.match(regex);
		const videoId = match?.[1] || match?.[2];
		return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
	};

	onMount(() => {
		fetchDetail();
	});

	const toggleReply = () => {
		isShowReply = !isShowReply;
	};
</script>

<div class="container">
	<div class="detailInner">
		{#if isShowReply}
			<div class="name"><span>from.{" "}</span>{data?.fire.name}</div>
			<div class="detail">{data?.reply}</div>
		{:else}
			<div class="name"><span>from.{" "}</span>{data?.name}</div>
			<div class="detail">{data?.content}</div>
		{/if}
	</div>

	<div class="btnContainer">
		<button class="customBtn" onclick={goBack}>닫기</button>
		{#if data?.reply}
			<button class="customColorBtn" onclick={toggleReply}
				>{#if isShowReply}
					편지보기
				{:else}
					답장보기
				{/if}</button
			>
		{:else}
			<button class="customColorBtn" onclick={goToReply}>답장하기</button>
		{/if}
	</div>
	<div class="musicContent">
		<iframe src={videoUrl} title="music" allow="autoplay"></iframe>
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
		position: relative;
		z-index: 1;
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

	.musicContent {
		display: none;
	}

	@media (min-height: 600px) {
		.container {
			padding: 70px 45px 0 45px;
		}
	}
</style>
