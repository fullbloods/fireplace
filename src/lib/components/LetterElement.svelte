<script lang="ts">
	import type { Letter } from "$lib/types/LetterType";
	import { goto } from "$app/navigation";
	import { showModal } from "$lib/store/modalStore";
	import LetterPasswordModal from "./LetterPasswordModal.svelte";

	export let letter: Letter;

	let src: string = "/images/letterImg.png";

	const goToDetail = () => {
		goto(`/fireplace/${letter.uuid}/letterbox/detail`);
	};

	const handleOpenModal = () => {
		showModal.set(true);
	};
</script>

<div
	class="letterInner"
	on:click={letter.type === "PRIVATE" ? handleOpenModal : goToDetail}
	on:keydown={() => {}}
	tabindex="0"
	role="button"
>
	<div class="letterImgContainer">
		<img {src} alt="편지" />
		<div class="private">
			{#if letter.type === "PRIVATE"}
				🔒
			{/if}
		</div>
	</div>
	<div class="nameText">{letter.name}</div>
	<div class="dayText">
		{#if letter.diffDate < 0}
			{`${letter.diffDate}00m`}
		{:else}📨 도착했어요!{/if}
	</div>
</div>

<LetterPasswordModal id={letter.uuid} />

<style>
	.letterInner {
		width: 100%;
		min-height: 50px;
		background-color: #fff;
		border-radius: 10px;
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	.letterImgContainer {
		width: 40px;
		height: 30px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.letterImgContainer > img {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.private {
		width: 14px;
		position: relative;
		margin-top: 6px;
		z-index: 2;
	}

	.nameText {
		font-size: 20px;
		margin-left: 20px;
	}

	.dayText {
		font-size: 14px;
		margin-left: auto;
	}
</style>
