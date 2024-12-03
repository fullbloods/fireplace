<script lang="ts">
	import { goto } from "$app/navigation";
	import { showModal } from "$lib/store/modalStore";
	import { LetterStatus, LetterType, type LetterItem } from "$lib/types/LetterType";
	import LetterPasswordModal from "./LetterPasswordModal.svelte";

	let { id, letter }: { id: string; letter: LetterItem } = $props();

	let src: string = "/images/letterImg.png";

	const moveDetail = () => {
		goto(`/fireplace/${id}/letterbox/${letter.uuid}`);
	};

	const openPasswordModal = () => {
		showModal.set(true);
	};

	const openLetter = () => {
		if (letter.status == LetterStatus.CLOSED) {
			alert("편지가 아직 도착하지 않았어요 :(");
			return;
		}

		if (letter.type == LetterType.PUBLIC) {
			moveDetail();
		} else {
			openPasswordModal();
		}
	};
</script>

<div class="letterInner" onclick={openLetter} onkeydown={() => {}} tabindex="0" role="button">
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
